"use client";

import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { SideMenuCards } from "@/components/SideMenuCards";
import { products } from "@/data/products";

export const SideMenuContent = ({ setIsOpen }) => {
  const [selectedGender, setSelectedGender] = useState("men");
  const [isFading, setIsFading] = useState(false);

  const groupedProducts = useMemo(() => {
    const grouped = {};
    products.forEach((p) => {
      if (!grouped[p.gender]) grouped[p.gender] = {};
      if (!grouped[p.gender][p.section]) grouped[p.gender][p.section] = {};
      if (!grouped[p.gender][p.section][p.category]) {
        grouped[p.gender][p.section][p.category] = p;
      }
    });
    return grouped;
  }, [products]);

  const handleGenderChange = (gender) => {
    if (gender === selectedGender) return;
    setIsFading(true);
    setTimeout(() => {
      setSelectedGender(gender);
      setIsFading(false);
    }, 150); // short fade timing
  };

  const sections = ["Topwear", "Bottomwear", "Footwear", "Accessories"];
  const currentGenderData = groupedProducts[selectedGender] || {};

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header Section */}
      <div className="sticky top-0 z-20 bg-white">
        <div className="flex justify-center py-3">
          <button
            type="button"
            className="bg-white text-gray-600 text-sm flex items-center px-4 py-2 gap-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 hover:shadow transition-all duration-200 cursor-pointer"
          >
            <CgProfile className="text-lg" />
            Login / Sign Up
          </button>
        </div>

        {/* Gender Toggle */}
        <div className="grid grid-cols-2 text-lg px-auto pb-2 overflow-x-hidden">
          {["men", "women"].map((gender) => (
            <button
              key={gender}
              onClick={() => handleGenderChange(gender)}
              className={`relative py-2 w-full transition-all duration-200 font-medium transform origin-center cursor-pointer
                ${
                  selectedGender === gender
                    ? "text-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black"
                    : "text-gray-500 hover:text-black hover:scale-105"
                }`}
            >
              {gender.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className={`sidebar-scroll relative flex-1 overflow-y-auto overflow-x-hidden transition-opacity duration-300 will-change-[opacity] ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="pb-16 px-3 md:px-4">
          {sections.map((section) => {
            const categories = Object.keys(currentGenderData[section] || {});
            return (
              <div key={section} className="my-6">
                <h2 className="mb-3 text-lg font-semibold text-gray-800 border-b border-gray-200 pb-1 tracking-wide">
                  {section}
                </h2>

                <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
                  {categories.map((category) => {
                    const product = currentGenderData[section][category];
                    return (
                      <div
                        key={category}
                        className="w-full min-w-[120px] sm:min-w-[140px] animate-fadeIn hover:scale-[1.05] transition-transform duration-200"
                      >
                        <SideMenuCards
                          category={category}
                          product={product}
                          setIsOpen={setIsOpen}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-white pointer-events-none"></div>
      </div>
    </div>
  );
};
