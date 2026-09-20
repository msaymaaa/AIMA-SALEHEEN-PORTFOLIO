import { useEffect, useRef, useState } from 'react';
import { RotateCw, Sparkles, Eye, Info } from 'lucide-react';

interface TechNode {
  name: string;
  category: string;
  theta: number; // inclination [0, PI]
  phi: number;   // azimuth [0, 2PI]
  radius: number;
  color: string;
}

export function TechSphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{ name: string; category: string } | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = Math.min(520, Math.max(380, container.clientWidth * 0.7)));

    // Sphere 3D rotation angles
    let rotationX = 0.25;
    let rotationY = 0;
    let targetRotationX = 0.25;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let autoRotateSpeed = 0.005;

    // Tech node dataset spanning Aima's actual domains
    const rawSkills: Array<{ name: string; category: string; color: string }> = [
      { name: 'C++', category: 'Languages & Systems', color: '#38bdf8' },
      { name: 'Kali Linux', category: 'Cybersecurity', color: '#f43f5e' },
      { name: 'Burp Suite', category: 'Cybersecurity', color: '#fb923c' },
      { name: 'SQLMap', category: 'Cybersecurity', color: '#ef4444' },
      { name: 'DVWA', category: 'Cybersecurity', color: '#f87171' },
      { name: 'ArduPilot', category: 'UAV & Avionics', color: '#38bdf8' },
      { name: 'Mission Planner', category: 'UAV & Avionics', color: '#0ea5e9' },
      { name: 'MAVLink', category: 'UAV & Avionics', color: '#60a5fa' },
      { name: 'SITL Simulation', category: 'UAV & Avionics', color: '#818cf8' },
      { name: 'UDP Telemetry', category: 'UAV & Avionics', color: '#38bdf8' },
      { name: 'TypeScript', category: 'Web & Applications', color: '#38bdf8' },
      { name: 'React', category: 'Web & Applications', color: '#61dafb' },
      { name: 'Next.js', category: 'Web & Applications', color: '#ffffff' },
      { name: 'Tailwind CSS', category: 'Web & Applications', color: '#38bdf8' },
      { name: 'Supabase', category: 'Backend & Cloud', color: '#3ecf8e' },
      { name: 'PostgreSQL', category: 'Backend & Cloud', color: '#336791' },
      { name: 'n8n', category: 'Automation Pipelines', color: '#ff6d5a' },
      { name: 'Make.com', category: 'Automation Pipelines', color: '#9333ea' },
      { name: 'Gemini API', category: 'AI Engineering', color: '#38bdf8' },
      { name: 'OpenAI API', category: 'AI Engineering', color: '#10a37f' },
      { name: 'Google AI Studio', category: 'AI Engineering', color: '#60a5fa' },
      { name: 'Kotlin', category: 'Mobile Engineering', color: '#a855f7' },
      { name: 'Android Studio', category: 'Mobile Engineering', color: '#22c55e' },
      { name: 'Docker', category: 'Cloud Infrastructure', color: '#0ea5e9' },
      { name: 'Git & GitHub', category: 'Tools & DevOps', color: '#f97316' },
      { name: 'Lead Generation', category: 'Business Dev', color: '#eab308' },
      { name: 'RTK GPS', category: 'UAV & Systems', color: '#38bdf8' },
    ];

    const sphereRadius = Math.min(width, height) * 0.38;
    const nodes: TechNode[] = rawSkills.map((s, i) => {
      // Golden spiral distribution on sphere surface
      const phi = Math.acos(-1 + (2 * i) / rawSkills.length);
      const theta = Math.sqrt(rawSkills.length * Math.PI) * phi;
      return {
        name: s.name,
        category: s.category,
        theta,
        phi,
        radius: sphereRadius,
        color: s.color,
      };
    });

    // Wireframe grid points
    interface GridPoint {
      x: number;
      y: number;
      z: number;
    }
    const gridPoints: GridPoint[] = [];
    const latLines = 8;
    const lonLines = 14;

    for (let lat = 1; lat < latLines; lat++) {
      const theta = (lat * Math.PI) / latLines;
      const r = sphereRadius * Math.sin(theta);
      const y = sphereRadius * Math.cos(theta);
      for (let lon = 0; lon < 32; lon++) {
        const phi = (lon * 2 * Math.PI) / 32;
        gridPoints.push({
          x: r * Math.cos(phi),
          y,
          z: r * Math.sin(phi),
        });
      }
    }

    const resize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = Math.min(520, Math.max(380, container.clientWidth * 0.7));
    };

    window.addEventListener('resize', resize);

    // Mouse drag interaction
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Check hover over nodes
        const rect = canvas.getBoundingClientRect();
        const mouseCanvasX = e.clientX - rect.left - width / 2;
        const mouseCanvasY = e.clientY - rect.top - height / 2;

        let found: { name: string; category: string } | null = null;
        for (const node of nodes) {
          // Calculate rotated 3D coordinates
          const x0 = node.radius * Math.sin(node.phi) * Math.cos(node.theta);
          const y0 = node.radius * Math.cos(node.phi);
          const z0 = node.radius * Math.sin(node.phi) * Math.sin(node.theta);

          // Rotate around X
          const y1 = y0 * Math.cos(rotationX) - z0 * Math.sin(rotationX);
          const z1 = y0 * Math.sin(rotationX) + z0 * Math.cos(rotationX);

          // Rotate around Y
          const x2 = x0 * Math.cos(rotationY) + z1 * Math.sin(rotationY);
          const z2 = -x0 * Math.sin(rotationY) + z1 * Math.cos(rotationY);

          if (z2 > -50) {
            const fov = 450;
            const scale = fov / (fov + z2);
            const projX = x2 * scale;
            const projY = y1 * scale;

            const dist = Math.hypot(projX - mouseCanvasX, projY - mouseCanvasY);
            if (dist < 20) {
              found = { name: node.name, category: node.category };
              break;
            }
          }
        }
        setHoveredNode(found);
        return;
      }

      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.006;
      targetRotationX += deltaY * 0.006;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;
        targetRotationY += deltaX * 0.005;
        targetRotationX += deltaY * 0.005;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate rotation
      if (isRotating && !isDragging) {
        targetRotationY += autoRotateSpeed;
      }
      rotationX += (targetRotationX - rotationX) * 0.08;
      rotationY += (targetRotationY - rotationY) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 420;

      // Draw central orbital rings / equator
      ctx.save();
      ctx.translate(centerX, centerY);

      // Central core faint glow
      const coreGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, sphereRadius * 0.9);
      coreGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      coreGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.03)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sphereRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Render wireframe grid dust points
      for (let i = 0; i < gridPoints.length; i += 2) {
        const pt = gridPoints[i];
        // Rotate around X
        const y1 = pt.y * Math.cos(rotationX) - pt.z * Math.sin(rotationX);
        const z1 = pt.y * Math.sin(rotationX) + pt.z * Math.cos(rotationX);
        // Rotate around Y
        const x2 = pt.x * Math.cos(rotationY) + z1 * Math.sin(rotationY);
        const z2 = -pt.x * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        const scale = fov / (fov + z2);
        const projX = x2 * scale;
        const projY = y1 * scale;
        const alpha = Math.max(0.04, (z2 + sphereRadius) / (2 * sphereRadius) * 0.25);

        ctx.fillStyle = `rgba(56, 189, 248, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(projX, projY, 0.8 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sort nodes by depth (z) to render back to front
      interface ProjectedNode {
        name: string;
        category: string;
        color: string;
        x: number;
        y: number;
        z: number;
        scale: number;
        alpha: number;
      }

      const projected: ProjectedNode[] = [];

      for (const node of nodes) {
        const x0 = node.radius * Math.sin(node.phi) * Math.cos(node.theta);
        const y0 = node.radius * Math.cos(node.phi);
        const z0 = node.radius * Math.sin(node.phi) * Math.sin(node.theta);

        // Rotate around X
        const y1 = y0 * Math.cos(rotationX) - z0 * Math.sin(rotationX);
        const z1 = y0 * Math.sin(rotationX) + z0 * Math.cos(rotationX);

        // Rotate around Y
        const x2 = x0 * Math.cos(rotationY) + z1 * Math.sin(rotationY);
        const z2 = -x0 * Math.sin(rotationY) + z1 * Math.cos(rotationY);

        const scale = fov / (fov + z2);
        const projX = x2 * scale;
        const projY = y1 * scale;
        const alpha = Math.max(0.15, Math.min(1, (z2 + sphereRadius * 0.8) / (sphereRadius * 1.6)));

        projected.push({
          name: node.name,
          category: node.category,
          color: node.color,
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
        });
      }

      projected.sort((a, b) => a.z - b.z);

      // Draw connecting filaments between nearby nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 75 && a.z > -80 && b.z > -80) {
            const lineAlpha = (1 - dist / 75) * 0.12 * Math.min(a.alpha, b.alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of projected) {
        const isHovered = hoveredNode?.name === p.name;
        const isFront = p.z > 0;

        // Node circle glow
        const nodeRadius = (isHovered ? 6.5 : 4) * p.scale;

        if (isFront || isHovered) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${(p.alpha * 0.25).toFixed(3)})`;
          ctx.fill();
        }

        // Node center
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#ffffff' : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isHovered ? 18 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node Label (rendered when in front or hovered)
        if (p.z > -20 || isHovered) {
          ctx.font = `${isHovered ? 'bold ' : ''}${Math.round(11 * p.scale)}px "JetBrains Mono", monospace`;
          ctx.fillStyle = isHovered
            ? '#ffffff'
            : isFront
            ? `rgba(241, 245, 249, ${p.alpha.toFixed(3)})`
            : `rgba(148, 163, 184, ${(p.alpha * 0.7).toFixed(3)})`;
          ctx.textAlign = 'center';
          ctx.fillText(p.name, p.x, p.y - nodeRadius - 4);
        }
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [isRotating, hoveredNode]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl glass-panel p-6 sm:p-8 overflow-hidden border border-sky-500/20 shadow-[0_0_50px_rgba(56,189,248,0.12)] space-y-4"
    >
      {/* Top telemetry & control bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-400 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-sky-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="font-semibold uppercase tracking-wider">
            3D INTERACTIVE TECH SPHERE // ORBITAL GRAPH
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
            <span>{isRotating ? 'Pause Orbit' : 'Resume Orbit'}</span>
          </button>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            DRAG TO ROTATE 3D
          </span>
        </div>
      </div>

      {/* 3D Canvas Canvas Stage */}
      <div className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block w-full max-w-2xl mx-auto" />

        {/* Hover HUD Badge */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-[#090a14]/90 border border-sky-500/40 text-xs font-mono shadow-[0_0_20px_rgba(56,189,248,0.3)] backdrop-blur-md flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span className="text-white font-bold">{hoveredNode.name}</span>
            <span className="text-slate-500">//</span>
            <span className="text-sky-300">{hoveredNode.category}</span>
          </div>
        )}
      </div>

      {/* Quick guide ticker */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
        <span>Hover nodes to inspect verified stack domains</span>
        <span>27 Orbital Technology Nodes</span>
      </div>
    </div>
  );
}
