import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export interface CursorState {
  type: 'default' | 'interactive' | 'hidden';
  text?: string;
}

interface GlowCursorProps {
  cursorState: CursorState;
}

export function GlowCursor({ cursorState }: GlowCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ambient glow ring spring
  const springX = useSpring(mouseX, { stiffness: 550, damping: 32 });
  const springY = useSpring(mouseY, { stiffness: 550, damping: 32 });

  // Secondary reactive ring spring
  const ringX = useSpring(mouseX, { stiffness: 850, damping: 38 });
  const ringY = useSpring(mouseY, { stiffness: 850, damping: 38 });

  // Center precision reticle
  const dotX = useSpring(mouseX, { stiffness: 1900, damping: 48 });
  const dotY = useSpring(mouseY, { stiffness: 1900, damping: 48 });

  useEffect(() => {
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

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsMouseDown(false);
    };
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible || cursorState.type === 'hidden') {
    return null;
  }

  const isInteractive = cursorState.type === 'interactive';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Large Ambient Radiance Field */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isInteractive ? 76 : 46,
          height: isInteractive ? 76 : 46,
          scale: isMouseDown ? 0.78 : 1,
          borderColor: isInteractive ? 'rgba(56, 189, 248, 0.95)' : 'rgba(56, 189, 248, 0.4)',
          backgroundColor: isInteractive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.04)',
          boxShadow: isInteractive
            ? '0 0 45px rgba(56, 189, 248, 0.85), 0 0 25px rgba(14, 165, 233, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.4)'
            : '0 0 26px rgba(56, 189, 248, 0.45), 0 0 10px rgba(125, 211, 252, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 26 }}
      >
        {/* Diamond Crosshairs when Interactive */}
        {isInteractive && (
          <>
            <span className="absolute -top-1.5 w-1 h-3 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span className="absolute -bottom-1.5 w-1 h-3 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span className="absolute -left-1.5 h-1 w-3 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
            <span className="absolute -right-1.5 h-1 w-3 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
          </>
        )}
      </motion.div>

      {/* 2. Orbiting Satellite Sparks Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isInteractive ? 50 : 28,
          height: isInteractive ? 50 : 28,
          rotate: isInteractive ? 360 : 180,
          scale: isMouseDown ? 1.25 : 1,
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: isInteractive ? 3.5 : 8,
            ease: 'linear',
          },
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          scale: { duration: 0.15 },
        }}
      >
        {/* Orbital Micro-Spark Satellites */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
        {isInteractive && (
          <>
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_#7dd3fc]" />
          </>
        )}
      </motion.div>

      {/* 3. Central Precision Plasma Point & Spark Glint */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isInteractive ? 10 : 6,
          height: isInteractive ? 10 : 6,
          scale: isMouseDown ? 0.6 : 1,
          backgroundColor: isInteractive ? '#38bdf8' : '#ffffff',
          boxShadow: isInteractive
            ? '0 0 20px #38bdf8, 0 0 10px #7dd3fc, 0 0 4px #ffffff'
            : '0 0 14px #38bdf8, 0 0 5px #ffffff',
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Core hot spark */}
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </div>
  );
}
