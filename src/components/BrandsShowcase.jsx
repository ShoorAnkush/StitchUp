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
    name: "Puma",
    logo: "/brands/puma.svg",
    bgGradient: "linear-gradient(to bottom right, #ff0000, #8b0000)",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    bgGradient: "linear-gradient(to bottom right, #030000, #111827)",
  },
  {
    name: "Ralph Lauren",
    logo: "/brands/ralph.svg",
    bgGradient: "linear-gradient(to bottom right, #0f172a, #1e293b)",
  },
  {
    name: "Nike",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    bgGradient: "linear-gradient(to bottom right, #000000, #434343)",
  },
  {
    name: "Puma",
    logo: "/brands/puma.svg",
    bgGradient: "linear-gradient(to bottom right, #ff0000, #8b0000)",
  },
  {
    name: "Adidas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg",
    bgGradient: "linear-gradient(to bottom right, #1f2937, #111827)",
  },

  {
    name: "Ralph Lauren",
    logo: "/brands/ralph.svg",
    bgGradient: "linear-gradient(to bottom right, #0f172a, #1e293b)",
  },
];

export const BrandsShowcase = React.memo(() => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={20}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      navigation
      style={{
        "--swiper-theme-color": "#4B5563", // gray-600
      }}
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index} className="flex right-0">
          <FeatureCard {...brand} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
