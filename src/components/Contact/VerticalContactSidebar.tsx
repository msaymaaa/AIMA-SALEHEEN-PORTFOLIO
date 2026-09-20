import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  FileText, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface VerticalContactSidebarProps {
  onResumeClick: () => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function VerticalContactSidebar({
  onResumeClick,
  onCursorChange,
}: VerticalContactSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const linkedinUrl = 'https://www.linkedin.com/in/aima-s-806a543a9/';
  const githubUrl = 'https://github.com/msaymaaa';
  const emailAddress = 'captaymaa@gmail.com';
  const phoneNumber = '0310-9867715';

  const isExpanded = isHovered || isLockedOpen;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <aside
      aria-label="Contact and Social Links"
      onMouseEnter={() => {
        setIsHovered(true);
        onCursorChange('interactive');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onCursorChange('default');
      }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 select-none"
    >
      <div className="relative flex items-center">
        {/* Collapsed Pill Button (Visible when not expanded) */}
        {!isExpanded && (
          <button
            onClick={() => setIsLockedOpen(true)}
            aria-label="Expand contact sidebar"
            className="group flex flex-col items-center justify-center gap-3 py-4 px-2 rounded-r-xl bg-[#090a12]/90 hover:bg-[#0f111d]/95 backdrop-blur-xl border-y border-r border-sky-500/30 hover:border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300"
          >
            {/* Glowing active indicator */}
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />

            {/* Vertical text "CONTACT" */}
            <span 
              className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-300 group-hover:text-sky-300 uppercase [writing-mode:vertical-rl] rotate-180 transition-colors"
            >
              CONTACT
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-sky-400/70 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all" />
          </button>
        )}

        {/* Expanded Glassmorphic Vertical Pill Bar */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="ml-2 sm:ml-4 py-3 px-2 rounded-2xl glass-panel border border-sky-500/40 shadow-[0_0_35px_rgba(56,189,248,0.25)] flex flex-col items-center gap-2 relative bg-[#090a14]/95 backdrop-blur-2xl"
            >
              {/* Header Label */}
              <div className="pb-1.5 border-b border-white/10 w-full text-center">
                <span className="text-[9px] font-mono tracking-widest text-sky-400 font-bold block uppercase">
                  DIRECT
                </span>
              </div>

              {/* 1. LinkedIn */}
              <div className="relative group/item">
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aima Saleheen LinkedIn profile"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-white/[0.03] hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/40 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                </a>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/item:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080f] border border-sky-500/30 text-[11px] font-mono text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 text-sky-400" />
                </div>
              </div>

              {/* 2. GitHub */}
              <div className="relative group/item">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Aima Saleheen GitHub profile"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-white/[0.03] hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/40 transition-all"
                >
                  <Github className="w-4 h-4 text-sky-400" />
                </a>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/item:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07080f] border border-sky-500/30 text-[11px] font-mono text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  <span>GitHub: msaymaaa</span>
                  <ExternalLink className="w-3 h-3 text-sky-400" />
                </div>
              </div>

              {/* 3. Email (Click to copy / mailto) */}
              <div className="relative group/item">
                <button
                  onClick={() => handleCopy(emailAddress, 'email')}
                  aria-label="Copy Email address"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-white/[0.03] hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/40 transition-all"
                >
                  {copiedType === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Mail className="w-4 h-4 text-sky-400" />
                  )}
                </button>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/item:flex flex-col gap-0.5 px-3 py-1.5 rounded-lg bg-[#07080f] border border-sky-500/30 text-[11px] font-mono text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-sky-300 font-semibold">
                    <span>{copiedType === 'email' ? 'Copied Email!' : 'Email (Click to copy)'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{emailAddress}</span>
                </div>
              </div>

              {/* 4. Phone (Click to copy / tel) */}
              <div className="relative group/item">
                <button
                  onClick={() => handleCopy(phoneNumber, 'phone')}
                  aria-label="Copy Phone number"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white bg-white/[0.03] hover:bg-sky-500/20 border border-white/5 hover:border-sky-500/40 transition-all"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Phone className="w-4 h-4 text-sky-400" />
                  )}
                </button>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/item:flex flex-col gap-0.5 px-3 py-1.5 rounded-lg bg-[#07080f] border border-sky-500/30 text-[11px] font-mono text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-sky-300 font-semibold">
                    <span>{copiedType === 'phone' ? 'Copied Phone!' : 'Phone: 0310-9867715'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Click to copy number</span>
                </div>
              </div>

              {/* Divider */}
              <div className="w-6 h-[1px] bg-white/10 my-0.5" />

              {/* 5. Resume / CV Action */}
              <div className="relative group/item">
                <button
                  onClick={() => {
                    onResumeClick();
                    setIsLockedOpen(false);
                  }}
                  aria-label="View and Download Resume"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-bold bg-sky-500 hover:bg-sky-400 border border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:scale-105 transition-all"
                >
                  <FileText className="w-4 h-4 text-slate-950" />
                </button>
                {/* Floating Tooltip */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover/item:flex flex-col gap-0.5 px-3 py-1.5 rounded-lg bg-[#07080f] border border-sky-500/30 text-[11px] font-mono text-white whitespace-nowrap shadow-xl z-50 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                    <span>Curriculum Vitae</span>
                    <Sparkles className="w-3 h-3 text-sky-400" />
                  </div>
                  <span className="text-[10px] text-slate-300">View & Download Aima&apos;s CV</span>
                </div>
              </div>

              {/* Close collapse trigger */}
              {isLockedOpen && (
                <button
                  onClick={() => setIsLockedOpen(false)}
                  aria-label="Collapse contact sidebar"
                  className="w-7 h-7 mt-1 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
