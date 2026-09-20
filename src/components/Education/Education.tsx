import { GraduationCap, Award, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { education } from '../../data/education';

interface EducationProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Education({ onCursorChange }: EducationProps) {
  return (
    <section id="education" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            04 / ACADEMIC FOUNDATION
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Education & Pedagogy.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Applied Austrian Fachhochschule model combining engineering science with project rigor.
        </p>
      </div>

      {/* Main Educational Card */}
      <div
        onMouseEnter={() => onCursorChange('interactive')}
        onMouseLeave={() => onCursorChange('default')}
        className="p-8 sm:p-12 rounded-2xl bg-[#0f0f14] border border-[#20202a] relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-8 border-b border-[#1d1d26] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#262634] text-xs font-mono text-[#d4a373]">
              <GraduationCap className="w-4 h-4" />
              <span>BACHELOR OF SCIENCE DEGREE</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#f4f3ef] leading-tight">
              {education.institution}
            </h3>

            <p className="text-sm font-mono text-[#9e9c93]">
              {education.field} • {education.degree}
            </p>

            <p className="text-sm text-[#716f68] font-light">
              {education.subtitle} — {education.location}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start lg:items-end gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#16161f] border border-[#272736] text-[#f4f3ef]">
              {education.duration}
            </span>
            <span className="text-[#8e8d88]">Rigorous Engineering Track</span>
          </div>
        </div>

        {/* Narrative & Focus Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-[#c7c5bc] font-light leading-relaxed">
            <p>
              {education.overview}
            </p>
            <div className="p-4 rounded-xl bg-[#14141b] border border-[#22222e] text-xs text-[#a3a199] font-mono leading-relaxed">
              Curriculum integrates computer architecture, formal software engineering design patterns, object-oriented systems (C++), and applied software laboratories.
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono text-[#716f68] uppercase tracking-wider block">
              Key Academic Highlights
            </span>
            {education.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-[#14141b] border border-[#1e1e28]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#d4d2cb] font-light leading-relaxed">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
