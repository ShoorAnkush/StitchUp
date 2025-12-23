import { useEffect } from "react";

export function useAutoSelectOptions({
  colors,
  sizes,
  setSelectedColor,
  setSelectedSize,
}) {
  useEffect(() => {
    if (Array.isArray(colors) && colors.length === 1) {
      setSelectedColor(colors[0]);
    }

    if (Array.isArray(sizes) && sizes.length === 1) {
      setSelectedSize(sizes[0]);
    }
  }, [colors, sizes, setSelectedColor, setSelectedSize]);
}
