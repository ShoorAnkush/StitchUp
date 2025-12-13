import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVA71SFbj5i-RNOQfvwT_0bk0WKJU5QcY",
  authDomain: "stitchup-26927.firebaseapp.com",
  projectId: "stitchup-26927",
  storageBucket: "stitchup-26927.firebasestorage.app",
  messagingSenderId: "985878136635",
  appId: "1:985878136635:web:8c001d2654a431114b191e",
  measurementId: "G-J93C95GS80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
// Initialize Firestore DB
export const db = getFirestore(app);
