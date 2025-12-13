"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);
  const { user } = useAuth();

  // 🔹 Load wishlist when user changes
  useEffect(() => {
    let active = true;

    const loadWishlist = async () => {
      if (user) {
        try {
          const wishlistRef = collection(db, "users", user.uid, "wishlist");
          const snapshot = await getDocs(wishlistRef);
          const serverItems = snapshot.docs.map((doc) => doc.data().productId);

          // Merge local + Firestore wishlist (avoid duplicates)
          const local = JSON.parse(localStorage.getItem("wishlist")) || [];
          const merged = [...new Set([...serverItems, ...local])];
          if (active) setWishlistItems(merged);

          // Save merged version to Firestore
          await Promise.all(
            merged.map(async (productId) => {
              const q = query(wishlistRef, where("productId", "==", productId));
              const snap = await getDocs(q);
              if (snap.empty) {
                await setDoc(doc(wishlistRef), {
                  productId,
                  addedAt: new Date().toISOString(),
                });
              }
            })
          );

          localStorage.removeItem("wishlist");
        } catch (err) {
          console.error("Failed to load wishlist:", err);
        } finally {
          if (active) setIsWishlistLoaded(true);
        }
      } else {
        const local = JSON.parse(localStorage.getItem("wishlist")) || [];
        if (active) {
          setWishlistItems(local);
          setIsWishlistLoaded(true);
        }
      }
    };
    loadWishlist();

    return () => {
      active = false;
    };
  }, [user]);

  // 🔹 Sync with Firestore or localStorage
  useEffect(() => {
    if (!isWishlistLoaded) return;
    const saveWishlist = async () => {
      if (user) {
        try {
          const wishlistRef = collection(db, "users", user.uid, "wishlist");
          const snapshot = await getDocs(wishlistRef);
          const existingIds = snapshot.docs.map((d) => d.data().productId);

          const newItems = wishlistItems.filter(
            (id) => !existingIds.includes(id)
          );

          for (const productId of newItems) {
            await setDoc(doc(wishlistRef), {
              productId,
              addedAt: new Date().toISOString(),
            });
          }
        } catch (err) {
          console.error("Failed to sync wishlist:", err);
        }
      } else {
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      }
    };
    saveWishlist();
  }, [wishlistItems, user, isWishlistLoaded]);

  // 🔹 Add or remove item
  const toggleWishlistButton = async (productId) => {
    if (wishlistItems.includes(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  const addToWishlist = async (productId) => {
    setWishlistItems((prev) => [...new Set([...prev, productId])]);
    toast.success("Added to wishlist");

    if (user) {
      try {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        await setDoc(doc(wishlistRef), {
          productId,
          addedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error adding to wishlist:", err);
      }
    }
  };

  const removeFromWishlist = async (productId) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId));
    toast.error("Removed from wishlist");

    if (user) {
      try {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        const q = query(wishlistRef, where("productId", "==", productId));
        const snapshot = await getDocs(q);
        snapshot.forEach(async (docSnap) => {
          await deleteDoc(doc(db, "users", user.uid, "wishlist", docSnap.id));
        });
      } catch (err) {
        console.error("Error removing wishlist item:", err);
      }
    }
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlistButton,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
