"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  collection,
  doc,
  getDocs,
  writeBatch,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";

const CartContext = createContext(null);

const makeKey = (item) => `${item.id}-${item.size}-${item.color}`;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const { user } = useAuth();

  // Load cart when user changes
  useEffect(() => {
    let active = true;

    const loadCart = async () => {
      try {
        let mergedCart = [];

        // Load local cart
        let localCart = [];
        try {
          localCart =
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("cart")) || []
              : [];
        } catch {
          localCart = [];
        }

        if (user) {
          // Read server subcollection /users/{uid}/cart
          const cartRef = collection(db, "users", user.uid, "cart");
          const snap = await getDocs(cartRef);
          const serverCart = snap.docs.map((d) => d.data());

          const map = new Map();
          [...serverCart, ...localCart].forEach((item) => {
            map.set(makeKey(item), item);
          });

          mergedCart = Array.from(map.values());
          const batch = writeBatch(db);

          // delete existing server docs
          snap.docs.forEach((d) => batch.delete(d.ref));
          // write merged docs with deterministic ids
          mergedCart.forEach((item) => {
            const id = makeKey(item);
            const ref = doc(db, "users", user.uid, "cart", id);
            batch.set(ref, item);
          });

          await batch.commit();

          // clear local cache
          if (typeof window !== "undefined") localStorage.removeItem("cart");
        } else {
          // No user: just use local cart
          mergedCart =
            typeof window !== "undefined"
              ? JSON.parse(localStorage.getItem("cart")) || []
              : [];
        }

        if (active) {
          setCartItems(mergedCart);
          setIsCartLoaded(true);
        }
      } catch (err) {
        console.error("Failed to load cart:", err);
        // keep UI usable
        if (active) {
          setCartItems([]);
          setIsCartLoaded(true);
        }
      }
    };

    loadCart();
    return () => {
      active = false;
    };
  }, [user]);

  // Save cart: update subcollection (delete-all then write fresh)
  const saveCartToServer = async (updatedCart) => {
    if (!user) return;
    try {
      const cartRef = collection(db, "users", user.uid, "cart");
      const snap = await getDocs(cartRef);
      const batch = writeBatch(db);

      // delete existing server docs
      snap.docs.forEach((d) => batch.delete(d.ref));

      // write updatedCart with deterministic ids
      updatedCart.forEach((item) => {
        const id = makeKey(item);
        const ref = doc(db, "users", user.uid, "cart", id);
        batch.set(ref, item);
      });

      await batch.commit();
    } catch (err) {
      console.error("Error saving cart to server:", err);
      throw err;
    }
  };

  // Public save handler (syncs to localStorage if no user)
  const saveCart = async (updatedCart) => {
    setCartItems(updatedCart);

    if (user) {
      try {
        await saveCartToServer(updatedCart);
      } catch (err) {
        console.error("saveCart failed", err);
        // toast.error("Failed to save cart. Check console/network.");
      }
    } else if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const toggleCartItems = (
    product,
    selectedSize,
    selectedColor,
    quantity = 1
  ) => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const exists = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    let updatedCart;

    if (exists) {
      updatedCart = cartItems.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.size === selectedSize &&
            item.color === selectedColor
          )
      );
      toast.error("Removed from Cart");
    } else {
      updatedCart = [
        ...cartItems,
        { ...product, size: selectedSize, color: selectedColor, quantity },
      ];
      toast.success("Added to Cart");
    }

    void saveCart(updatedCart);
  };

  const removeFromCart = (id, size, color) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    void saveCart(updatedCart);
  };

  const updateQuantity = (id, size, color, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.size === size && item.color === color
        ? { ...item, quantity }
        : item
    );
    void saveCart(updatedCart);
  };

  const isInCart = (productId, size, color) =>
    cartItems.some(
      (item) =>
        item.id === productId && item.size === size && item.color === color
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        toggleCartItems,
        isInCart,
        updateQuantity,
        removeFromCart,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
