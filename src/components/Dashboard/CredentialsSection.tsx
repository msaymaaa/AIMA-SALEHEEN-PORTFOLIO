import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Building, 
  BookOpen, 
  ShieldCheck, 
  FileCheck2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { education } from '../../data/education';
import { credentials } from '../../data/credentials';

interface CredentialsSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function CredentialsSection({ onCursorChange }: CredentialsSectionProps) {
  return (
    <section id="credentials" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <GraduationCap className="w-4 h-4" />
            <span className="tracking-widest uppercase">02 // PEDAGOGY & VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Credentials & Education<span className="text-sky-400">.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          Academic foundation at Pak-Austria Fachhochschule paired with verified certifications and enterprise credentials from Leverify, NRTC, Mechaline, PwC, and Deloitte.
        </p>
      </div>

      {/* Education Featured Card */}
      <div
        onMouseEnter={() => onCursorChange('interactive')}
        onMouseLeave={() => onCursorChange('default')}
        className="p-8 sm:p-10 rounded-2xl glass-panel glass-panel-hover relative overflow-hidden space-y-6 border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="uppercase font-semibold tracking-wider">UNDERGRADUATE DEGREE // DUAL-PEDAGOGY</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              {education.institution}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {education.subtitle} • {education.location}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300">
              <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
              {education.duration}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Degree Program</span>
              <h4 className="font-display font-bold text-xl text-white">
                {education.degree} ({education.field})
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {education.overview}
            </p>
          </div>

          <div className="lg:col-span-5 p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block font-semibold">
              // ACADEMIC FOCUS & CURRICULUM
            </span>
            <div className="space-y-2">
              {education.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Job Simulations Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-sky-400" />
            <span>Certifications & Enterprise Simulations</span>
          </h3>
          <span className="text-xs font-mono text-sky-400">
            {credentials.length} VERIFIED CREDENTIALS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((cred) => {
            const isSpecialCredential = cred.id === 'leverify-quest-ai';
            return (
              <div
                key={cred.id}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className={`p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-5 relative ${
                  isSpecialCredential
                    ? 'border-sky-400/30 bg-gradient-to-br from-sky-950/20 via-white/[0.02] to-transparent shadow-[0_0_30px_rgba(56,189,248,0.06)]'
                    : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-medium">
                      {cred.type}
                    </span>
                    <span className="text-slate-400">{cred.year}</span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {cred.title}
                    </h4>
                    {cred.subtitle ? (
                      <span className="text-xs font-mono text-sky-400 font-medium block mt-1">
                        {cred.subtitle}
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-sky-400/90 font-medium block mt-0.5">
                        {cred.issuer}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {cred.description}
                  </p>

                  {/* Detailed Highlights / What I Explored */}
                  {cred.highlights && cred.highlights.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 pt-2.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-medium">
                        {isSpecialCredential ? 'What I Explored:' : 'Key Competencies & Milestones:'}
                      </span>
                      <div className="space-y-1.5">
                        {cred.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Learning Callout if present */}
                  {cred.keyLearning && (
                    <div className="p-3.5 rounded-xl bg-sky-500/[0.05] border border-sky-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>Key Learning:</span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-300 font-light leading-relaxed">
                        {cred.keyLearning}
                      </p>
                    </div>
                  )}

                  {/* Focus Tags if present */}
                  {cred.tags && cred.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cred.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-sky-400/[0.08] border border-sky-400/20 text-sky-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{cred.status}</span>
                  </span>
                  {cred.verificationNote && (
                    <span className="text-[10px] text-slate-400 truncate max-w-[200px]" title={cred.verificationNote}>
                      {cred.verificationNote}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
