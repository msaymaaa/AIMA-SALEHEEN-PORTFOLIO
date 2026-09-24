import { useState, useEffect, useRef } from 'react';
import { 
  Command, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Copy, 
  Check, 
  FolderGit2, 
  Layers, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  Radio, 
  Home, 
  Mail, 
  Phone,
  Github, 
  Linkedin,
  Sparkles,
  X
} from 'lucide-react';
import { projects } from '../../data/projects';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigateSection,
  onCursorChange,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const emailAddress = 'captaymaa@gmail.com';
  const phoneNumber = '0310-9867715';
  const githubUrl = 'https://github.com/msaymaaa';
  const linkedinUrl = 'https://www.linkedin.com/in/aima-s-806a543a9/';

  interface CommandItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Navigation' | 'Projects' | 'Actions' | 'Social';
    icon: any;
    action: () => void;
  }

  const allCommands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home / About Me',
      subtitle: 'Software Engineering undergraduate bio & live widgets',
      category: 'Navigation',
      icon: Home,
      action: () => {
        onNavigateSection('home');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Featured Projects',
      subtitle: '8 Case studies: LeadToQuote, Highway Havoc, MentorNexus, CVForge...',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        onNavigateSection('projects');
        onClose();
      },
    },
    {
      id: 'nav-credentials',
      title: 'Go to Credentials & Education',
      subtitle: 'PAF-IAST, Leverify, NRTC, Mechaline, ScholarHat, PwC, Deloitte',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => {
        onNavigateSection('credentials');
        onClose();
      },
    },
    {
      id: 'nav-craft',
      title: 'Go to Craft & 3D Tech Sphere',
      subtitle: 'Interactive 3D particle sphere and domain breakdown',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        onNavigateSection('craft');
        onClose();
      },
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience',
      subtitle: 'Leverify AI Agent, NRTC Cybersecurity & UAV, Mechaline BizDev',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        onNavigateSection('experience');
        onClose();
      },
    },
    {
      id: 'nav-iris',
      title: 'Go to Iris AI Terminal',
      subtitle: 'Conversational assistant answering questions about Aima',
      category: 'Navigation',
      icon: Bot,
      action: () => {
        onNavigateSection('iris');
        onClose();
      },
    },
    {
      id: 'nav-stream',
      title: 'Go to Live Stream',
      subtitle: 'Telemetry logs, activity feed, and engineering updates',
      category: 'Navigation',
      icon: Radio,
      action: () => {
        onNavigateSection('stream');
        onClose();
      },
    },

    // Projects Direct Links
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      title: `Project: ${p.title}`,
      subtitle: `${p.category} — ${p.tools.slice(0, 3).join(', ')}`,
      category: 'Projects' as const,
      icon: FolderGit2,
      action: () => {
        onNavigateSection('projects');
        onClose();
      },
    })),

    // Actions
    {
      id: 'act-copy-email',
      title: 'Copy Email Address',
      subtitle: emailAddress,
      category: 'Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(emailAddress);
        setCopiedText('Email Copied!');
        setTimeout(() => setCopiedText(null), 2000);
      },
    },
    {
      id: 'act-copy-phone',
      title: 'Copy Phone Number',
      subtitle: phoneNumber,
      category: 'Actions',
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopiedText('Phone Copied!');
        setTimeout(() => setCopiedText(null), 2000);
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/msaymaaa',
      category: 'Social',
      icon: Github,
      action: () => {
        window.open(githubUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/aima-s-806a543a9',
      category: 'Social',
      icon: Linkedin,
      action: () => {
        window.open(linkedinUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'act-highway-havoc',
      title: 'Play Highway Havoc Racing Game',
      subtitle: 'https://highway-havoc.vercel.app/',
      category: 'Projects',
      icon: ExternalLink,
      action: () => {
        window.open('https://highway-havoc.vercel.app/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-leadtoquote',
      title: 'Open LeadToQuote Live Platform',
      subtitle: 'https://lead2quote.vercel.app/',
      category: 'Projects',
      icon: ExternalLink,
      action: () => {
        window.open('https://lead2quote.vercel.app/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-mentornexus',
      title: 'Open MentorNexus Live Platform',
      subtitle: 'https://mentornexus-live-2026.vercel.app/',
      category: 'Projects',
      icon: ExternalLink,
      action: () => {
        window.open('https://mentornexus-live-2026.vercel.app/', '_blank');
        onClose();
      },
    },
    {
      id: 'act-cvforge',
      title: 'Open CVForge Live Resume Builder',
      subtitle: 'https://aima-cvforge.vercel.app/',
      category: 'Projects',
      icon: ExternalLink,
      action: () => {
        window.open('https://aima-cvforge.vercel.app/', '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = query.trim() === ''
    ? allCommands
    : allCommands.filter(
        (cmd) =>
          cmd.title.toLowerCase().includes(query.toLowerCase()) ||
          cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl glass-panel border border-sky-500/30 shadow-[0_0_60px_rgba(56,189,248,0.25)] overflow-hidden space-y-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search sections, projects, contacts..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-slate-500 font-mono outline-none"
          />
          {copiedText && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 animate-pulse shrink-0">
              {copiedText}
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No matching commands or projects found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => {
                    setSelectedIndex(idx);
                    onCursorChange('interactive');
                  }}
                  onMouseLeave={() => onCursorChange('default')}
                  className={`px-4 py-3 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-500/15 border border-sky-500/40 text-white'
                      : 'hover:bg-white/[0.04] text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-sky-500/20 text-sky-400' : 'bg-white/[0.04] text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate flex items-center gap-2">
                        <span>{cmd.title}</span>
                        <span className="text-[10px] text-slate-500 font-normal uppercase">
                          [{cmd.category}]
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {cmd.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Palette Footer */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#07070c] border-t border-white/5 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-sky-400/80">Aima Saleheen Portfolio OS</span>
        </div>
      </div>
    </div>
  );
}
