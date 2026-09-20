import { Briefcase, Building2, MapPin, CheckCircle2 } from 'lucide-react';
import { experiences } from '../../data/experience';

interface ExperienceProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Experience({ onCursorChange }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            03 / EXPERIENCE & INDUSTRY
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Work & Practical Engagements.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Structured engineering internships, technical responsibilities, and team contributions grounded in authentic records.
        </p>
      </div>

      {/* Experience Timeline Cards */}
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div
            key={exp.id}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="p-6 sm:p-8 rounded-xl bg-[#0f0f14] border border-[#1f1f28] hover:border-[#30303e] transition-all"
          >
            {/* Top Row: Role, Organization, Type, Duration */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1c1c24] pb-6 mb-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="text-xs font-mono text-[#d4a373]">
                    0{idx + 1} //
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#181822] border border-[#272736] text-[#c2c0b6]">
                    {exp.type}
                  </span>
                  {exp.department && (
                    <span className="text-xs font-mono text-[#8e8d88]">
                      {exp.department}
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f3ef]">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-[#a3a199]">
                  <span className="flex items-center gap-1.5 font-medium text-[#f4f3ef]">
                    <Building2 className="w-4 h-4 text-[#d4a373]" />
                    {exp.organization}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-[#716f68]">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-[#8e8d88] lg:text-right shrink-0">
                <span className="px-3 py-1 rounded bg-[#16161d] border border-[#242430] text-[#d4a373]">
                  {exp.duration}
                </span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base text-[#c7c5bc] leading-relaxed font-light mb-6">
              {exp.summary}
            </p>

            {/* Key Responsibilities */}
            <div className="space-y-2.5 mb-6">
              <span className="text-xs font-mono text-[#716f68] uppercase tracking-wider block">
                Key Engagements & Deliverables
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {exp.keyResponsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#14141a] border border-[#1e1e28]">
                    <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#d0cecb] font-light leading-snug">
                      {resp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs font-mono text-[#716f68] mr-2">Tools & Domains:</span>
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#171720] border border-[#272734] text-[#a8a69e]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
