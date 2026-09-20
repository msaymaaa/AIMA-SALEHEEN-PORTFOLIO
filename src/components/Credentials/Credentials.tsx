import { Award, ExternalLink, ShieldCheck, CheckCircle } from 'lucide-react';
import { credentials } from '../../data/credentials';

interface CredentialsProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Credentials({ onCursorChange }: CredentialsProps) {
  return (
    <section id="credentials" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            06 / RECOGNITION & HONORS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Credentials & Achievements.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Legitimate fellowships, defense industrial engineering credentials, and academic honors.
        </p>
      </div>

      {/* Credentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {credentials.map((cred, idx) => (
          <div
            key={cred.id}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="p-8 rounded-xl bg-[#0f0f14] border border-[#1e1e28] hover:border-[#30303e] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#d4a373]">
                  0{idx + 1} //
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#181822] border border-[#282836] text-[#c2c0b6] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                  {cred.status}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#f4f3ef] mb-2 leading-snug">
                {cred.title}
              </h3>

              <p className="text-xs font-mono text-[#9e9c93] mb-4">
                {cred.issuer} • {cred.year}
              </p>

              <p className="text-sm text-[#c7c5bc] leading-relaxed font-light mb-6">
                {cred.description}
              </p>

              {cred.verificationNote && (
                <div className="p-3 rounded-lg bg-[#14141b] border border-[#1e1e28] text-xs font-mono text-[#8e8d88]">
                  {cred.verificationNote}
                </div>
              )}
            </div>

            {cred.link ? (
              <a
                href={cred.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 pt-4 border-t border-[#1c1c24] flex items-center justify-between text-xs font-mono text-[#d4a373] hover:text-[#f4f3ef] transition-colors"
              >
                <span>Program Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <div className="mt-6 pt-4 border-t border-[#1c1c24] flex items-center justify-between text-[11px] font-mono text-[#666560]">
                <span>Verified Academic / Institutional Record</span>
                <CheckCircle className="w-3 h-3 text-[#22c55e]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
