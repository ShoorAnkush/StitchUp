import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FeatureCard } from "@/components/FeatureCard";
import React from "react";

const brands = [
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    bgGradient: "linear-gradient(to bottom right, #000000, #434343)",
  },
  {
    name: "Ralph Lauren",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Polo_Ralph_Lauren_logo.svg",
    bgGradient: "linear-gradient(to bottom right, #0f172a, #1e293b)",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    bgGradient: "linear-gradient(to bottom right, #1f2937, #111827)",
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Puma_AG.svg",
    bgGradient: "linear-gradient(to bottom right, #ff0000, #8b0000)",
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    bgGradient: "linear-gradient(to bottom right, #000000, #434343)",
  },
  {
    name: "Ralph Lauren",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/0e/Polo_Ralph_Lauren_logo.svg",
    bgGradient: "linear-gradient(to bottom right, #0f172a, #1e293b)",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    bgGradient: "linear-gradient(to bottom right, #1f2937, #111827)",
  },
  {
    name: "Puma",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fd/Puma_AG.svg",
    bgGradient: "linear-gradient(to bottom right, #ff0000, #8b0000)",
  },
];

export const BrandsShowcase = React.memo(() => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      slidesPerView={3}
      navigation
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index} className="flex right-0">
          <FeatureCard
            bgClass="bg-linear-to-br from-indigo-500 to-purple-600"
            {...brand}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
