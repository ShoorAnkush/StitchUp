"use client";

import { createContext, useContext, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 🔹 URL is the source of truth
  const filters = useMemo(() => {
    return {
      categories: searchParams.get("categories")?.split(",") || [],
      sizes: searchParams.get("sizes")?.split(",") || [],
      priceRange: [
        Number(searchParams.get("minPrice")) || 0,
        Number(searchParams.get("maxPrice")) || 500,
      ],
      sortOrder: searchParams.get("sortOrder") || "Default",
    };
  }, [searchParams]);

  // 🔹 Update URL
  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  // 🔹 Actions
  const toggleCategory = (category) => {
    const next = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    updateParams({ categories: next });
  };

  const toggleSize = (size) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];

    updateParams({ sizes: next });
  };

  const togglePrice = (range) => {
    updateParams({
      minPrice: range.min !== 0 ? range.min : undefined,
      maxPrice:
        range.max !== 500 && range.max !== Infinity ? range.max : undefined,
    });
  };

  const toggleSort = (order) => {
    updateParams({ sortOrder: order !== "Default" ? order : undefined });
  };

  const toggleReset = () => {
    router.replace(pathname, { scroll: false });
  };

  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$26 - $49", min: 26, max: 49 },
    { label: "$50 - $99", min: 50, max: 99 },
    { label: "Over $100", min: 100, max: Infinity },
  ];

  return (
    <FilterContext.Provider
      value={{
        /* 🔹 expose derived state */
        selectedCategories: filters.categories,
        selectedSizes: filters.sizes,
        priceRange: filters.priceRange,
        sortOrder: filters.sortOrder,

        /* 🔹 actions */
        toggleCategory,
        toggleSize,
        togglePrice,
        toggleSort,
        toggleReset,
        priceRanges,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
