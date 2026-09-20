import { useState } from 'react';
import { skillCategories } from '../../data/skills';
import { Sparkles, Terminal, Code, ShieldCheck, Cpu, Database } from 'lucide-react';

interface SkillsProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Skills({ onCursorChange }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            05 / TECHNICAL REPERTOIRE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Skills & Capabilities.
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-sm font-mono text-[#8e8d88]">
            Honest, verified technical proficiencies grounded in coursework, projects, and internships.
          </p>
          <p className="text-[11px] font-mono text-[#666560] mt-1">
            No synthetic 100% mastery bars — clear focus areas and applied contexts.
          </p>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory('all')}
          onMouseEnter={() => onCursorChange('interactive')}
          onMouseLeave={() => onCursorChange('default')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
            activeCategory === 'all'
              ? 'bg-[#f4f3ef] text-[#09090b] font-semibold'
              : 'bg-[#121217] text-[#8e8d88] hover:text-[#f4f3ef] border border-[#22222a]'
          }`}
        >
          All Domains ({skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)})
        </button>
        {skillCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
              activeCategory === cat.id
                ? 'bg-[#f4f3ef] text-[#09090b] font-semibold'
                : 'bg-[#121217] text-[#8e8d88] hover:text-[#f4f3ef] border border-[#22222a]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="p-6 rounded-xl bg-[#0f0f14] border border-[#1e1e28] hover:border-[#2f2f3d] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#1c1c24] pb-4 mb-4">
                <h3 className="font-display font-semibold text-lg text-[#f4f3ef]">
                  {cat.name}
                </h3>
                <span className="text-[11px] font-mono text-[#d4a373] bg-[#d4a373]/10 px-2 py-0.5 rounded border border-[#d4a373]/20">
                  {cat.skills.length} competencies
                </span>
              </div>

              <p className="text-xs text-[#8c8a82] leading-relaxed mb-6 font-light">
                {cat.description}
              </p>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-lg bg-[#14141b] border border-[#20202c] hover:border-[#2c2c3c] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#f4f3ef]">
                        {skill.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373]" />
                    </div>
                    {skill.focus && (
                      <p className="text-[11px] font-mono text-[#716f68] mt-1">
                        {skill.focus}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#181820] text-[10px] font-mono text-[#666560] flex items-center justify-between">
              <span>Domain: {cat.id}</span>
              <span>PAF-IAST & Practical Stack</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
