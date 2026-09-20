import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Github, ExternalLink, BookOpen, Layers } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../types';
import { ProjectPreviewGraphic } from './ProjectPreviewGraphic';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Projects({ onSelectProject, onCursorChange }: ProjectsProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(projects[0].id);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full-Stack' | 'AI & Web' | 'Application' | 'Systems & Games'>('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const hoveredProject = projects.find((p) => p.id === hoveredProjectId) || projects[0];

  return (
    <section id="projects" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            02 / SELECTED WORK
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Featured Projects & Case Studies.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Carefully engineered applications across full-stack web, generative interfaces, and systems programming.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {(['All', 'Full-Stack', 'AI & Web', 'Application', 'Systems & Games'] as const).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                isActive
                  ? 'bg-[#f4f3ef] text-[#09090b] font-semibold'
                  : 'bg-[#121217] text-[#8e8d88] hover:text-[#f4f3ef] border border-[#22222a]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Main Grid: Interactive Projects List + Live Preview Card (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Projects List (Interactive Rows) */}
        <div className="lg:col-span-7 divide-y divide-[#1e1e26] border-y border-[#1e1e26]">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  onCursorChange('project', 'VIEW CASE');
                }}
                onMouseLeave={() => onCursorChange('default')}
                onClick={() => onSelectProject(project)}
                className={`group py-8 px-4 sm:px-6 transition-all duration-200 cursor-pointer ${
                  isHovered ? 'bg-[#121218]' : 'hover:bg-[#0e0e13]'
                }`}
              >
                {/* Top Row: Number, Title, Arrow */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#d4a373] tracking-widest font-semibold">
                      /{project.number}
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#f4f3ef] group-hover:text-[#d4a373] transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#716f68] hidden sm:inline">
                      {project.year}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[#262632] group-hover:border-[#d4a373] flex items-center justify-center text-[#8e8d88] group-hover:text-[#d4a373] transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm text-[#9c9a93] font-light leading-relaxed mb-4 max-w-xl">
                  {project.shortDescription}
                </p>

                {/* Tech Pills & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#171720] border border-[#272734] text-[#a8a69e]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#d4a373] opacity-80 group-hover:opacity-100">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Read Case Study
                    </span>
                  </div>
                </div>

                {/* Mobile Inline Graphic (shown only on mobile screens) */}
                <div className="mt-5 lg:hidden">
                  <ProjectPreviewGraphic
                    projectId={project.id}
                    title={project.title}
                    category={project.category}
                  />
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex-1 py-2 rounded bg-[#1b1b22] border border-[#2e2e3a] text-xs font-mono text-[#f4f3ef] text-center"
                    >
                      Open Case Study
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded bg-[#1b1b22] border border-[#2e2e3a] text-[#8e8d88]"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Sticky Floating Architectural Inspector (Desktop) */}
        <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-[#101015] border border-[#22222a] rounded-xl p-6 shadow-xl"
            >
              {/* Graphic Component */}
              <div className="mb-5">
                <ProjectPreviewGraphic
                  projectId={hoveredProject.id}
                  title={hoveredProject.title}
                  category={hoveredProject.category}
                />
              </div>

              {/* Inspector Meta Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1c1c24] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[#716f68] uppercase block">
                      Target User
                    </span>
                    <p className="text-xs text-[#dcdad2] font-medium mt-0.5">
                      {hoveredProject.targetUser}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#d4a373] bg-[#d4a373]/10 px-2 py-0.5 rounded border border-[#d4a373]/20">
                    {hoveredProject.statusText || 'Active'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#716f68] uppercase block mb-1">
                    Problem Solved
                  </span>
                  <p className="text-xs text-[#a3a199] leading-relaxed">
                    {hoveredProject.problem}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#716f68] uppercase block mb-1">
                    My Role
                  </span>
                  <p className="text-xs text-[#f4f3ef] font-medium">
                    {hoveredProject.role}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onSelectProject(hoveredProject)}
                    onMouseEnter={() => onCursorChange('interactive')}
                    onMouseLeave={() => onCursorChange('default')}
                    className="flex-1 py-2.5 rounded-lg bg-[#f4f3ef] text-[#09090b] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#e4e2d8] transition-colors"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {hoveredProject.githubUrl && (
                    <a
                      href={hoveredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => onCursorChange('interactive')}
                      onMouseLeave={() => onCursorChange('default')}
                      className="p-2.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-[#c7c5bc] transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  {hoveredProject.liveUrl && (
                    <a
                      href={hoveredProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => onCursorChange('interactive')}
                      onMouseLeave={() => onCursorChange('default')}
                      className="p-2.5 rounded-lg bg-[#181820] hover:bg-[#22222c] border border-[#2a2a36] text-[#c7c5bc] transition-colors"
                      title="Open Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
