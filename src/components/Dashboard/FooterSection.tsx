import { useState } from 'react';
import { 
  Terminal, 
  ArrowUp, 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  MapPin, 
  ShieldCheck,
  Heart
} from 'lucide-react';

interface FooterSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function FooterSection({ onNavigateSection, onCursorChange }: FooterSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const emailAddress = 'captaymaa@gmail.com';
  const phoneNumber = '0310-9867715';
  const githubUrl = 'https://github.com/msaymaaa';
  const linkedinUrl = 'https://www.linkedin.com/in/aima-s-806a543a9/';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#040407]/90 backdrop-blur-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12 relative z-10">
        {/* Top Contact Callout */}
        <div className="p-8 sm:p-12 rounded-2xl glass-panel relative overflow-hidden border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-wider">AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              Let&apos;s Build Resilient Systems Together<span className="text-sky-400">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Whether you need cybersecurity vulnerability assessments, UAV telemetry simulation, full-stack application development, or automated AI pipelines — reach out directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Email Button */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>{emailAddress}</span>
                </>
              )}
            </button>

            {/* Phone Button */}
            <button
              onClick={handleCopyPhone}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Phone Copied!</span>
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>{phoneNumber}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Middle Navigation & Info Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs font-mono">
          {/* Identity column */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
                AS
              </div>
              <span className="font-display font-black text-base text-white uppercase tracking-wider">
                Aima Saleheen
              </span>
            </div>
            <p className="text-slate-400 text-xs font-sans font-light leading-relaxed max-w-sm">
              Software Engineering undergraduate at Pak-Austria Fachhochschule (PAF-IAST) with industry experience in cybersecurity, UAV avionics, software engineering, and business development.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Haripur, Pakistan (33.99° N, 72.93° E)</span>
              </span>
            </div>
          </div>

          {/* Quick Section Links */}
          <div className="space-y-2">
            <span className="text-sky-400 uppercase tracking-wider block font-semibold">
              NAVIGATION
            </span>
            <ul className="space-y-1.5 text-slate-400">
              {['home', 'projects', 'credentials', 'craft', 'experience', 'iris', 'stream'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => onNavigateSection(sec)}
                    onMouseEnter={() => onCursorChange('interactive')}
                    onMouseLeave={() => onCursorChange('default')}
                    className="hover:text-white capitalize transition-colors"
                  >
                    // {sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links & Channels */}
          <div className="space-y-2">
            <span className="text-sky-400 uppercase tracking-wider block font-semibold">
              CHANNELS
            </span>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onCursorChange('interactive')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <Github className="w-4 h-4 text-sky-400" />
                  <span>github.com/msaymaaa</span>
                </a>
              </li>
              <li>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => onCursorChange('interactive')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>linkedin.com/in/aima-s-806a543a9</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${emailAddress}`}
                  onMouseEnter={() => onCursorChange('interactive')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>captaymaa@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phoneNumber}`}
                  onMouseEnter={() => onCursorChange('interactive')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>+92 {phoneNumber}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AIMA SALEHEEN. All rights reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
