"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { toast } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "clip";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await sendEmailVerification(userCredential.user);
        await updateProfile(userCredential.user, { displayName: name });

        await setDoc(
          doc(db, "users", userCredential.user.uid),
          {
            profile: {
              name,
              email,
              cart: [],
              wishlist: [],
              photoURL: userCredential.user.photoURL || "",
            },
            cart: [],
            wishlist: [],
            createdAt: serverTimestamp(),
          },
          { merge: true }
        );
        await signOut(auth);
        toast.success("Account created! Please log in.");
      }

      onClose();
    } catch (err) {
      let message = "Something went wrong. Please try again.";

      if (err instanceof FirebaseError) {
        if (err.code === "auth/email-already-in-use") {
          message = "This email is already registered.";
        } else if (err.code === "auth/invalid-credential") {
          message = "Invalid email or password.";
        }
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm p-8 relative bg-white/10 text-white min-h-[520px] flex flex-col justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-white hover:text-gray-200 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-semibold mb-8 text-center tracking-wide drop-shadow-md">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full text-xl bg-white/30 placeholder-gray-200 placeholder:text-md text-white border border-white/30 rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full text-xl bg-white/30 placeholder-gray-200 placeholder:text-md text-white border border-white/30 rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-xl bg-white/30 placeholder-gray-200 placeholder:text-md text-white border border-white/30 rounded-lg p-2 focus:ring-2 focus:ring-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-black/80 hover:bg-black/90 text-white mt-6 py-3 rounded-lg font-medium tracking-wide transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-200 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-white font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};
