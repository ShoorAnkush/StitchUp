"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoBagHandleOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiUser } from "react-icons/fi";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

import { SidebarMenu } from "@/components/SidebarMenu";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";

import { useTypewriterPlaceholder } from "@/hooks/useTypewriterPlaceholder";

export const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();

  const [showAuth, setShowAuth] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  const placeholders = ["Hoodies", "Sneakers", "Jackets", "Accessories"];

  const placeholder = useTypewriterPlaceholder(placeholders);

  return (
    <div className="top-0 sticky z-50">
      <nav className="relative bg-[#f9f9f9] shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-8 h-16 relative">
          {/* Left Section */}
          <div className="flex items-center gap-4 md:gap-16 text-black">
            <SidebarMenu />

            <div className="hidden md:flex text-lg gap-8 font-semibold tracking-wide">
              <Link
                href="/men"
                className={`relative group transition font-semibold hover:text-gray-900 ${
                  isActive("/men")
                    ? "text-black scale-115 transition"
                    : "text-black/80"
                }`}
              >
                MEN
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
              </Link>

              <Link
                href="/women"
                className={`relative group transition font-semibold hover:text-gray-900 ${
                  isActive("/women")
                    ? "text-black scale-115 transition"
                    : "text-black/80"
                }`}
              >
                WOMEN
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            </div>
          </div>

          {/* Center Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition">
            <Link href="/">
              <div className="h-22 md:h-36 w-auto">
                <Image
                  src="/images/logo.png"
                  alt="StitchUp Logo"
                  width={500}
                  height={500}
                  className="w-full h-full"
                />
              </div>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 text-2xl relative z-20">
            {/* Desktop Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!searchQuery.trim()) return;
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
              }}
              className="hidden lg:flex items-center border rounded-full px-3 py-1 gap-2 bg-white shadow-sm hover:shadow-md transition w-[180px] md:w-[220px]"
            >
              <input
                type="text"
                placeholder={`Search ${placeholder}`}
                className="w-full outline-none placeholder-gray-400 text-gray-700 text-sm bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <GoSearch className="text-[18px] md:text-[20px] text-gray-600 hover:text-black transition" />
              </button>
            </form>

            {/* Mobile Search Icon (NEW) */}
            <button
              onClick={() => router.push("/search")}
              className="lg:hidden w-12 flex flex-col items-center justify-center
                         text-gray-600 hover:text-black transition"
            >
              <GoSearch className="text-[18px]" />
              <span className="text-[11px] font-bold leading-none mt-1">
                Search
              </span>
            </button>

            {/* Profile */}
            {user ? (
              <div className="dropdown dropdown-end relative w-12 flex flex-col items-center justify-center">
                <Image
                  tabIndex={0}
                  role="button"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email[0]
                  )}&background=0D8ABC&color=fff`}
                  alt={user.displayName || "User avatar"}
                  width={600}
                  height={600}
                  className="w-7 h-7 md:w-8 md:h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                />

                <div
                  tabIndex={-1}
                  className="dropdown-content absolute right-2 top-10 bg-white rounded-2xl shadow-xl p-4 min-w-38 text-gray-700 z-50"
                >
                  <p className="font-semibold text-sm mb-2">
                    Hello, {user.displayName}
                  </p>

                  <hr className="mb-2" />

                  <button
                    onClick={logout}
                    className="text-base font-semibold text-left hover:scale-110 transition w-full cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="group w-12 flex flex-col items-center justify-center cursor-pointer
                           text-gray-600 hover:text-black transition"
              >
                <FiUser className="text-[18px] md:text-[20px]" />
                <span className="text-[11px] font-bold leading-none mt-1">
                  Profile
                </span>
              </button>
            )}

            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="group relative w-12 flex flex-col items-center justify-center cursor-pointer
                         text-gray-600 hover:text-black transition"
            >
              <IoMdHeartEmpty className="text-[18px] md:text-[20px]" />
              <span className="text-[11px] font-bold leading-none mt-1">
                Wishlist
              </span>

              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 right-1 bg-gray-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="group relative w-12 flex flex-col items-center justify-center cursor-pointer
                         text-gray-600 hover:text-black transition"
            >
              <IoBagHandleOutline className="text-[18px] md:text-[20px]" />
              <span className="text-[11px] font-bold leading-none mt-1">
                Cart
              </span>

              {cartItems.length > 0 && (
                <span className="absolute -top-1 right-1 bg-gray-500 text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="grid grid-cols-2 gap-5 text-lg md:hidden border-t bg-white">
          <Link
            href="/men"
            className={`flex justify-center cursor-pointer p-3 font-medium transition ${
              isActive("/men")
                ? "bg-linear-to-r from-black to-gray-700 text-white shadow-inner"
                : "text-gray-700 hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-300 active:scale-95"
            }`}
          >
            MEN
          </Link>

          <Link
            href="/women"
            className={`flex justify-center cursor-pointer p-3 font-medium transition ${
              isActive("/women")
                ? "bg-linear-to-r from-black to-gray-700 text-white shadow-inner"
                : "text-gray-700 hover:bg-linear-to-r hover:from-gray-100 hover:to-gray-300 active:scale-95"
            }`}
          >
            WOMEN
          </Link>
        </div>
      </nav>
    </div>
  );
};
