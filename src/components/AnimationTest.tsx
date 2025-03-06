import React, { useRef } from 'react';

import { Camera, ArrowDown, ArrowRight, ArrowLeft, ZoomIn, BarChart3 } from 'lucide-react';
import useGsapAnimation from '@/lib/hooks/useGsapAnimation';

const AnimationTest: React.FC = () => {
  // Create refs for each animation type
  const fadeInRef = useRef<HTMLDivElement>(null);
  const slideUpRef = useRef<HTMLDivElement>(null);
  const slideLeftRef = useRef<HTMLDivElement>(null);
  const slideRightRef = useRef<HTMLDivElement>(null);
  const zoomInRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Apply animations using the hook
  useGsapAnimation(fadeInRef, { animation: "fadeIn", duration: 1.5 });
  useGsapAnimation(slideUpRef, { animation: "slideUp", duration: 1.2, ease: "back.out(1.7)" });
  useGsapAnimation(slideLeftRef, { animation: "slideLeft", duration: 1.2, delay: 0.3 });
  useGsapAnimation(slideRightRef, { animation: "slideRight", duration: 1.2, delay: 0.6 });
  useGsapAnimation(zoomInRef, { animation: "zoomIn", duration: 2, delay: 0.9 });
  useGsapAnimation(counterRef, { 
    animation: "counter", 
    duration: 3, 
    counterEndValue: 100, 
    suffix: "%", 
    ease: "power2.out" 
  });

  return (
    <div className="py-20 px-4 bg-gray-800 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          GSAP Animation Hook Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Fade In Animation */}
          <div 
            ref={fadeInRef}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <Camera size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fade In</h3>
            <p className="text-center text-sm opacity-80">Scroll triggered fade in animation</p>
          </div>
          
          {/* Slide Up Animation */}
          <div 
            ref={slideUpRef}
            className="bg-gradient-to-br from-purple-600 to-pink-700 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <ArrowDown size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Slide Up</h3>
            <p className="text-center text-sm opacity-80">Elements slide up into view</p>
          </div>
          
          {/* Slide Left Animation */}
          <div 
            ref={slideLeftRef}
            className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <ArrowRight size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Slide Left</h3>
            <p className="text-center text-sm opacity-80">Elements slide in from the right</p>
          </div>
          
          {/* Slide Right Animation */}
          <div 
            ref={slideRightRef}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <ArrowLeft size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Slide Right</h3>
            <p className="text-center text-sm opacity-80">Elements slide in from the left</p>
          </div>
          
          {/* Zoom In Animation */}
          <div 
            ref={zoomInRef}
            className="bg-gradient-to-br from-rose-500 to-red-600 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <ZoomIn size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Zoom In</h3>
            <p className="text-center text-sm opacity-80">Elements zoom into view</p>
          </div>
          
          {/* Counter Animation */}
          <div 
            className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 rounded-xl shadow-xl flex flex-col items-center justify-center h-64"
          >
            <BarChart3 size={48} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Counter Animation</h3>
            <div ref={counterRef} className="text-4xl font-bold">0%</div>
          </div>
        </div>
        
        <div className="text-center opacity-80 max-w-2xl mx-auto">
          <p className="mb-4">
            These animations are triggered by scrolling. The useGsapAnimation hook provides a simple way to add GSAP animations with ScrollTrigger to any component.
          </p>
          <p>
            Customize animations with different durations, delays, easing functions, and more.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimationTest;