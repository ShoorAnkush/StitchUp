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
        if (err.code === "auth/email-already-in-use")
          message = "This email is already registered.";
        if (err.code === "auth/invalid-credential")
          message = "Invalid email or password.";
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-8 sm:px-0"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm bg-white/10 text-white relative flex flex-col justify-center max-h-[90vh] overflow-y-auto p-5 sm:p-8 sm:min-h-[520px]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 text-xl sm:text-2xl cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center tracking-wide drop-shadow-md">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full text-base sm:text-xl bg-white/30 placeholder-gray-200 placeholder:text-sm text-white border border-white/30 rounded-lg p-2.5 focus:ring-2 focus:ring-white focus:outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-base sm:text-xl bg-white/30 placeholder-gray-200 placeholder:text-sm text-white border border-white/30 rounded-lg p-2.5 focus:ring-2 focus:ring-white focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-base sm:text-xl bg-white/30 placeholder-gray-200 placeholder:text-sm text-white border border-white/30 rounded-lg p-2.5 focus:ring-2 focus:ring-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black/80 hover:bg-black/90 text-white mt-4 sm:mt-6 py-3 rounded-lg font-medium tracking-wide transition disabled:opacity-60 cursor-pointer"
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
