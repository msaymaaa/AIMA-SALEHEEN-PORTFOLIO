import { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  X,
  Sparkles,
  Gamepad2,
  Shield,
  Workflow
} from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';

interface ProjectsSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function ProjectsSection({ onCursorChange }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Systems & Games', 'Full-Stack', 'Application', 'Cybersecurity', 'Automation & AI'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 border-t border-white/5">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span className="tracking-widest uppercase">01 // PRODUCTION WORK & CASE STUDIES ({String(projects.length).padStart(2, '0')})</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Featured Projects<span className="text-sky-400">.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl glass-panel text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)] font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="group relative p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-6 overflow-hidden border border-white/10"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-sky-500/20 transition-all pointer-events-none" />

            <div className="space-y-4">
              {/* Card Meta: Number & Category */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-sky-400 font-bold tracking-widest">
                  PROJECT {project.number}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[11px] text-slate-300">
                  {project.categoryDisplay || project.category}
                </span>
              </div>

              {/* Title & Description with direct Live Link next to title */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 hover:text-white font-mono text-[11px] font-semibold transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                      title={`Open Live ${project.title}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>
              </div>

              {/* Key Features preview */}
              <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-slate-400">
                {project.importantFeatures.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tech Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tools.slice(0, 4).map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/10 text-[11px] font-mono text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
                {project.tools.length > 4 && (
                  <span className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-500">
                    +{project.tools.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setActiveModalProject(project)}
                className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium transition-colors"
              >
                <span>Read Architecture</span>
                <span>→</span>
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
                    title={`Open Live ${project.title}`}
                  >
                    <span>{project.liveButtonText || (project.id === 'highway-havoc' ? 'Play Game' : 'Live Demo')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Architecture Case Study Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-3xl my-8 p-6 sm:p-10 rounded-2xl glass-panel border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 border-b border-white/5 pb-6">
              <div className="flex items-center gap-3 text-xs font-mono text-sky-400">
                <span className="font-bold uppercase tracking-wider">
                  PROJECT {activeModalProject.number} // {activeModalProject.categoryDisplay || activeModalProject.category}
                </span>
                <span>•</span>
                <span className="text-slate-400">{activeModalProject.year}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-display font-black text-2xl sm:text-4xl text-white">
                  {activeModalProject.title}
                </h3>
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Launch Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                {activeModalProject.shortDescription}
              </p>
            </div>

            {/* Problem & Role Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">The Problem</span>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {activeModalProject.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-xs font-mono text-slate-400 uppercase">My Role</span>
                <p className="text-xs sm:text-sm text-slate-300 font-light">
                  {activeModalProject.role}
                </p>
              </div>
            </div>

            {/* Technical Architecture */}
            <div className="p-5 rounded-xl bg-sky-500/[0.04] border border-sky-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                <Cpu className="w-4 h-4" />
                <span className="uppercase font-semibold">Technical Architecture</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                {activeModalProject.architecture}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Key Deliverables & Implemented Features:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModalProject.importantFeatures.map((feat, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools Used */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Applied Toolchain & Technologies:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeModalProject.statusText || 'Active Architecture'}</span>
              </span>

              <div className="flex items-center gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Code</span>
                  </a>
                )}

                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                  >
                    <span>{activeModalProject.liveButtonText ? (activeModalProject.liveButtonText === 'View Live' ? 'View Live App' : activeModalProject.liveButtonText) : 'Launch Live App'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
