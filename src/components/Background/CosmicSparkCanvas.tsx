import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  maxLife: number;
  life: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  type: 'diamond' | 'streak' | 'ember';
  trailHistory: { x: number; y: number }[];
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
  color: string;
}

export function CosmicSparkCanvas() {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const sparkCanvas = sparkCanvasRef.current;
    if (!bgCanvas || !sparkCanvas) return;

    const bgCtx = bgCanvas.getContext('2d');
    const sparkCtx = sparkCanvas.getContext('2d');
    if (!bgCtx || !sparkCtx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId: number;
    let width = (bgCanvas.width = sparkCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = sparkCanvas.height = window.innerHeight);

    // Mouse tracking with speed & interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovered: false,
      isInteractive: false,
    };

    // Rich cosmic & electric plasma spark palette
    const sparkPalette = [
      { r: 56, g: 189, b: 248 },   // Electric Sky 400
      { r: 125, g: 211, b: 252 },  // Radiant Cyan 300
      { r: 14, g: 165, b: 233 },   // Vivid Deep Sky 500
      { r: 165, g: 243, b: 252 },  // Cyan Glow 200
      { r: 255, g: 255, b: 255 },  // Pure White Plasma
      { r: 96, g: 165, b: 250 },   // Cosmic Azure 400
      { r: 192, g: 132, b: 252 },  // Ultra Violet Spark (rare accent)
    ];

    const ambientColors = [
      'rgba(56, 189, 248, ',
      'rgba(125, 211, 252, ',
      'rgba(148, 163, 184, ',
      'rgba(241, 245, 249, ',
      'rgba(96, 165, 250, ',
    ];

    const isMobile = window.innerWidth < 768;
    const starCount = prefersReducedMotion ? 30 : isMobile ? 55 : 110;
    const stars: Star[] = [];
    const sparks: Spark[] = [];
    const shockwaves: Shockwave[] = [];

    // Pointer trail positions for smooth plasma filament
    const pointerTrail: { x: number; y: number; alpha: number }[] = [];

    // Initialize background stars
    for (let i = 0; i < starCount; i++) {
      const baseAlpha = Math.random() * 0.35 + 0.08;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 1.5 + 0.6,
        baseAlpha,
        alpha: baseAlpha,
        color: ambientColors[Math.floor(Math.random() * ambientColors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.008,
      });
    }

    const resize = () => {
      if (!bgCanvas || !sparkCanvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      bgCanvas.width = width * dpr;
      bgCanvas.height = height * dpr;
      bgCtx.setTransform(1, 0, 0, 1, 0, 0);
      bgCtx.scale(dpr, dpr);

      sparkCanvas.width = width * dpr;
      sparkCanvas.height = height * dpr;
      sparkCtx.setTransform(1, 0, 0, 1, 0, 0);
      sparkCtx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovered = true;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractiveEl = !!target.closest(
          'button, a, input, textarea, select, [role="button"], .cursor-pointer, .interactive-hover'
        );
        mouse.isInteractive = isInteractiveEl;
      }
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.isInteractive = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Helper: spawn a single glowing spark
    const spawnSpark = (
      originX: number,
      originY: number,
      speedMultiplier = 1,
      forceType?: 'diamond' | 'streak' | 'ember'
    ) => {
      if (sparks.length > (isMobile ? 120 : 260)) return;

      const chosen = sparkPalette[Math.floor(Math.random() * sparkPalette.length)];
      const angle = Math.random() * Math.PI * 2;
      const velocity = (Math.random() * 3.5 + 1.2) * speedMultiplier;

      const typeRandom = Math.random();
      const sparkType = forceType || (typeRandom < 0.35 ? 'diamond' : typeRandom < 0.75 ? 'streak' : 'ember');

      sparks.push({
        x: originX + (Math.random() - 0.5) * 6,
        y: originY + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * velocity + mouse.vx * 0.18,
        vy: Math.sin(angle) * velocity + mouse.vy * 0.18 - 0.3, // Slight buoyant lift
        size: sparkType === 'diamond' ? Math.random() * 4 + 3 : Math.random() * 2.8 + 1.2,
        r: chosen.r,
        g: chosen.g,
        b: chosen.b,
        alpha: Math.random() * 0.3 + 0.7,
        maxLife: Math.random() * 30 + 20,
        life: 0,
        decay: sparkType === 'streak' ? 0.94 : 0.96,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        type: sparkType,
        trailHistory: [{ x: originX, y: originY }],
      });
    };

    // Click burst: creates an explosion of glowing sparks + double radiant shockwaves
    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const burstCount = isMobile ? 24 : 42;

      for (let i = 0; i < burstCount; i++) {
        spawnSpark(e.clientX, e.clientY, 1.8);
      }

      // Inner intense shockwave
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 3,
        maxRadius: isMobile ? 55 : 90,
        alpha: 0.9,
        speed: 4.5,
        color: '56, 189, 248',
      });

      // Outer wide ethereal shockwave
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 2,
        maxRadius: isMobile ? 85 : 140,
        alpha: 0.6,
        speed: 3.2,
        color: '125, 211, 252',
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('click', onClick, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Draw diamond 4-pointed glint
    const drawDiamondGlint = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      r: number,
      g: number,
      b: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Outer radiant diamond glow
      const halfW = size * 0.28;
      const halfH = size;

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * 0.85).toFixed(3)})`;

      // Vertical diamond
      ctx.beginPath();
      ctx.moveTo(0, -halfH);
      ctx.lineTo(halfW, 0);
      ctx.lineTo(0, halfH);
      ctx.lineTo(-halfW, 0);
      ctx.closePath();
      ctx.fill();

      // Horizontal diamond
      ctx.beginPath();
      ctx.moveTo(-halfH, 0);
      ctx.lineTo(0, halfW);
      ctx.lineTo(halfH, 0);
      ctx.lineTo(0, -halfW);
      ctx.closePath();
      ctx.fill();

      // Bright white central hot-spot
      ctx.fillStyle = `rgba(255, 255, 255, ${(alpha * 0.95).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let frameCount = 0;

    const render = () => {
      frameCount++;

      // ==========================================
      // 1. FOREGROUND SPARK CANVAS (z-[9990])
      // ==========================================
      sparkCtx.clearRect(0, 0, width, height);

      // Process pointer velocity & emit sparks
      if (mouse.isHovered) {
        if (mouse.prevX !== -1000) {
          mouse.vx = mouse.x - mouse.prevX;
          mouse.vy = mouse.y - mouse.prevY;
          mouse.speed = Math.hypot(mouse.vx, mouse.vy);
        }
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;

        // Pointer trail ribbon history
        pointerTrail.unshift({ x: mouse.x, y: mouse.y, alpha: 0.8 });
        if (pointerTrail.length > 18) pointerTrail.pop();

        // Continuous luminous spark emission
        if (!prefersReducedMotion) {
          // Extra emission when hovering interactive items
          const baseCount = mouse.isInteractive ? 2 : 1;
          const motionMultiplier = mouse.speed > 1.5 ? Math.min(6, Math.floor(mouse.speed / 2.2)) : 0;
          const spawnCount = baseCount + motionMultiplier;

          // Emit active sparks
          for (let s = 0; s < spawnCount; s++) {
            // If interactive, occasionally emit diamond glints
            const forceType = mouse.isInteractive && Math.random() < 0.4 ? 'diamond' : undefined;
            spawnSpark(mouse.x, mouse.y, mouse.speed > 4 ? 1.4 : 1, forceType);
          }

          // Ambient idle twinkle around cursor even when stationary
          if (mouse.speed < 0.5 && frameCount % 6 === 0) {
            spawnSpark(mouse.x, mouse.y, 0.6, 'diamond');
          }
        }
      }

      // Draw Cursor Plasma Trail Ribbon (Smooth fading line with cyan glow)
      if (pointerTrail.length > 2) {
        sparkCtx.save();
        sparkCtx.lineCap = 'round';
        sparkCtx.lineJoin = 'round';

        // Outer glow path
        sparkCtx.beginPath();
        sparkCtx.moveTo(pointerTrail[0].x, pointerTrail[0].y);
        for (let i = 1; i < pointerTrail.length; i++) {
          const pt = pointerTrail[i];
          sparkCtx.lineTo(pt.x, pt.y);
          pt.alpha *= 0.85;
        }
        sparkCtx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        sparkCtx.lineWidth = mouse.isInteractive ? 4.5 : 3;
        sparkCtx.shadowColor = '#38bdf8';
        sparkCtx.shadowBlur = 14;
        sparkCtx.stroke();

        // Inner white-hot core path
        sparkCtx.beginPath();
        sparkCtx.moveTo(pointerTrail[0].x, pointerTrail[0].y);
        for (let i = 1; i < pointerTrail.length; i++) {
          sparkCtx.lineTo(pointerTrail[i].x, pointerTrail[i].y);
        }
        sparkCtx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        sparkCtx.lineWidth = 1.2;
        sparkCtx.shadowBlur = 0;
        sparkCtx.stroke();
        sparkCtx.restore();
      }

      // Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed;
        sw.alpha = (1 - sw.radius / sw.maxRadius) * 0.85;

        if (sw.radius >= sw.maxRadius || sw.alpha <= 0.02) {
          shockwaves.splice(i, 1);
          continue;
        }

        sparkCtx.save();
        sparkCtx.beginPath();
        sparkCtx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        sparkCtx.strokeStyle = `rgba(${sw.color}, ${sw.alpha.toFixed(3)})`;
        sparkCtx.lineWidth = 2.2;
        sparkCtx.shadowColor = `rgb(${sw.color})`;
        sparkCtx.shadowBlur = 16;
        sparkCtx.stroke();
        sparkCtx.restore();
      }

      // Draw Glowing Sparks using Additive Blending (Lighter = Blinding Neon Glow)
      sparkCtx.save();
      sparkCtx.globalCompositeOperation = 'lighter';

      for (let i = sparks.length - 1; i >= 0; i--) {
        const spark = sparks[i];
        spark.life += 1;
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= spark.decay;
        spark.vy *= spark.decay;
        spark.rotation += spark.rotationSpeed;

        // Trail history
        spark.trailHistory.push({ x: spark.x, y: spark.y });
        if (spark.trailHistory.length > 5) spark.trailHistory.shift();

        const progress = spark.life / spark.maxLife;
        const currentAlpha = (1 - progress) * spark.alpha;

        if (progress >= 1 || currentAlpha <= 0.01) {
          sparks.splice(i, 1);
          continue;
        }

        // 1. Motion streak
        if (spark.trailHistory.length > 1) {
          sparkCtx.beginPath();
          sparkCtx.moveTo(spark.trailHistory[0].x, spark.trailHistory[0].y);
          for (let t = 1; t < spark.trailHistory.length; t++) {
            sparkCtx.lineTo(spark.trailHistory[t].x, spark.trailHistory[t].y);
          }
          sparkCtx.strokeStyle = `rgba(${spark.r}, ${spark.g}, ${spark.b}, ${(currentAlpha * 0.6).toFixed(3)})`;
          sparkCtx.lineWidth = spark.size * 0.75;
          sparkCtx.stroke();
        }

        // 2. Diamond Star Glint vs Spherical Glow
        if (spark.type === 'diamond') {
          drawDiamondGlint(
            sparkCtx,
            spark.x,
            spark.y,
            spark.size,
            spark.rotation,
            spark.r,
            spark.g,
            spark.b,
            currentAlpha
          );
        } else {
          // Multi-layer Radial Glow Halo
          const glowRadius = spark.size * 3.8;
          const grad = sparkCtx.createRadialGradient(
            spark.x,
            spark.y,
            0,
            spark.x,
            spark.y,
            glowRadius
          );
          grad.addColorStop(0, `rgba(${spark.r}, ${spark.g}, ${spark.b}, ${(currentAlpha * 0.95).toFixed(3)})`);
          grad.addColorStop(0.3, `rgba(${spark.r}, ${spark.g}, ${spark.b}, ${(currentAlpha * 0.5).toFixed(3)})`);
          grad.addColorStop(0.7, `rgba(56, 189, 248, ${(currentAlpha * 0.2).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

          sparkCtx.fillStyle = grad;
          sparkCtx.beginPath();
          sparkCtx.arc(spark.x, spark.y, glowRadius, 0, Math.PI * 2);
          sparkCtx.fill();

          // Intense core center
          sparkCtx.fillStyle = `rgba(255, 255, 255, ${(currentAlpha * 0.95).toFixed(3)})`;
          sparkCtx.beginPath();
          sparkCtx.arc(spark.x, spark.y, spark.size * 0.65, 0, Math.PI * 2);
          sparkCtx.fill();
        }
      }

      sparkCtx.restore();

      // ==========================================
      // 2. BACKGROUND COSMIC CANVAS (z-0)
      // ==========================================
      bgCtx.clearRect(0, 0, width, height);

      const interactionRadius = isMobile ? 110 : 170;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
        let targetAlpha = star.baseAlpha + twinkle * 0.22;

        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0) star.x = width;
          else if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          else if (star.y > height) star.y = 0;
        }

        // Magnetic illumination near mouse
        if (mouse.isHovered && !prefersReducedMotion) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / interactionRadius;
            targetAlpha = Math.min(1, targetAlpha + factor * 0.7);

            // Gentle gravitational drift toward the cursor
            const angle = Math.atan2(dy, dx);
            const force = factor * (mouse.speed * 0.06 + 0.45);
            star.x += Math.cos(angle) * force;
            star.y += Math.sin(angle) * force;

            // Connect nearby stars with a fine cyan laser filament
            if (factor > 0.45) {
              bgCtx.beginPath();
              bgCtx.moveTo(star.x, star.y);
              bgCtx.lineTo(mouse.x, mouse.y);
              bgCtx.strokeStyle = `rgba(56, 189, 248, ${(factor * 0.22).toFixed(3)})`;
              bgCtx.lineWidth = 0.85;
              bgCtx.stroke();
            }
          }
        }

        star.alpha += (targetAlpha - star.alpha) * 0.12;

        // Draw star core
        bgCtx.fillStyle = `${star.color}${Math.max(0.05, Math.min(star.alpha, 0.98)).toFixed(3)})`;
        bgCtx.beginPath();
        bgCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        bgCtx.fill();

        // Outer glow halo if excited
        if (star.alpha > 0.42 && !isMobile) {
          bgCtx.fillStyle = `rgba(56, 189, 248, ${(star.alpha * 0.28).toFixed(3)})`;
          bgCtx.beginPath();
          bgCtx.arc(star.x, star.y, star.size * 3.4, 0, Math.PI * 2);
          bgCtx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Background ambient starfield & constellation filaments */}
      <canvas
        ref={bgCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Foreground vibrant glowing interactive sparks & click shockwaves */}
      <canvas
        ref={sparkCanvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none z-[9990]"
      />
    </>
  );
}
