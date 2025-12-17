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

export const Navbar = () => {
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  const [showAuth, setShowAuth] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

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
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-black group-hover:w-full transition-all duration-300"></span>
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
              <div className="h-26 md:h-42 w-auto">
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
            {/* Search Box */}
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
                placeholder="Find products..."
                className="w-full outline-none placeholder-gray-400 text-gray-700 text-sm bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <GoSearch
                  size={20}
                  className="cursor-pointer text-gray-600 hover:text-black transition"
                />
              </button>
            </form>

            {/* Profile */}
            {user ? (
              <div className="relative w-12 flex flex-col items-center justify-center">
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.displayName || user.email[0]
                  )}&background=0D8ABC&color=fff`}
                  alt={user.displayName || "User avatar"}
                  width={32}
                  height={32}
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition"
                />

                {profileOpen && (
                  <div className="absolute right-0 mt-3 bg-white rounded-2xl shadow-xl p-4 min-w-[180px] text-gray-700">
                    <p className="font-semibold text-sm mb-2">
                      Hello, {user.displayName}
                    </p>
                    <hr className="mb-2" />
                    <button
                      onClick={logout}
                      className="text-xl text-left hover:text-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-12 flex flex-col items-center justify-center text-black cursor-pointer">
                <FiUser
                  size={20}
                  onClick={() => setShowAuth(true)}
                  className="text-gray-600 hover:text-black transition"
                />
                <span className="text-[11px] font-bold leading-none mt-1">
                  Profile
                </span>
              </div>
            )}

            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative w-12 flex flex-col items-center justify-center text-black"
            >
              <IoMdHeartEmpty
                size={20}
                className="cursor-pointer text-gray-600 hover:text-black transition"
              />

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
              className="relative w-12 flex flex-col items-center justify-center text-black"
            >
              <IoBagHandleOutline
                size={20}
                className="cursor-pointer text-gray-600 hover:text-black transition"
              />

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
