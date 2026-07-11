import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useLenis — Initialises Lenis smooth scroll globally,
 * syncs it with GSAP ticker, and destroys on unmount.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

    // Sync Lenis scroll position with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Named RAF callback so it can be removed properly
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    // Tie Lenis RAF into GSAP ticker
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for external use (e.g. page transitions)
    window.__lenis = lenis;

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
}
