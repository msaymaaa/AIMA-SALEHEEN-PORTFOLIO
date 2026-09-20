import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export interface CursorState {
  type: 'default' | 'interactive' | 'hidden';
  text?: string;
}

interface CustomCursorProps {
  cursorState: CursorState;
}

export function CustomCursor({ cursorState }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Fast, natural spring response for outer ring so it never lags behind the hand
  const springX = useSpring(mouseX, { stiffness: 650, damping: 38 });
  const springY = useSpring(mouseY, { stiffness: 650, damping: 38 });

  // Instant response for inner precision reticle dot
  const dotSpringX = useSpring(mouseX, { stiffness: 1200, damping: 45 });
  const dotSpringY = useSpring(mouseY, { stiffness: 1200, damping: 45 });

  useEffect(() => {
    // Detect touch / coarse pointers
    const checkTouch = () => {
      const isTouch =
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(isTouch);
      if (!isTouch) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible || cursorState.type === 'hidden') {
    return null;
  }

  const isInteractive = cursorState.type === 'interactive';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Subtle Aura Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center border transition-colors duration-150"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isInteractive ? 44 : 26,
          height: isInteractive ? 44 : 26,
          borderColor: isInteractive ? 'rgba(212, 163, 115, 0.65)' : 'rgba(244, 243, 239, 0.22)',
          backgroundColor: isInteractive ? 'rgba(212, 163, 115, 0.08)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#f4f3ef]"
        style={{
          x: dotSpringX,
          y: dotSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isInteractive ? 1.5 : 1,
          backgroundColor: isInteractive ? '#d4a373' : '#f4f3ef',
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
