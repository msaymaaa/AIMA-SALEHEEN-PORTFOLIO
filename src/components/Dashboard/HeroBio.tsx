import { useState, useEffect } from 'react';
import { 
  Terminal, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Github, 
  Linkedin,
  Activity, 
  Cpu,
  Radio,
  FileText
} from 'lucide-react';
import { projects } from '../../data/projects';

interface HeroBioProps {
  onNavigateSection: (sectionId: string) => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function HeroBio({ onNavigateSection, onCursorChange }: HeroBioProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [currentTimePKT, setCurrentTimePKT] = useState('');

  const emailAddress = 'captaymaa@gmail.com';
  const phoneNumber = '0310-9867715';
  const githubUrl = 'https://github.com/msaymaaa';
  const linkedinUrl = 'https://www.linkedin.com/in/aima-s-806a543a9/';

  useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setCurrentTimePKT(`${time} PKT`);
      } catch {
        setCurrentTimePKT('UTC+5');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <section id="home" className="pt-24 sm:pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
      {/* Expansive Full-Width Widescreen Hero Showcase */}
      <div className="relative p-7 sm:p-10 md:p-12 lg:p-14 rounded-3xl glass-panel border border-white/10 overflow-hidden space-y-8">
        {/* Ambient subtle backdrops & optical glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mb-24" />

        {/* Top Eyebrow Tag & University Accreditation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>SOFTWARE ENGINEERING UNDERGRADUATE // PAF-IAST</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
            <span className="text-sky-300 font-semibold">PAF-IAST</span>
            <span>•</span>
            <span>CYBERSECURITY & UAV TECHNOLOGY</span>
          </div>
        </div>

        {/* Main Name Banner & Sub-headline */}
        <div className="space-y-3">
          <h1 className="font-space-grotesk font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-[-0.025em] leading-tight select-none">
            Aima Saleheen<span className="text-sky-400">.</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-mono text-slate-300 font-normal tracking-wide">
            Cybersecurity & UAV Systems <span className="text-sky-400">•</span> Software Development <span className="text-sky-400">•</span> Technical Strategy & BizDev
          </p>
        </div>

        {/* Expansive Bio Paragraph (Full-width balanced reading column) */}
        <div className="max-w-5xl text-slate-300 font-light leading-relaxed text-sm sm:text-base md:text-lg border-l-2 border-sky-400/50 pl-5 sm:pl-6 py-1 bg-white/[0.01] rounded-r-xl">
          <p>
            Software Engineering undergraduate at Pak-Austria Fachhochschule (PAF-IAST) with hands-on industry experience spanning cybersecurity, UAV technology, software development, and business development. Experienced in web application security assessment, penetration testing fundamentals, UAV communication and simulation, lead generation, client engagement, and technical documentation, with practical exposure to tools including Kali Linux, Burp Suite, SQLMap, DVWA, ArduPilot, Mission Planner, MAVLink, SITL, and C++. Brings a combination of technical curiosity, analytical problem-solving, professional communication, and adaptability, with a strong interest in transforming emerging technologies into practical, real-world solutions.
          </p>
        </div>

        {/* Full-Width Practical Exposure & Toolchains Bento Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-sky-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>// PRACTICAL EXPOSURE & TOOLCHAINS</span>
            </span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">6 Core Competency Domains</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">Kali Linux & Burp</div>
              <div className="text-[10px] font-mono text-slate-400">Security Assessment</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">SQLMap & DVWA</div>
              <div className="text-[10px] font-mono text-slate-400">Vulnerability Testing</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">ArduPilot & Planner</div>
              <div className="text-[10px] font-mono text-slate-400">Flight Telemetry</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">MAVLink & SITL</div>
              <div className="text-[10px] font-mono text-slate-400">Hardware Simulation</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">C++ & Web Systems</div>
              <div className="text-[10px] font-mono text-slate-400">Software Engineering</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors space-y-1">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
              <div className="font-mono text-xs text-white font-medium">BizDev & Strategy</div>
              <div className="text-[10px] font-mono text-slate-400">Client Engagement</div>
            </div>
          </div>
        </div>

        {/* Action & Contact Controls Bar (Clean Horizontal Flow) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateSection('projects')}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
            >
              <span>View Projects ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateSection('experience')}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Experience & Internships</span>
            </button>

            <button
              onClick={() => onNavigateSection('credentials')}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-4 py-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Credentials</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Email Copy */}
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
              title="Copy Email"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">{emailAddress}</span>
                  <span className="sm:hidden">Email</span>
                </>
              )}
            </button>

            {/* Quick Phone Copy */}
            <button
              onClick={handleCopyPhone}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all"
              title="Copy Phone Number"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">{phoneNumber}</span>
                  <span className="sm:hidden">Phone</span>
                </>
              )}
            </button>

            {/* GitHub Link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all"
              title="Open GitHub Profile"
            >
              <Github className="w-4 h-4 text-sky-400" />
            </a>

            {/* LinkedIn Link */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all"
              title="Open LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Dedicated Bottom Metadata & Status Bar (Balanced 3-Column Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Widget 1: Availability Status Badge (Properly placed at the bottom, no overlays) */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>AVAILABILITY STATUS</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase">
              ACTIVE
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="absolute w-4 h-4 rounded-full bg-emerald-400/40 animate-ping" />
              </div>
              <span className="text-emerald-300 font-mono text-xs sm:text-sm font-semibold">
                Open to remote opportunities & collaborations
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 pl-5">
              Available for engineering roles, research programs, & technical projects.
            </p>
          </div>
        </div>

        {/* Widget 2: Coordinates & Timezone Info */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>COORDINATES & TIMEZONE</span>
            </span>
            <span className="text-[10px] text-sky-400/80 px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20">
              LIVE GPS
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Location</span>
              <span className="font-mono text-xs sm:text-sm text-white font-medium block">
                Haripur, PK
              </span>
              <span className="text-[11px] font-mono text-sky-400 block">
                33.99° N, 72.93° E
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Local Time</span>
              <span className="font-mono text-xs sm:text-sm text-white font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{currentTimePKT || 'PKT'}</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 block">
                UTC+5 (Asia/Karachi)
              </span>
            </div>
          </div>
        </div>

        {/* Widget 3: Industry Appointments & Key Telemetry Counts */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>INDUSTRY & TELEMETRY</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 truncate">NRTC UAV Dept & Mechaline</span>
              <span className="text-sky-400 font-semibold shrink-0">2026 Intern</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-white/5">
              <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-base font-mono font-bold text-white block">7</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">Projects</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-base font-mono font-bold text-sky-400 block">2</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">Internships</span>
              </div>
              <div className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-base font-mono font-bold text-emerald-400 block">6</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase">Certs/Sims</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
