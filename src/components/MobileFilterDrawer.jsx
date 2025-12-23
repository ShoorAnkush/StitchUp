"use client";

import { IoClose, IoCheckmark } from "react-icons/io5";
import { FilterSidebar } from "@/components/FilterSidebar";

export const MobileFilterDrawer = ({
  open,
  mode,
  onClose,
  gender,
  sortOptions = [],
  toggleSort,
  activeSort,
}) => {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 md:hidden"
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white text-black rounded-t-3xl max-h-dvh flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-base font-semibold tracking-wide">
            {mode === "filter" ? "Filters" : "Sort"}
          </h2>

          <button onClick={onClose}>
            <IoClose size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {mode === "filter" ? (
            <FilterSidebar gender={gender} mobile />
          ) : (
            <ul className="divide-y">
              {sortOptions.map((sort) => {
                const isActive = activeSort === sort;

                return (
                  <li key={sort}>
                    <button
                      onClick={() => {
                        toggleSort(sort);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm"
                    >
                      <span
                        className={
                          isActive
                            ? "font-semibold text-black"
                            : "text-gray-600"
                        }
                      >
                        {sort}
                      </span>

                      {isActive && <IoCheckmark size={18} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
