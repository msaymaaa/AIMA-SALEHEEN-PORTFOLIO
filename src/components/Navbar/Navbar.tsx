import { useState, useEffect } from 'react';
import { 
  Command, 
  Menu, 
  X, 
  Sparkles, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Layers, 
  Bot, 
  Radio, 
  Home,
  RotateCcw
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
  onReopenSplash: () => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function Navbar({
  activeSection,
  onNavigateSection,
  onOpenCommandPalette,
  onReopenSplash,
  onCursorChange,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'credentials', label: 'Credentials', icon: GraduationCap },
    { id: 'craft', label: 'Craft', icon: Layers },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'iris', label: 'Iris', icon: Bot },
    { id: 'stream', label: 'Stream', icon: Radio },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#050508]/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand / Name Signature Logo */}
        <button
          onClick={() => onNavigateSection('home')}
          onMouseEnter={() => onCursorChange('interactive')}
          onMouseLeave={() => onCursorChange('default')}
          className="flex items-center gap-3 text-left group py-0.5"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-xs group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all">
            AS
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-signature text-2xl sm:text-3xl text-white group-hover:text-sky-300 transition-colors tracking-wide leading-none select-none">
              Aima Saleheen
            </span>
            <span className="text-[9px] font-mono text-slate-400 tracking-widest hidden sm:inline uppercase mt-0.5">
              Software Engineer // PAF-IAST
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full glass-pill border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateSection(item.id)}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(56,189,248,0.25)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-sky-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: ⌘K Command Palette + Intro Recall + Mobile Menu */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all group"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] text-slate-400">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-slate-300 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Re-enter Intro Screen */}
          <button
            onClick={onReopenSplash}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-sky-400 transition-colors"
            title="Re-open Intro Experience"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="md:hidden p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#050508]/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-mono flex items-center justify-between ${
                  isActive
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                    : 'text-slate-300 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenCommandPalette();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-sky-400 flex items-center gap-2 py-2"
            >
              <Command className="w-4 h-4" />
              <span>Open Command Palette (⌘K)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
