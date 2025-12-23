"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Image from "next/image";
import { useAutoSelectOptions } from "@/hooks/useAutoSelectOptions";

export const WishlistModal = ({ onClose, product }) => {
  const { toggleCartItems } = useCart();
  const { removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = product?.colors ?? [];
  const stock = product?.stock ?? {};
  const sizes = (product?.sizes ?? []).filter((size) => (stock[size] ?? 0) > 0);

  const imgSrc =
    Array.isArray(product.images) && product.images.length
      ? product.images[0]
      : typeof product.images === "string"
      ? product.images
      : "/images/placeholder.png";

  useAutoSelectOptions({
    colors,
    sizes,
    setSelectedColor,
    setSelectedSize,
  });

  useEffect(() => {
    document.body.style.overflow = "clip";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/20"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="
          backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm p-8 relative flex flex-col justify-center text-white"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-white/80 hover:text-white transition cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 mb-2">
          {/* Image */}
          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden border border-white/30">
            <Image
              src={imgSrc}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              quality={85}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-white leading-tight">
              {product?.name}
            </p>
            <p className="text-base text-white/90 mt-1">${product?.price}</p>
          </div>
        </div>

        {/* Color */}
        {colors.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-sm mb-2 text-white/80 tracking-wide">Color</p>
            <div className="flex justify-center gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`
                    w-9 h-9 rounded-md border transition-transform duration-150 flex items-center justify-center active:scale-[0.85]
                    ${
                      selectedColor === color
                        ? "border-white border-[3px] scale-100"
                        : "border-white/40 hover:scale-105"
                    }
                  `}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {sizes.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-sm mb-2 text-white/80 tracking-wide">Size</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-11 h-10 rounded-md text-sm font-medium  border transition-transform duration-150 flex items-center justify-center active:scale-[0.9]
                      ${
                        selectedSize === size
                          ? "bg-white text-black border-white border-2"
                          : "border-white/40 hover:bg-white/20 hover:scale-105"
                      }
                    `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action */}
        <button
          disabled={!selectedSize || (colors.length > 0 && !selectedColor)}
          onClick={() => {
            toggleCartItems(product, selectedSize, selectedColor);
            onClose();
            removeFromWishlist(product.id);
          }}
          className="
            w-full py-3 rounded-lg active:scale-[0.85] bg-black/80 hover:bg-black/90 font-semibold tracking-wide transition cursor-pointer"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};
