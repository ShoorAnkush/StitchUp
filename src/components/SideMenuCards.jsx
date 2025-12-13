import React from "react";
import Link from "next/link";
import Image from "next/image";

export const SideMenuCards = React.memo(({ category, product, setIsOpen }) => {
  if (!product) return null;

  const gender = product.gender;
  const path = `/${gender}?categories=${encodeURIComponent(category)}`;

  const handleClick = () => {
    setIsOpen(false);
  };

  const imageSrc = Array.isArray(product.images)
    ? product.images[0]
    : typeof product.images === "string"
    ? product.images
    : "/placeholder.png";

  return (
    <Link
      href={path}
      onClick={() => handleClick(category)}
      className="relative flex items-center justify-center text-sm text-white/80 rounded-lg shadow-sm max-w-60 cursor-pointer"
    >
      <div className="absolute bottom-2 flex items-center justify-around backdrop-blur-sm w-full max-w-26 rounded bg-white/10 border border-white/20 py-1">
        <button
          type="button"
          className="rounded-full px-2 py-1 text-shadow-lg/30"
        >
          {category}
        </button>
      </div>
      <Image
        src={imageSrc}
        alt={product.name || ""}
        width={208} // match tailwind w-52 (52*4)
        height={128} // match tailwind h-32 (32*4)
        className="w-52 h-32 object-cover rounded bg-gray-100"
      />
    </Link>
  );
});
