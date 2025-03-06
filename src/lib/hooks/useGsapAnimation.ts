import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | "fadeIn"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "zoomIn"
  | "counter"
  | "slowZoom"; // ✅ slowZoom eklendi

interface AnimationOptions {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  ease?: string;
  scrub?: boolean;
  start?: string;
  end?: string;
  counterEndValue?: number;
  suffix?: string;
}

function useGsapAnimation(
  target: RefObject<HTMLElement | null> | string,
  options: AnimationOptions = {}
) {
  const {
    animation = "fadeIn",
    delay = 0,
    duration = 1.5,
    ease = "power2.out",
    scrub = false,
    start = "top 80%",
    end = "bottom top",
    counterEndValue = 100,
    suffix = "%",
  } = options;

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;

    const elements =
      typeof target === "string"
        ? gsap.utils.toArray<HTMLElement>(target)
        : target.current
        ? [target.current]
        : [];

    elements.forEach((element, index) => {
      if (animation === "counter") {
        const count = { value: 0 };
        ScrollTrigger.create({
          trigger: element,
          start,
          end,
          once: true,
          onEnter: () => {
            gsap.to(count, {
              value: counterEndValue,
              duration,
              delay: delay + index * 0.1,
              ease,
              onUpdate: () => {
                element.innerText = Math.round(count.value) + suffix;
              },
            });
          },
        });
        return;
      }

      if (animation === "slowZoom") {
        gsap.to(element, {
          scale: 1.15, // Yakınlaştırma oranı
          duration: 2, // Süreyi uzun tutarak yavaş efekt sağlanır
          ease: "power1.inOut",
          repeat: -1, // Sürekli tekrarlayan
          yoyo: true, // Geri sararak eski haline döner
        });
        return;
      }

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay: delay + index * 0.1,
        ease,
      };

      switch (animation) {
        case "slideUp":
          fromVars.y = 50;
          toVars.y = 0;
          break;
        case "slideLeft":
          fromVars.x = 50;
          toVars.x = 0;
          break;
        case "slideRight":
          fromVars.x = -50;
          toVars.x = 0;
          break;
        case "zoomIn":
          fromVars.scale = 1;
          toVars.scale = 1.2;
          break;
        case "fadeIn":
        default:
          break;
      }

      const anim = gsap.fromTo(element, fromVars, toVars);

      ScrollTrigger.create({
        trigger: element,
        start,
        end,
        scrub,
        animation: anim,
        once: !scrub,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    target,
    animation,
    delay,
    duration,
    ease,
    scrub,
    start,
    end,
    counterEndValue,
    suffix,
  ]);
}

export default useGsapAnimation;
