// app/cart/page.jsx  (or pages/cart.jsx) — client component
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

export default function CartPage({ product }) {
  const { cartItems = [], removeFromCart, updateQuantity } = useCart();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const router = useRouter();

  const colors = Array.isArray(product?.colors) ? product.colors : [];
  const sizes = Array.isArray(product?.sizes) ? product.sizes : [];
  // normalize numbers just in case
  const norm = (v) => (typeof v === "string" ? Number(v) : v);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );
  const tax = total * 0.13;
  const finalTotal = total + tax;

  const handleProductClick = (id) => {
    router.push(`/product/${norm(id)}`);
  };

  if (!Array.isArray(cartItems) || cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-3xl text-gray-500 text-center">
          Your cart is empty.
        </p>
        <Link
          href="/men"
          className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 active:scale-95 transition"
        >
          Browse Products
        </Link>
      </div>
    );

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between py-16 max-w-6xl w-full px-6 mx-auto gap-10 text-black">
      {/* Cart Items */}
      <div className="flex-1">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart
          <span className="text-sm text-gray-500">
            ({cartItems.length} {cartItems.length > 1 ? "Items" : "Item"})
          </span>
        </h1>

        {/* Table Head */}
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium border-b pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* Products */}
        {cartItems.map((product) => {
          const key = `${product.id}-${product.size ?? "nosize"}-${
            product.color ?? "nocolor"
          }`;

          // Defensive: images may be array or string
          const imgSrc =
            Array.isArray(product.images) && product.images.length
              ? product.images[0]
              : typeof product.images === "string"
              ? product.images
              : "/images/placeholder.png";

          const colors = Array.isArray(product?.colors) ? product.colors : [];
          const sizes = Array.isArray(product?.sizes) ? product.sizes : [];

          return (
            <div
              key={key}
              className="grid grid-cols-[2fr_1fr_1fr] items-center border-b py-4 text-sm md:text-base text-gray-600"
            >
              {/* Product details */}
              <div className="flex items-center gap-3 md:gap-6">
                <div
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                >
                  <Image
                    src={imgSrc}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    quality={85}
                    priority={false}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800 mb-1">
                    {product.name}
                  </p>
                  <p className="text-gray-800 text-sm">${product.price}</p>

                  {/* Sizes */}
                  {sizes.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Size:</span>

                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm 
                 text-gray-800 font-medium capitalize outline-none"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                      >
                        <option value="" disabled>
                          {product.size}
                        </option>

                        {sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Color */}
                  {colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-gray-500 text-sm">Color:</span>

                      <select
                        className="border border-gray-300 rounded px-2 py-1 text-sm 
                 text-gray-800 font-medium capitalize outline-none"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >
                        <option value="" disabled>
                          {product.color}
                        </option>

                        {colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Qty:</span>
                    <select
                      className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          product.id,
                          product.size,
                          product.color,
                          Number(e.target.value)
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <p className="text-center font-medium">
                ${(Number(product.price) * Number(product.quantity)).toFixed(2)}
              </p>

              {/* Remove Button */}
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    removeFromCart(product.id, product.size, product.color)
                  }
                  className="p-2 hover:bg-red-100 rounded transition"
                  aria-label="Remove item"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}

        {/* Continue Shopping */}
        <div className="flex justify-center">
          <Link
            href="/men"
            className="flex w-fit items-center gap-2 mt-8 text-black/70 font-medium hover:underline"
          >
            <FaLongArrowAltLeft />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Order Summary */}
      <aside className="max-w-[360px] w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Order Summary
        </h2>

        {/* Delivery Address */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-gray-700 uppercase">
              Delivery Address
            </p>
            <button className="text-gray-900 text-base font-medium underline cursor-pointer">
              Change
            </button>
          </div>

          <div className="relative">
            <p className="text-gray-500 text-sm">No address found</p>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 uppercase mb-2">
            Payment Method
          </p>
          <select className="w-full border border-gray-300 bg-gray-50 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-gray-400 focus:outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-200 mb-5" />

        {/* Totals */}
        <div className="text-gray-700 text-sm space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (13%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-4 flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* NOTE: keep your existing checkout handler or wire this button */}
        <button
          onClick={handleCheckout}
          className="w-full py-3 mt-6 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 active:scale-[0.98] transition cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  );
}
