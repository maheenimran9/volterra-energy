import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Ultra-fast, zero-blocking GSAP entrance.
 * Never hides elements at opacity: 0 so users see content immediately with smooth crisp motion.
 */
export function useInstantHeroGsap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const heroItems = el.querySelectorAll('[data-gsap="hero"]');
      if (heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { y: 10, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.28,
            stagger: 0.035,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      const cards = el.querySelectorAll('[data-gsap="reveal-card"]');
      cards.forEach((cardGroup) => {
        const children = cardGroup.querySelectorAll('[data-gsap-item]');
        const targets = children.length > 0 ? children : [cardGroup];
        gsap.fromTo(
          targets,
          { y: 10, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.26,
            stagger: 0.03,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: cardGroup,
              start: 'top 98%',
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}
