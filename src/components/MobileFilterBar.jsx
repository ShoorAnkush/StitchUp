"use client";

import { FiFilter } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { MobileFilterDrawer } from "./MobileFilterDrawer";

export const MobileFilterBar = ({
  gender,
  sortOptions,
  toggleSort,
  activeSort,
}) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("filter"); // filter | sort

  const openDrawer = (type) => {
    setMode(type);
    setOpen(true);
  };

  return (
    <>
      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white text-black shadow-[0_-2px_8px_rgba(0,0,0,0.15)]">
        <div className="flex">
          <button
            onClick={() => openDrawer("filter")}
            className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-r active:bg-gray-200"
          >
            <FiFilter size={18} />
            FILTER
          </button>

          <button
            onClick={() => openDrawer("sort")}
            className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold active:bg-gray-200"
          >
            SORT
            <IoIosArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <MobileFilterDrawer
        open={open}
        mode={mode}
        onClose={() => setOpen(false)}
        gender={gender}
        sortOptions={sortOptions}
        toggleSort={toggleSort}
        activeSort={activeSort}
      />
    </>
  );
};
