import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Command, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Header({
  onOpenCommandPalette,
  onNavigateSection,
  activeSection,
  onCursorChange
}: HeaderProps) {
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
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Credentials', id: 'credentials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090b]/85 backdrop-blur-md border-b border-[#1c1c24] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigateSection('hero')}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-2 h-2 rounded-full bg-[#d4a373] animate-pulse" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-[#f4f3ef] group-hover:text-[#d4a373] transition-colors">
                AIMA SALEHEEN
              </span>
              <span className="text-[10px] font-mono tracking-wider text-[#8e8d88] uppercase hidden sm:inline">
                Software Engineering
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121217]/60 border border-[#22222a] px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigateSection(item.id)}
                  onMouseEnter={() => onCursorChange('interactive')}
                  onMouseLeave={() => onCursorChange('default')}
                  className={`relative px-3 py-1 text-xs font-medium tracking-wide transition-colors rounded-full ${
                    isActive ? 'text-[#f4f3ef]' : 'text-[#9c9a93] hover:text-[#f4f3ef]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#22222c] rounded-full -z-10 border border-[#30303c]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Command Palette Trigger & Contact */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCommandPalette}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              aria-label="Open command palette"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#141419] border border-[#26262e] text-[#8e8d88] hover:text-[#f4f3ef] hover:border-[#383844] transition-all text-xs font-mono"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Command</span>
              <kbd className="text-[10px] text-[#716f68] bg-[#1c1c24] px-1 py-0.5 rounded border border-[#292934]">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => onNavigateSection('contact')}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#f4f3ef] text-[#09090b] hover:bg-[#e2e0d8] transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg bg-[#141419] border border-[#26262e] text-[#f4f3ef]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-50 bg-[#0e0e13] border-b border-[#24242e] p-6 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-wider text-[#716f68] uppercase">
                Navigation
              </span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between py-2 text-base font-medium text-[#c8c6bf] hover:text-[#f4f3ef] border-b border-[#1a1a22] text-left"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#716f68]" />
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#17171e] border border-[#2a2a34] text-xs font-mono text-[#f4f3ef]"
                >
                  <Command className="w-4 h-4 text-[#d4a373]" />
                  <span>Open Command Palette (Search)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateSection('contact');
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#f4f3ef] text-[#09090b] text-xs font-semibold text-center mt-1"
                >
                  Contact Aima
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
