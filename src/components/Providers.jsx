"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { FilterProvider } from "@/context/FilterContext";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <FilterProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
            <Toaster />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </FilterProvider>
  );
}
