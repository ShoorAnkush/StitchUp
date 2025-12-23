import React from "react";
import Image from "next/image";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWishlist } from "@/context/WishlistContext";

export const ProductCard = React.memo(({ product }) => {
  const { toggleWishlistButton, isInWishlist } = useWishlist();

  // safe src fallback
  const src =
    product?.images && product.images.length
      ? product.images[0]
      : "/images/placeholder.png";

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition p-1 sm:p-4 cursor-pointer">
      <div className="relative w-full h-56 sm:h-92 overflow-hidden">
        <Image
          src={src}
          alt={product?.name ?? "product"}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 300px"
          quality={85}
        />
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWishlistButton(Number(product.id));
          }}
          className="absolute text-white top-2 right-2 bg-black/40 p-1 rounded-full cursor-pointer hover:bg-black transition"
        >
          {isInWishlist(product.id) ? <AiFillHeart /> : <AiOutlineHeart />}
        </span>
      </div>

      <h2 className="mt-2 sm:mt-3 text-sm sm:text-lg font-semibold text-black">
        {product.name}
      </h2>
      <hr className="bg-gray-400" />
      <p className="text-gray-600 text-xs sm:text-sm">{product.category}</p>
      <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-900 font-bold">
        ${product.price}
      </p>
    </div>
  );
});
