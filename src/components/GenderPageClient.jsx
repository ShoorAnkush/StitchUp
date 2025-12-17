"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { useFilter } from "@/context/FilterContext";

const sortOptions = ["Default", "Low to High", "High to Low", "A to Z"];

export function GenderPageClient({ gender, products }) {
  const {
    selectedCategories,
    setSelectedCategories,
    selectedSizes,
    setSelectedSizes,
    priceRange,
    setPriceRange,
    sortOrder,
    toggleSort,
  } = useFilter();

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      if (product.gender !== gender) return false;

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (
        selectedSizes.length > 0 &&
        !product.sizes?.some((size) => selectedSizes.includes(size))
      ) {
        return false;
      }

      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });

    return [...result].sort((a, b) => {
      if (sortOrder === "Low to High") return a.price - b.price;
      if (sortOrder === "High to Low") return b.price - a.price;
      if (sortOrder === "A to Z") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [
    gender,
    products,
    selectedCategories,
    selectedSizes,
    priceRange,
    sortOrder,
  ]);

  useEffect(() => {
    // You should reset to sensible defaults, not [].
    setSelectedCategories([]);
    setSelectedSizes([]);
    // setPriceRange(DEFAULT_RANGE_FOR_GENDER); // fix this in your FilterContext
  }, [gender, setSelectedCategories, setSelectedSizes, setPriceRange]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-58 hidden md:block sticky left-0 top-16 h-screen overflow-y-auto bg-[#fafafa] shadow-xl/30">
        <FilterSidebar gender={gender} />
      </div>

      {/* Right side: sort + grid */}
      <div className="flex flex-col flex-1">
        {/* Sort dropdown */}
        <div className="flex justify-end mr-4 mt-2">
          <div className="dropdown dropdown-end text-black">
            <div tabIndex={0} role="button" className="btn m-1">
              Sort By <IoIosArrowDown />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
            >
              {sortOptions.map((sort) => (
                <li key={sort}>
                  <button type="button" onClick={() => toggleSort(sort)}>
                    {sort}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6 items-start">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
