import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRight,
  FolderGit2,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Mail,
  Home,
  X,
  CornerDownLeft
} from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onNavigateSection: (sectionId: string) => void;
}

interface CommandItem {
  id: string;
  type: 'section' | 'project';
  title: string;
  subtitle: string;
  icon: any;
  action: () => void;
  badge?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
  onNavigateSection,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile command items
  const sectionCommands: CommandItem[] = [
    {
      id: 'sec-home',
      type: 'section',
      title: 'Home / Hero',
      subtitle: 'Jump to top intro and value statement',
      icon: Home,
      action: () => onNavigateSection('hero'),
      badge: 'Section'
    },
    {
      id: 'sec-about',
      type: 'section',
      title: 'About Aima',
      subtitle: 'Background at PAF-IAST, focus areas and philosophy',
      icon: User,
      action: () => onNavigateSection('about'),
      badge: 'Section'
    },
    {
      id: 'sec-projects',
      type: 'section',
      title: 'Featured Projects',
      subtitle: 'Browse all 5 engineering projects & case studies',
      icon: FolderGit2,
      action: () => onNavigateSection('projects'),
      badge: 'Work'
    },
    {
      id: 'sec-experience',
      type: 'section',
      title: 'Experience & Internships',
      subtitle: 'NRTC UAV Department, Leverify, TA Mechaline',
      icon: Briefcase,
      action: () => onNavigateSection('experience'),
      badge: 'History'
    },
    {
      id: 'sec-education',
      type: 'section',
      title: 'Education',
      subtitle: 'Software Engineering at PAF-IAST',
      icon: GraduationCap,
      action: () => onNavigateSection('education'),
      badge: 'Academic'
    },
    {
      id: 'sec-skills',
      type: 'section',
      title: 'Technical Skills Matrix',
      subtitle: 'C++, TypeScript, React, Next.js, Cybersecurity, UAV tools',
      icon: Sparkles,
      action: () => onNavigateSection('skills'),
      badge: 'Stack'
    },
    {
      id: 'sec-credentials',
      type: 'section',
      title: 'Credentials & Fellowship',
      subtitle: 'Millennium Fellowship, NRTC UAV Internship',
      icon: Award,
      action: () => onNavigateSection('credentials'),
      badge: 'Honors'
    },
    {
      id: 'sec-contact',
      type: 'section',
      title: 'Contact & Inquiries',
      subtitle: 'Direct email, LinkedIn, GitHub and collaboration channels',
      icon: Mail,
      action: () => onNavigateSection('contact'),
      badge: 'Connect'
    }
  ];

  const projectCommands: CommandItem[] = projects.map((p) => ({
    id: `proj-${p.id}`,
    type: 'project',
    title: p.title,
    subtitle: `${p.category} — ${p.tools.slice(0, 3).join(', ')}`,
    icon: FolderGit2,
    action: () => onSelectProject(p),
    badge: p.number
  }));

  const allCommands = [...sectionCommands, ...projectCommands];

  const filteredCommands = allCommands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      (cmd.badge && cmd.badge.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#09090b]/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#111116] border border-[#26262e] rounded-xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header Search Input */}
            <div className="flex items-center px-4 border-b border-[#22222a]">
              <Search className="w-5 h-5 text-[#8e8d88] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search projects... (e.g. LeadToQuote, UAV, Skills)"
                className="w-full bg-transparent py-4 text-sm md:text-base text-[#f4f3ef] placeholder-[#666560] focus:outline-none"
              />
              {query ? (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded text-[#8e8d88] hover:text-[#f4f3ef]"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-[#716f68] px-1.5 py-0.5 rounded border border-[#282830]">
                  ESC
                </span>
              )}
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[#181820]">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#716f68] font-mono">
                  No matching commands or projects found for "{query}".
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-left transition-colors ${
                        isSelected
                          ? 'bg-[#1b1b22] text-[#f4f3ef]'
                          : 'text-[#c2c0b8] hover:bg-[#15151c]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-3">
                        <div
                          className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'border-[#d4a373]/50 bg-[#d4a373]/10 text-[#d4a373]'
                              : 'border-[#26262e] bg-[#141419] text-[#8e8d88]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-[#f4f3ef] truncate">
                              {cmd.title}
                            </span>
                            {cmd.badge && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[#2b2b34] rounded text-[#8e8d88]">
                                {cmd.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#716f68] truncate">
                            {cmd.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center text-[#716f68]">
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] font-mono text-[#d4a373]">
                            Jump
                            <CornerDownLeft className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="px-4 py-2.5 bg-[#0d0d10] border-t border-[#1e1e24] flex items-center justify-between text-[11px] font-mono text-[#716f68]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 rounded bg-[#181820] border border-[#282830]">↑</kbd>
                  <kbd className="px-1 py-0.5 rounded bg-[#181820] border border-[#282830]">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#181820] border border-[#282830]">↵</kbd>
                  Select
                </span>
              </div>
              <div>
                <span>Aima Saleheen — Creative Engineer Portfolio</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
