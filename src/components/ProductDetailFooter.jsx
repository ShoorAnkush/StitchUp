"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export const ProductDetailFooter = ({
  product,
  selectedColor,
  selectedSize,
}) => {
  const { toggleCartItems, isInCart } = useCart();
  const { toggleWishlistButton, isInWishlist } = useWishlist();

  return (
    <div className="fixed bottom-0 left-0 w-full md:static md:w-auto flex gap-15 bg-white p-3 shadow-[0_-2px_6px_rgba(0,0,0,0.3)] md:shadow-none">
      <button
        onClick={() => {
          toggleWishlistButton(product.id);
        }}
        className="flex-1 border border-gray-400 text-gray-700 font-medium py-2 rounded-lg 
                   hover:bg-gray-100 hover:scale-95 transition cursor-pointer shadow-xl/20"
      >
        {isInWishlist(product.id)
          ? `♥ Remove From Wishlist`
          : `♥ Add to Wishlist`}
      </button>

      <button
        onClick={() => {
          toggleCartItems(product, selectedSize, selectedColor);
        }}
        className="flex-1 bg-gray-800 text-white font-semibold py-2 rounded-lg 
                   hover:bg-gray-900 hover:scale-95 transition cursor-pointer shadow-xl/20"
      >
        {isInCart(product.id, selectedSize, selectedColor)
          ? `🛒 Remove from Cart`
          : `🛒 Add to Cart`}
      </button>
    </div>
  );
};
