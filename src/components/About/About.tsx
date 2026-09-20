import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Code2, Rocket, ExternalLink } from 'lucide-react';

interface AboutProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export function About({ onCursorChange, onNavigateSection }: AboutProps) {
  const pillars = [
    {
      icon: Code2,
      title: 'Full-Stack Software Engineering',
      desc: 'Architecting scalable, typed systems using modern TypeScript, React, Next.js, and Supabase. Focused on clean architecture and testable code.'
    },
    {
      icon: Cpu,
      title: 'AI & Contextual Tooling',
      desc: 'Engineering smart workflows, integrating modern LLM APIs, and exploring intelligent systems that solve measurable real-world user bottlenecks.'
    },
    {
      icon: ShieldCheck,
      title: 'Cybersecurity Fundamentals',
      desc: 'Building with a defense-in-depth mindset, understanding secure software lifecycles, authentication integrity, and network protection practices.'
    },
    {
      icon: Rocket,
      title: 'Emerging & Autonomous Systems',
      desc: 'Hands-on exposure to avionics, telemetry, and embedded electronics from technical internship work with the NRTC UAV engineering division.'
    }
  ];

  return (
    <section id="about" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            01 / PHILOSOPHY & PROFILE
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Engineering with discipline.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Aima Saleheen — Undergraduate Software Engineer at Pak-Austria Fachhochschule (PAF-IAST)
        </p>
      </div>

      {/* Main Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
        {/* Left Column: Editorial Statement */}
        <div className="lg:col-span-7 space-y-6 text-[#c7c5bc] text-base sm:text-lg leading-relaxed font-light">
          <p>
            I am a <strong className="text-[#f4f3ef] font-medium">Software Engineering student</strong> at{' '}
            <span className="text-[#f4f3ef] font-medium">Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology (PAF-IAST)</span>.
            My work is centered around pragmatic problem-solving: taking complex requirements and turning them into clean, reliable, and well-designed digital products.
          </p>

          <p>
            Rather than confining myself to surface-level interfaces, I enjoy exploring the entire technology stack — from low-level algorithms in C++ and embedded UAV telemetry protocols, to modern typed web applications using React, TypeScript, and cloud-native databases.
          </p>

          <p>
            With an active interest in <span className="text-[#f4f3ef] font-medium">Artificial Intelligence</span> and <span className="text-[#f4f3ef] font-medium">Cybersecurity</span>, I continuously explore how intelligent automation and secure-by-default design principles can strengthen modern software ecosystems.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="px-3 py-1.5 rounded bg-[#15151c] border border-[#272732] text-[#d4a373]">
              Growth Mindset
            </span>
            <span className="px-3 py-1.5 rounded bg-[#15151c] border border-[#272732] text-[#a3a199]">
              Applied Engineering
            </span>
            <span className="px-3 py-1.5 rounded bg-[#15151c] border border-[#272732] text-[#a3a199]">
              Research & Rigor
            </span>
          </div>
        </div>

        {/* Right Column: Key Details & Profile Card */}
        <div className="lg:col-span-5 bg-[#101015] border border-[#202028] rounded-xl p-8 space-y-6">
          <h3 className="font-display font-semibold text-lg text-[#f4f3ef] border-b border-[#1c1c24] pb-4 flex items-center justify-between">
            <span>Profile Overview</span>
            <span className="text-xs font-mono text-[#d4a373]">VERIFIED</span>
          </h3>

          <dl className="divide-y divide-[#181820] text-sm">
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#716f68] font-mono text-xs uppercase">Institution</dt>
              <dd className="text-[#f4f3ef] font-medium text-right text-xs sm:text-sm">
                PAF-IAST (Austrian Collaboration)
              </dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#716f68] font-mono text-xs uppercase">Specialization</dt>
              <dd className="text-[#f4f3ef] font-medium text-right text-xs sm:text-sm">
                Software Engineering
              </dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#716f68] font-mono text-xs uppercase">Fellowship</dt>
              <dd className="text-[#d4a373] font-medium text-right text-xs sm:text-sm">
                Millennium Fellow (MCN & UNAI)
              </dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#716f68] font-mono text-xs uppercase">Internship</dt>
              <dd className="text-[#f4f3ef] font-medium text-right text-xs sm:text-sm">
                NRTC UAV Department
              </dd>
            </div>
            <div className="py-3 flex justify-between gap-4">
              <dt className="text-[#716f68] font-mono text-xs uppercase">Location</dt>
              <dd className="text-[#f4f3ef] font-medium text-right text-xs sm:text-sm">
                Pakistan (UTC+5)
              </dd>
            </div>
          </dl>

          <button
            onClick={() => onNavigateSection('experience')}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="w-full py-2.5 rounded-lg bg-[#181820] hover:bg-[#20202a] border border-[#282834] text-xs font-mono text-[#f4f3ef] flex items-center justify-center gap-2 transition-colors"
          >
            <span>View Complete Engineering Journey</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8e8d88]" />
          </button>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-[#0f0f13] border border-[#1e1e26] hover:border-[#2f2f3c] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#16161d] border border-[#262632] flex items-center justify-center text-[#d4a373] mb-5 group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-display font-semibold text-base text-[#f4f3ef] mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#8c8a82] leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
