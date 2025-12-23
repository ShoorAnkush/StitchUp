"use client";

import { useState } from "react";
import { ProductDetailFooter } from "@/components/ProductDetailFooter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { useAutoSelectOptions } from "@/hooks/useAutoSelectOptions";

const standardSizes = {
  Topwear: ["XS", "S", "M", "L", "XL", "XXL"],
  Bottomwear: ["28", "30", "32", "34", "36", "38", "40"],
  Accessories: [],
  Footwear: ["7", "8", "9", "10", "11", "12"],
};

export default function ProductDetailClient({ product }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // safe guards
  const images = Array.isArray(product?.images) ? product.images : [];
  const colors = Array.isArray(product?.colors) ? product.colors : [];
  const sizes = Array.isArray(product?.sizes) ? product.sizes : [];
  const stock = product?.stock ?? {};
  const section = product?.section ?? null;

  useAutoSelectOptions({
    colors,
    sizes,
    setSelectedColor,
    setSelectedSize,
  });

  return (
    <div className="md:grid md:grid-cols-2 gap-6 p-6">
      {/* Mobile: Image Swiper */}
      <div className="block md:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="overflow-hidden"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[400px]">
                <Image
                  src={image}
                  alt={product?.name ?? "product"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <div className="relative w-full h-[500px]">
              <Image
                src={image}
                alt={product?.name ?? "product"}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Details */}
      <section className="flex flex-col gap-4 mt-4 md:mt-0 text-black">
        <div>
          <h2 className="text-2xl font-bold uppercase">{product?.name}</h2>
          <p className="text-gray-500 mb-6 text-sm">{product?.category}</p>

          <hr className="bg-gray-800" />

          <p className="text-xl font-semibold text-gray-800 my-6">
            ${product?.price}
          </p>

          <div>
            <h3 className="font-medium">Product Description:</h3>
            <p className="text-gray-700">{product?.description}</p>
          </div>
        </div>

        {/* Color */}
        {colors.length > 0 && (
          <div>
            <p className="font-medium mb-2">Shop by Variant/Look:</p>
            <ul className="flex flex-wrap gap-4">
              {colors.map((color, index) => (
                <li
                  onClick={() => setSelectedColor(color)}
                  key={index}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <span
                    className={`w-12 h-12 rounded-md border group-hover:scale-105 ${
                      selectedColor === color
                        ? "border-black border-2"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-600 mt-1 capitalize">
                    {color}
                  </span>
                </li>
              ))}
            </ul>
            {selectedColor && (
              <p className="text-sm text-gray-600 mt-2 capitalize">
                Color: <b>{selectedColor}</b>
              </p>
            )}
          </div>
        )}

        {/* Sizes */}
        {sizes.length > 0 && section && standardSizes[section]?.length > 0 && (
          <div>
            <p className="font-medium mb-2">Please select a size:</p>
            <ul className="flex flex-wrap gap-2">
              {standardSizes[section].map((size, index) => {
                const availableSize =
                  sizes.includes(size) && (stock[size] ?? 0) > 0;
                return (
                  <li
                    onClick={() => availableSize && setSelectedSize(size)}
                    key={index}
                    className={`flex items-center justify-center border border-gray-400 w-12 h-10 rounded-md hover:bg-gray-100 ${
                      availableSize
                        ? selectedSize === size
                          ? "bg-gray-900 text-white hover:bg-gray-900"
                          : "cursor-pointer hover:bg-gray-200"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                    role="button"
                    aria-pressed={selectedSize === size}
                    tabIndex={availableSize ? 0 : -1}
                  >
                    {size}
                  </li>
                );
              })}
            </ul>
            {selectedSize && (
              <p className="text-sm text-gray-600 mt-2">
                Size: <b>{selectedSize}</b>
              </p>
            )}
          </div>
        )}

        {/* Quantity */}
        <div className="flex items-center pb-8">
          <p className="mr-2">Qty:</p>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <ProductDetailFooter
          className="fixed"
          id={product?.id}
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
        />
      </section>
    </div>
  );
}
