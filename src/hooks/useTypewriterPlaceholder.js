"use client";
import { useEffect, useState } from "react";

export function useTypewriterPlaceholder(
  texts,
  speed = 200,
  delay = 2200,
  paused = false // 👈 ADD THIS
) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused) return; // 🛑 STOP when paused

    let charIndex = 0;
    let interval;

    interval = setInterval(() => {
      setText(texts[index].slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === texts[index].length) {
        clearInterval(interval);
        setTimeout(() => {
          setText("");
          setIndex((prev) => (prev + 1) % texts.length);
        }, delay);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [index, texts, speed, delay, paused]); // 👈 ADD paused

  return text;
}
