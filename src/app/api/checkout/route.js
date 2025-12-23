import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const body = await req.json();

    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty or missing");
    }
    const TAX_RATE = 0.13; // 13% HST

    // ✅ Calculate subtotal
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // ✅ Calculate tax (in cents)
    const taxAmountCents = Math.round(subtotal * TAX_RATE * 100);

    const productLineItems = cartItems.map((item) => {
      if (!item.price || !item.name) {
        throw new Error("Invalid cart item structure");
      }

      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
            images: item.images?.length ? [item.images[0]] : [],
          },
          unit_amount: Math.round(item.price * 100 + 13 / 100),
        },
        quantity: item.quantity || 1,
      };
    });

    const line_items = [
      ...productLineItems,
      {
        price_data: {
          currency: "cad",
          product_data: {
            name: "HST (13%)",
          },
          unit_amount: taxAmountCents,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("STRIPE ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
