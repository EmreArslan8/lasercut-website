import { useEffect, useState, RefObject } from "react";
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
  | "slowZoom";

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

// ✅ useGsapAnimation artık bir custom React Hook!
const useGsapAnimation = (
  target: RefObject<HTMLElement | null> | string,
  options: AnimationOptions = {}
) => {
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


  useEffect(() => {

    const elements =
      typeof target === "string"
        ? gsap.utils.toArray<HTMLElement>(target)
        : target.current
        ? [target.current]
        : [];

    elements.forEach((element, index) => {
      element.style.opacity = "1";

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
};

export default useGsapAnimation;
