import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — A premium spring-based cursor with:
 * - Dot (follows exactly)
 * - Ring (lags behind with lerp)
 * - Grows on hover over buttons/links/cards
 * - Hidden on touch devices
 */
const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const wrapRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);
  const isHover = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows instantly
      gsap.set(dotRef.current, { x: e.clientX, y: e.clientY });
    };

    // Lerp ring toward mouse
    const tick = () => {
      const lerp = 0.12;
      ring.current.x += (mouse.current.x - ring.current.x) * lerp;
      ring.current.y += (mouse.current.y - ring.current.y) * lerp;
      gsap.set(ringRef.current, { x: ring.current.x, y: ring.current.y });
      raf.current = requestAnimationFrame(tick);
    };

    // Hover detection
    const onEnter = (e) => {
      const el = e.target.closest('button, a, [data-cursor-hover], .glass-panel, .group');
      if (el && !isHover.current) {
        isHover.current = true;
        wrapRef.current?.classList.add('cursor-hover');
      }
    };

    const onLeave = (e) => {
      const el = e.target.closest('button, a, [data-cursor-hover], .glass-panel, .group');
      if (el && isHover.current) {
        isHover.current = false;
        wrapRef.current?.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout',  onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout',  onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="curo-cursor" aria-hidden="true">
      <div ref={dotRef}  className="curo-cursor-dot"  />
      <div ref={ringRef} className="curo-cursor-ring" />
    </div>
  );
};

export default CustomCursor;
