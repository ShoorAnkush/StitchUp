"use client";

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const FilterContext = createContext();

// Utility function to parse search params outside of the component logic
const parseSearchParams = (searchParams) => {
  const urlCategories = searchParams.get("categories")?.split(",") || [];
  const urlSizes = searchParams.get("sizes")?.split(",") || [];
  const urlMin = Number(searchParams.get("minPrice")) || 0;
  const urlMax = Number(searchParams.get("maxPrice")) || 500;
  const urlSort = searchParams.get("sortOrder") || "Default";

  return { urlCategories, urlSizes, urlMin, urlMax, urlSort };
};

// Utility function to serialize state into a new URLSearchParams object
const serializeFilterState = (state) => {
  const newParams = new URLSearchParams();

  if (state.categories.length > 0)
    newParams.set("categories", state.categories.join(","));

  if (state.sizes.length > 0) newParams.set("sizes", state.sizes.join(","));

  if (state.priceRange[0] !== 0)
    newParams.set("minPrice", state.priceRange[0].toString());

  // Only set maxPrice if it's not the default (500) and not Infinity
  if (state.priceRange[1] !== 500 && state.priceRange[1] !== Infinity)
    newParams.set("maxPrice", state.priceRange[1].toString());

  if (state.sortOrder !== "Default")
    newParams.set("sortOrder", state.sortOrder);

  return newParams;
};

export const FilterProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial parse (synchronous) so UI reads URL immediately (avoids flash).
  const { urlCategories, urlSizes, urlMin, urlMax, urlSort } =
    parseSearchParams(searchParams);

  const [selectedCategories, setSelectedCategories] = useState(urlCategories);
  const [selectedSizes, setSelectedSizes] = useState(urlSizes);
  const [priceRange, setPriceRange] = useState([urlMin, urlMax]);
  const [sortOrder, setSortOrder] = useState(urlSort);

  // pendingQuery triggers the actual router.replace in an effect (never during render)
  const [pendingQuery, setPendingQuery] = useState(null);

  // guard to skip the very first automatic sync effect if you don't want a replace on mount
  const mountedRef = useRef(false);

  // --- Keep state synced from external URL changes (back/forward) ---
  useEffect(() => {
    const {
      urlCategories: c,
      urlSizes: s,
      urlMin: min,
      urlMax: max,
      urlSort: sort,
    } = parseSearchParams(searchParams);

    if (
      JSON.stringify(c) !== JSON.stringify(selectedCategories) ||
      JSON.stringify(s) !== JSON.stringify(selectedSizes) ||
      min !== priceRange[0] ||
      max !== priceRange[1] ||
      sort !== sortOrder
    ) {
      setSelectedCategories(c);
      setSelectedSizes(s);
      setPriceRange([min, max]);
      setSortOrder(sort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // only respond to url changes

  // --- When local state changes, compute new query AFTER render and schedule router update ---
  useEffect(() => {
    // skip the first run to avoid unnecessary replace on mount; subsequent changes should sync URL
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    const currentState = {
      categories: selectedCategories,
      sizes: selectedSizes,
      priceRange,
      sortOrder,
    };

    const newParams = serializeFilterState(currentState);
    const newQueryString = newParams.toString();
    const currentQueryString = searchParams.toString();

    if (newQueryString !== currentQueryString) {
      // schedule the navigation; actual router call occurs in the effect below
      setPendingQuery(newQueryString);
    }
    // intentionally depend on these specific state pieces
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, selectedSizes, priceRange, sortOrder]);

  // Perform the navigation (router.replace) only inside effect — never during render
  useEffect(() => {
    if (pendingQuery === null) return;

    const currentQueryString = searchParams.toString();
    if (pendingQuery !== currentQueryString) {
      // safe: runs after render
      router.replace(`${pathname}?${pendingQuery}`, { scroll: false });
    }
    // clear pending after performing (or skipping) navigation
    setPendingQuery(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingQuery, router, pathname, searchParams]);

  // --- Toggle Functions (only update local state; URL sync handled by effects) ---
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleSort = (order) => {
    setSortOrder(order);
  };

  const togglePrice = (range) => {
    setPriceRange([range.min, range.max]);
  };

  const toggleReset = () => {
    const emptyState = {
      categories: [],
      sizes: [],
      priceRange: [0, 500],
      sortOrder: "Default",
    };
    setSelectedCategories(emptyState.categories);
    setSelectedSizes(emptyState.sizes);
    setPriceRange(emptyState.priceRange);
    setSortOrder(emptyState.sortOrder);

    // schedule URL clearing via the same effect that listens to state changes
  };

  // --- Helper Data (no change) ---
  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$26 - $49", min: 26, max: 49 },
    { label: "$50 - $99", min: 50, max: 99 },
    { label: "Over $100", min: 100, max: Infinity },
  ];

  return (
    <FilterContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        toggleCategory,
        selectedSizes,
        setSelectedSizes,
        toggleSize,
        priceRange,
        setPriceRange,
        togglePrice,
        priceRanges,
        toggleReset,
        sortOrder,
        toggleSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
