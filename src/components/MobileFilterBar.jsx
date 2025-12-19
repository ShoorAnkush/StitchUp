"use client";

import { FiFilter } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";

export const MobileFilterBar = ({ onFilter, onSort }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden text-black">
      <div className="flex bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
        <button
          onClick={onFilter}
          className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-r"
        >
          <FiFilter size={18} />
          FILTER
        </button>

        <button
          onClick={onSort}
          className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold"
        >
          SORT BY
          <IoIosArrowUp size={16} />
        </button>
      </div>
    </div>
  );
};
