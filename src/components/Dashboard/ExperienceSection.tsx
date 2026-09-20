import { Briefcase, CheckCircle2, ShieldAlert, TrendingUp, Calendar, MapPin, Building2 } from 'lucide-react';
import { experiences } from '../../data/experience';

interface ExperienceSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function ExperienceSection({ onCursorChange }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="tracking-widest uppercase">04 // INDUSTRY EXPERIENCE & WORK HISTORY</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Work Experience<span className="text-sky-400">.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          Hands-on technical experience spanning Applied AI Development, Cybersecurity, UAV avionics telemetry, and commercial Business Development.
        </p>
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8">
        {experiences.map((exp, index) => {
          const isNRTC = exp.id === 'nrtc-cyber-uav';
          const isLeverify = exp.id === 'leverify-quest-exp';
          return (
            <div
              key={exp.id}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-6 sm:p-10 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden space-y-6 border border-white/10"
            >
              {/* Top ambient glow accent */}
              <div
                className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 ${
                  isNRTC ? 'bg-sky-500/10' : isLeverify ? 'bg-cyan-500/15' : 'bg-indigo-500/10'
                }`}
              />

              {/* Card Header Meta */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span className="uppercase font-semibold tracking-wider">
                      ROLE {index + 1 < 10 ? `0${index + 1}` : index + 1} // {exp.type}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      {exp.organization}
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">{exp.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-300">
                    <Calendar className="w-3.5 h-3.5 inline mr-1.5 text-sky-400" />
                    {exp.duration}
                  </span>
                </div>
              </div>

              {/* Summary overview */}
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {exp.summary}
              </p>

              {/* Structured Key Responsibilities List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block font-semibold">
                  // CORE DELIVERABLES & TECHNICAL SCOPE:
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {exp.keyResponsibilities.map((resp, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed hover:border-sky-500/20 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech & Tool Tags */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                  Technologies & Applied Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
