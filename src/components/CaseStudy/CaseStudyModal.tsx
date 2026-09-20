import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Target,
  Wrench,
  Sparkles
} from 'lucide-react';
import type { Project } from '../../types';
import { projects } from '../../data/projects';
import { ProjectPreviewGraphic } from '../Projects/ProjectPreviewGraphic';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onSelectProject,
  onCursorChange
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#09090b]/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0e0e13] border border-[#242430] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f28] bg-[#121217] shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#d4a373] tracking-widest">
                CASE STUDY /{project.number}
              </span>
              <span className="text-[#3c3c48]">|</span>
              <span className="text-xs font-mono text-[#8e8d88] uppercase hidden sm:inline">
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Prev / Next buttons */}
              <button
                onClick={() => onSelectProject(prevProject)}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="p-1.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-[#8e8d88] hover:text-[#f4f3ef] transition-colors"
                title={`Previous: ${prevProject.title}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectProject(nextProject)}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="p-1.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-[#8e8d88] hover:text-[#f4f3ef] transition-colors"
                title={`Next: ${nextProject.title}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-[#262632] mx-1" />

              <button
                onClick={onClose}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="p-1.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-[#8e8d88] hover:text-[#f4f3ef] transition-colors"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Case Study Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12">
            {/* Header Title & Short Description */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1c1c26] border border-[#2a2a38] text-[#d4a373]">
                  {project.statusText || 'Active Case Study'}
                </span>
                <span className="text-xs font-mono text-[#716f68]">Year: {project.year}</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#f4f3ef] tracking-tight mb-4">
                {project.title}
              </h2>
              <p className="text-base sm:text-xl text-[#c7c5bc] font-light leading-relaxed max-w-3xl">
                {project.shortDescription}
              </p>
            </div>

            {/* Visual Schematic / Screenshot Area */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#8e8d88] uppercase tracking-wider block">
                Visual Architecture & Interactive Schematic
              </span>
              <div className="h-[260px] sm:h-[320px]">
                <ProjectPreviewGraphic
                  projectId={project.id}
                  title={project.title}
                  category={project.category}
                />
              </div>
              <p className="text-[11px] font-mono text-[#666560] text-center pt-1">
                Visual placeholder configured for: <code className="text-[#a8a69e]">{project.screenshotPlaceholder}</code>.
                Production screenshots can be dropped into public folder without code overhaul.
              </p>
            </div>

            {/* Quick Summary Grid: Target User, Role, Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#131319] border border-[#20202a] rounded-xl text-sm">
              <div>
                <span className="text-xs font-mono text-[#716f68] uppercase block mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#d4a373]" />
                  Target User
                </span>
                <p className="text-[#f4f3ef] font-medium text-xs sm:text-sm">{project.targetUser}</p>
              </div>

              <div>
                <span className="text-xs font-mono text-[#716f68] uppercase block mb-1 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#d4a373]" />
                  Aima's Role
                </span>
                <p className="text-[#f4f3ef] font-medium text-xs sm:text-sm">{project.role}</p>
              </div>

              <div>
                <span className="text-xs font-mono text-[#716f68] uppercase block mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#d4a373]" />
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c1c24] border border-[#2a2a36] text-[#c2c0b6]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem & Motivation */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
                <span className="text-[#d4a373]">01 /</span> The Core Problem
              </h3>
              <p className="text-sm sm:text-base text-[#c7c5bc] leading-relaxed font-light pl-6 border-l border-[#22222c]">
                {project.problem}
              </p>
            </div>

            {/* Implementation & Architecture */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
                <span className="text-[#d4a373]">02 /</span> Implementation & Architecture
              </h3>
              <p className="text-sm sm:text-base text-[#c7c5bc] leading-relaxed font-light pl-6 border-l border-[#22222c]">
                {project.architecture}
              </p>
            </div>

            {/* Important Features */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
                <span className="text-[#d4a373]">03 /</span> Important Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-6 border-l border-[#22222c]">
                {project.importantFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#121217] border border-[#1e1e26]">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#d4d2cb] font-light leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Result & Outcome */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
                <span className="text-[#d4a373]">04 /</span> Result & Impact
              </h3>
              <div className="p-4 rounded-xl bg-[#14141a] border border-[#242430] pl-6 border-l-4 border-l-[#d4a373]">
                <p className="text-sm sm:text-base text-[#f4f3ef] leading-relaxed">
                  {project.result}
                </p>
              </div>
            </div>

            {/* Challenges & Limitations */}
            <div className="space-y-3">
              <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
                <span className="text-[#d4a373]">05 /</span> Challenges & Technical Limitations
              </h3>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#131215] border border-[#26242a]">
                <AlertTriangle className="w-5 h-5 text-[#d4a373] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#c7c5bc] leading-relaxed font-light">
                  {project.challenges}
                </p>
              </div>
            </div>

            {/* External Links / Repository Footer */}
            <div className="pt-6 border-t border-[#1c1c24] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-xs font-mono text-[#f4f3ef] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#d4a373]" />
                    <span>View Repository on GitHub</span>
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#716f68]">
                    Repository: Private / Academic submission
                  </span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#f4f3ef] text-[#09090b] text-xs font-medium hover:bg-[#e4e2d8] transition-colors"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-[#8e8d88] hover:text-[#f4f3ef] transition-colors"
              >
                Close Case Study [ESC]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
