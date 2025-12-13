"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BrandsShowcase } from "../components/BrandsShowcase";
import { TrendingCard } from "../components/TrendingCard";
import { CategoryCard } from "../components/CategoryCard";

const bannerImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero1.jpg",
  "/images/hero2.jpg",
];

export const Landing = () => {
  return (
    <div className="w-full">
      {/* Banner / Hero */}
      <div className="relative" style={{ height: "80vh" }}>
        {/* Swiper only for images */}
        <Swiper
          style={{ height: "100%" }}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Banner ${index + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0} /* prioritize first slide */
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Fixed Text on top */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20 text-white z-10 pointer-events-none">
          {/* only this inner wrapper receives pointer events */}
          <div className="pointer-events-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              New Collection
            </h1>
            <p className="text-lg md:text-2xl mb-6">Style that speaks</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Brands Card */}
      <section className="m-16">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          OFFICIAL COLLABS
        </h2>
        <BrandsShowcase />
      </section>

      {/* Categories Cards */}
      <section className="mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">
          CATEGORIES
        </h2>
        <CategoryCard />
      </section>

      {/* Trending Cards */}
      <section className="mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-black">Trending</h2>
        <TrendingCard />
      </section>
    </div>
  );
};

export default Landing;
