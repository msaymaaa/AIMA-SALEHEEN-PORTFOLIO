import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  color: string;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track pointer state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false,
    };

    // Palettes of subtle luminous sparks (warm champagne, gold dust, crisp white)
    const particleColors = [
      'rgba(244, 243, 239, ', // Crisp ivory
      'rgba(212, 163, 115, ', // Warm amber / bronze
      'rgba(230, 218, 196, ', // Soft champagne
      'rgba(180, 185, 200, ', // Cool technical starlight
    ];

    const isMobile = window.innerWidth < 768;
    // Controlled density: delicate and atmospheric
    const particleCount = prefersReducedMotion
      ? 40
      : isMobile
      ? 55
      : Math.min(140, Math.floor((width * height) / 9500));

    const particles: Particle[] = [];
    const sparks: Spark[] = [];

    // Initialize particles across full viewport
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.28 + 0.08;
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];

      particles.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        size: Math.random() * 1.2 + 0.65, // Very small: 0.65px - 1.85px
        baseAlpha,
        alpha: baseAlpha,
        color,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // High-DPI handling
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-bound particles that might be out of range
      particles.forEach((p) => {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
        p.originX = p.x;
        p.originY = p.y;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse listeners on window for seamless full-screen coverage
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Clear with clean canvas (background color is handled by CSS / near-black)
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      if (mouse.isHovered) {
        mouse.vx = (mouse.targetX - mouse.x) * 0.18;
        mouse.vy = (mouse.targetY - mouse.y) * 0.18;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x += mouse.vx;
        mouse.y += mouse.vy;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);

        // Spawn delicate micro-sparks on cursor stroke
        if (!prefersReducedMotion && mouse.speed > 2.5 && sparks.length < 35) {
          const sparkCount = Math.min(2, Math.floor(mouse.speed / 4));
          for (let s = 0; s < sparkCount; s++) {
            const angle = Math.random() * Math.PI * 2;
            const spread = Math.random() * 1.5;
            sparks.push({
              x: mouse.x + (Math.random() - 0.5) * 8,
              y: mouse.y + (Math.random() - 0.5) * 8,
              vx: (mouse.vx * 0.15 + Math.cos(angle) * spread) * 0.5,
              vy: (mouse.vy * 0.15 + Math.sin(angle) * spread) * 0.5,
              size: Math.random() * 1.1 + 0.5,
              alpha: 0.65,
              maxLife: Math.random() * 25 + 20,
              life: 0,
              color: Math.random() > 0.4 ? 'rgba(212, 163, 115, ' : 'rgba(244, 243, 239, ',
            });
          }
        }
      } else {
        mouse.speed = 0;
      }

      // Update & render cursor spark trail
      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life += 1;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.95;
        spark.vy *= 0.95;

        const progress = spark.life / spark.maxLife;
        const currentAlpha = (1 - progress) * spark.alpha;

        if (progress >= 1 || currentAlpha <= 0.01) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${spark.color}${currentAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Proximity interaction radius
      const interactionRadius = isMobile ? 100 : 150;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      // Update & render base particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient twinkle
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = (Math.sin(p.twinklePhase) + 1) * 0.5; // 0..1
        let targetAlpha = p.baseAlpha + twinkle * 0.15;

        // Ambient movement
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Gentle bounce / wrap
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;
        }

        // Pointer proximity physics & luminous brightening
        if (mouse.isHovered && !prefersReducedMotion) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / interactionRadius; // 1 at center, 0 at edge

            // Dynamic luminous flare around cursor
            const brightnessBoost = factor * 0.65;
            targetAlpha = Math.min(0.95, targetAlpha + brightnessBoost);

            // Subtle gentle displacement away from pointer movement
            const force = factor * (mouse.speed * 0.04 + 0.4);
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force;
            p.y += Math.sin(angle) * force;
          }
        }

        // Alpha easing
        p.alpha += (targetAlpha - p.alpha) * 0.12;

        // Draw particle
        ctx.fillStyle = `${p.color}${Math.max(0.04, Math.min(p.alpha, 0.95)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional tiny glow halo for brightened particles near cursor
        if (p.alpha > 0.45 && !isMobile) {
          ctx.fillStyle = `${p.color}${(p.alpha * 0.2).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
