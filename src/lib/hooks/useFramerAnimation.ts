import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

/**
 * Framer Motion animasyon türlerini içeren type
 */
type AnimationType =
  | "fadeIn"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "zoomIn"
  | "slowZoom"
  | "counter"
  | "hoverTap"; // ✅ Yeni animasyon eklendi

/**
 * 🎯 Framer Motion kullanarak farklı animasyonları yöneten hook.
 */
export const useFramerAnimations = (type: AnimationType, endValue?: number, duration = 2) => {
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (type === "counter" && endValue !== undefined) {
      let start = 0;
      const incrementTime = 50;
      const steps = (duration * 1000) / incrementTime;
      const step = endValue / steps;

      const interval = setInterval(() => {
        start += step;
        setCount(Math.round(start));
        if (start >= endValue) clearInterval(interval);
      }, incrementTime);

      return () => clearInterval(interval);
    }
  }, [type, endValue, duration]);

  const animations: Record<AnimationType, any> = {
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { duration, ease: "easeOut" },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration, ease: "easeOut" },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration, ease: "easeOut" },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration, ease: "easeOut" },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.8 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration, ease: "easeOut" },
    },
    slowZoom: {
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
    },
    hoverTap: {
      whileHover: { scale: 1.05, y: -8 }, // ✅ Hover'da büyütüp yukarı kaydır
      whileTap: { scale: 0.95 }, // ✅ Tıklayınca küçült
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    counter: {},
  };

  return { controls, animation: animations[type], count };
};
