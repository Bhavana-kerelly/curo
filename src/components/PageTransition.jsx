import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * PageTransition — White curtain that covers the viewport between page changes.
 *
 * Usage: Pass `pageKey` (e.g. current page string).
 * Every time pageKey changes the curtain slides in → new content renders → slides out.
 */
const PageTransition = ({ pageKey, children }) => {
  const curtainRef = useRef(null);
  const prevKey    = useRef(pageKey);
  const isMounted  = useRef(false);

  // First mount: slide out immediately (loader already handled the entry)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      gsap.set(curtainRef.current, { scaleY: 0, transformOrigin: 'top center' });
      return;
    }
  }, []);

  // On page change
  useEffect(() => {
    if (!isMounted.current) return;
    if (prevKey.current === pageKey) return;
    prevKey.current = pageKey;

    // Pause Lenis during transition
    if (window.__lenis) window.__lenis.stop();

    const tl = gsap.timeline({
      onComplete: () => {
        if (window.__lenis) window.__lenis.start();
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });

    // Slide curtain DOWN (cover)
    tl.fromTo(curtainRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 0.45, ease: 'power3.inOut' }
    );

    // Tiny hold
    tl.to({}, { duration: 0.1 });

    // Slide curtain UP (reveal new page)
    tl.to(curtainRef.current, {
      scaleY: 0,
      transformOrigin: 'bottom center',
      duration: 0.55,
      ease: 'power3.inOut',
    });

    return () => tl.kill();
  }, [pageKey]);

  return (
    <>
      {/* Curtain element — sits in front of everything */}
      <div
        ref={curtainRef}
        className="page-curtain"
        aria-hidden="true"
        style={{ transform: 'scaleY(0)', transformOrigin: 'top center' }}
      />
      {children}
    </>
  );
};

export default PageTransition;
