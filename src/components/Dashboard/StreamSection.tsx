import { 
  Radio, 
  GitCommit, 
  Headphones, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  ShieldAlert,
  Plane
} from 'lucide-react';

interface StreamSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function StreamSection({ onCursorChange }: StreamSectionProps) {
  const activities = [
    {
      type: 'commit',
      title: 'highway-havoc: Frame-rate independent physics loop',
      detail: 'Optimized requestAnimationFrame delta timing and high-speed collision bounds for multi-lane traffic.',
      time: 'RECENT COMMIT',
      icon: GitCommit,
      status: 'pushed to main',
    },
    {
      type: 'security',
      title: 'DVWA & Burp Suite: Web Application Vulnerability Lab',
      detail: 'Simulated SQLMap injection vectors and session token inspection within isolated VirtualBox sandbox.',
      time: 'SECURITY LAB',
      icon: ShieldAlert,
      status: 'verified findings',
    },
    {
      type: 'uav',
      title: 'ArduPilot & MAVLink: UAV SITL Telemetry Simulation',
      detail: 'Simulated UDP telemetry packets, waypoint transitions, and failsafe triggers in Mission Planner.',
      time: 'AVIONICS FOCUS',
      icon: Plane,
      status: 'completed runs',
    },
    {
      type: 'automation',
      title: 'n8n & Google Workspace: Calendar Pipeline Sync',
      detail: 'Deployed webhook listener with dynamic slot collision checks to eliminate double-booking.',
      time: 'INTEGRATION',
      icon: Sparkles,
      status: 'active pipeline',
    },
  ];

  return (
    <section id="stream" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="tracking-widest uppercase text-emerald-400">06 // LIVE ACTIVITY STREAM</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Engineering Stream<span className="text-sky-400">.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          Telemetry feed tracking active code commits, cybersecurity laboratory drills, and automated pipeline updates.
        </p>
      </div>

      {/* Stream Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activities.map((act, i) => {
          const Icon = act.icon;
          return (
            <div
              key={i}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] uppercase">
                    {act.time}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {act.status}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">
                      {act.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300 font-light leading-relaxed">
                      {act.detail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>EVENT ID #{20260 + i * 14}</span>
                <span className="text-slate-400">VERIFIED LOG</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
