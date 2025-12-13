"use client";

import { products } from "@/data/products";
import { useFilter } from "@/context/FilterContext";
import { useMemo } from "react";

export const FilterSidebar = ({ gender }) => {
  const {
    selectedCategories,
    toggleCategory,
    selectedSizes,
    toggleSize,
    priceRange,
    priceRanges,
    togglePrice,
    toggleReset,
  } = useFilter();

  const genderProducts = useMemo(
    () => products.filter((p) => p.gender === gender),
    [gender]
  );

  const sizesToShow = useMemo(() => {
    return [
      ...new Set(
        genderProducts.flatMap((p) =>
          Array.isArray(p.sizes) ? p.sizes : Object.keys(p.stock || {})
        )
      ),
    ];
  }, [genderProducts]);

  const categories = useMemo(() => {
    return [...new Set(genderProducts.map((p) => p.category))];
  }, [genderProducts]);

  return (
    <div className="overflow-auto max-h-[90vh] p-4 space-y-6 text-black">
      {/* Reset Filter Button */}
      <div className="my-4">
        <button
          className="btn btn-wide btn-active hover:btn-accent"
          onClick={toggleReset}
        >
          Reset
        </button>
      </div>
      {/* Category Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Category</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center gap-3 cursor-pointer relative w-full">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm accent-blue-600"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {/* Keep your original text styling */}
                <span className="text-gray-700 select-none">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Filter */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Size</h2>
        <ul className="flex flex-wrap gap-2">
          {sizesToShow.map((size) => (
            <li key={size}>
              <label
                className={`w-12 h-10 flex justify-center items-center border rounded cursor-pointer
      ${
        selectedSizes.includes(size)
          ? "bg-gray-200 border-black"
          : "border-slate-300"
      }
    `}
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="hidden"
                />
                {size}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter (placeholder) */}
      <fieldset className="mb-3">
        <legend className="text-lg font-semibold">Price Range</legend>

        <div className="flex flex-col gap-2 mt-2">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-3 cursor-pointer relative w-full"
            >
              <input
                type="radio"
                name="priceRange"
                className="radio radio-neutral radio-xs"
                checked={
                  priceRange[0] === range.min && priceRange[1] === range.max
                }
                onChange={() => togglePrice(range)}
              />
              <span className="label-text text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
