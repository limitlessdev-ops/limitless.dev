import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from './useLenis';

/**
 * useParallax — GPU-accelerated, performance-optimised parallax
 * Uses will-change + force3D to keep everything on the compositor thread
 */
export function useParallax(speed = 0.3, direction = 'y') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Force GPU layer — prevents paint/layout on every frame
    el.style.willChange = 'transform';

    const ctx = gsap.context(() => {
      gsap.to(el, {
        [direction]: () => -(window.innerHeight * speed),
        ease: 'none',
        force3D: true, // Force hardware acceleration
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2, // Higher = smoother interpolation, less jank than scrub: true
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Snap quickly when fast scrolling
        },
      });
    });

    return () => {
      el.style.willChange = 'auto';
      ctx.revert();
    };
  }, [speed, direction]);

  return ref;
}

/**
 * useFadeInUp — lightweight, one-shot entrance animation (no scrub, no lag)
 */
export function useFadeInUp(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40, force3D: true },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none', // play once, never reverse — faster
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

/**
 * useScaleIn — lightweight, one-shot scale entrance (no scrub)
 */
export function useScaleIn(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.93, force3D: true },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none', // play once only
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return ref;
}
