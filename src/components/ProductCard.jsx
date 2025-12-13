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
    <div className="bg-white w-76 rounded-xl shadow-md hover:shadow-lg transition p-4 cursor-pointer">
      <div
        className="relative w-full"
        style={{ height: 344 /* same as your old height */ }}
      >
        <Image
          src={src}
          alt={product?.name ?? "product"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, 300px"
          quality={85}
          priority={false}
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

      <h2 className="mt-3 text-lg font-semibold text-black">{product.name}</h2>
      <hr className="bg-gray-400" />
      <p className="text-gray-600 text-sm">{product.category}</p>
      <p className="mt-2 text-gray-900 font-bold">${product.price}</p>
    </div>
  );
});
