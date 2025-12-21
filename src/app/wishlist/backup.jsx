// app/wishlist/page.jsx  (client)
"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import { ProductCard } from "@/components/ProductCard"; // adjust alias/path if needed
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products"; // keep your local products list
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems = [] } = useWishlist();
  const { toggleCartItems, isInCart } = useCart();
  const router = useRouter();

  // Defensive normalized ID helper
  const normalize = (v) => {
    // keep numbers for consistent comparisons (change to String if your products use strings)
    return Number(v);
  };

  // Build list of product objects from wishlist IDs (preserve same order as wishlist)
  const listedProducts = wishlistItems
    .map((id) => {
      const nid = normalize(id);
      return (
        products.find((p) => normalize(p.id) === nid) || { __missingId: nid }
      );
    })
    .filter(Boolean);

  const handleProductClick = (id) => {
    // Ensure numeric id -> string route
    router.push(`/product/${normalize(id)}`);
  };

  return (
    <div className="p-6 h-9/10">
      {!Array.isArray(wishlistItems) || wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-wide">
            Your wishlist is empty
          </h2>

          <p className="text-gray-500 mt-3 max-w-md">
            Save items you love and come back to them anytime.
          </p>

          <Link
            href="/men"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gray-800 px-8 py-3 text-sm font-medium text-white hover:bg-gray-900 transition"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6 justify-items-center">
          {listedProducts.map((productOrPlaceholder, idx) => {
            // If product data exists show card; otherwise show placeholder with ID so you can detect missing products
            if (!productOrPlaceholder.__missingId) {
              const product = productOrPlaceholder;
              return (
                <div key={product.id} className="relative">
                  <div
                    role="button"
                    onClick={() => handleProductClick(product.id)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleProductClick(product.id)
                    }
                    tabIndex={0}
                    className="cursor-pointer"
                  >
                    <ProductCard product={product} />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCartItems(product.id);
                    }}
                    className="mt-2 px-3 bg-gray-800 text-white font-semibold py-2 rounded-lg hover:bg-gray-900 active:scale-95 transition cursor-pointer"
                  >
                    🛒 Move to Cart
                  </button>
                </div>
              );
            }

            // Placeholder when product not found in products list
            const missingId = productOrPlaceholder.__missingId;
            return (
              <div
                key={`missing-${missingId}`}
                className="border rounded p-4 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center">
                    <span className="text-gray-400">Missing product data</span>
                  </div>
                  <h3 className="font-semibold">Product {missingId}</h3>
                  <p className="text-sm text-gray-500">ID: {missingId}</p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <button
                    onClick={() => {
                      toggleCartItems(missingId);
                    }}
                    className="text-sm text-gray-700 underline"
                  >
                    Toggle cart (ID)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
