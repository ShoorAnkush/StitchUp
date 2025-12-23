"use client";

import { motion, AnimatePresence } from "framer-motion";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { SideMenuContent } from "./SideMenuContent";

export const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%" }, // slide in from left
    visible: { x: "0%" }, // fully visible
    exit: { x: "-100%" }, // slide back out
  };

  return (
    <div>
      <div className="z-100 relative">
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={26} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // click outside closes
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed h-screen top-0 bottom-0 left-0 w-full md:w-150 bg-white shadow-lg z-50 p-6 flex flex-col"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="space-y-6 mt-6 overflow-y-auto">
                <SideMenuContent setIsOpen={setIsOpen} />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
