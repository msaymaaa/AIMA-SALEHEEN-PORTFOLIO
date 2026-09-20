import { 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Workflow,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { skillCategories } from '../../data/skills';
import { TechSphereCanvas } from '../Craft/TechSphereCanvas';

interface CraftSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function CraftSection({ onCursorChange }: CraftSectionProps) {
  const philosophies = [
    {
      title: 'Deterministic State & Objective Logic',
      description: 'Systems should be designed with explicit transitions and minimal mutable state. I favor strict type systems, immutability, and state-machine driven flows that eliminate undefined behavioral branches.',
      icon: Workflow,
    },
    {
      title: 'Mathematical Simplicity Over Accidental Complexity',
      description: 'The best architecture is not the one with the most abstraction layers, but the one with the fewest unneeded moving parts. High cohesion, low coupling, and clear boundaries lead to resilient systems.',
      icon: Cpu,
    },
    {
      title: 'Performance & Low-Latency Craft',
      description: 'Performance is a core UX tenet, not an afterthought. From sub-millisecond API response budgets to optimized rendering cycles and telemetry streaming, craftsmanship lives in the milliseconds.',
      icon: Layers,
    },
  ];

  return (
    <section id="craft" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <Code2 className="w-4 h-4" />
            <span className="tracking-widest uppercase">03 // ENGINEERING CRAFT & EXPERTISE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Craft & Technical Stack<span className="text-sky-400">.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          Interactive 3D particle sphere and deep domain breakdown across Cybersecurity, UAV telemetry, Full-Stack engineering, and AI automation.
        </p>
      </div>

      {/* 3D Interactive Tech Sphere Component */}
      <TechSphereCanvas />

      {/* Philosophy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {philosophies.map((phil, i) => {
          const Icon = phil.icon;
          return (
            <div
              key={i}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover space-y-4 relative"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                {phil.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {phil.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Structured Technical Domain Matrix */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            <span>Comprehensive Domain Breakdown</span>
          </h3>
          <span className="text-xs font-mono text-sky-400">
            {skillCategories.length} SPECIALIZED DOMAINS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover space-y-4 relative"
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-3">
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                  {cat.skills.length} Items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-colors flex flex-col justify-between space-y-1"
                  >
                    <span className="text-xs font-mono font-medium text-slate-200">
                      {skill.name}
                    </span>
                    {skill.focus && (
                      <span className="text-[10px] text-slate-500 leading-tight">
                        {skill.focus}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
