import { FileText, Users, Cpu, Gamepad2, Shield, Layers } from 'lucide-react';

interface ProjectPreviewGraphicProps {
  projectId: string;
  title: string;
  category: string;
}

export function ProjectPreviewGraphic({ projectId, title, category }: ProjectPreviewGraphicProps) {
  return (
    <div className="relative w-full h-full min-h-[220px] bg-[#0c0c10] border border-[#22222a] rounded-lg overflow-hidden flex flex-col justify-between p-5 select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #333340 1px, transparent 1px), linear-gradient(to bottom, #333340 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1c1c24] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#343440]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a34]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#202028]" />
          <span className="ml-2 font-mono text-[11px] text-[#8e8d88] tracking-wider uppercase">
            ARCHITECTURAL SCHEMATIC
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#d4a373] bg-[#d4a373]/10 px-2 py-0.5 rounded border border-[#d4a373]/20">
          {category}
        </span>
      </div>

      {/* Center Dynamic SVG Schematic per project */}
      <div className="relative z-10 my-4 flex items-center justify-center">
        {projectId === 'lead-to-quote' && (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#13131a] rounded border border-[#262632] flex items-center justify-between">
              <span className="text-[#a3a199] flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-[#d4a373]" />
                Inbound Lead Intake
              </span>
              <span className="text-[#22c55e] text-[10px]">Verified</span>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-3 bg-[#383848]" />
            </div>
            <div className="p-3 bg-[#13131a] rounded border border-[#262632] flex items-center justify-between">
              <span className="text-[#f4f3ef] flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#d4a373]" />
                Quotation Calculator Engine
              </span>
              <span className="text-[#d4a373] text-[10px]">PDF Renderer</span>
            </div>
          </div>
        )}

        {projectId === 'mentor-nexus' && (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#13131a] rounded border border-[#262632] text-center">
                <Users className="w-4 h-4 mx-auto mb-1 text-[#d4a373]" />
                <span className="text-[11px] text-[#f4f3ef]">Student Mentees</span>
              </div>
              <div className="p-2.5 bg-[#13131a] rounded border border-[#262632] text-center">
                <Shield className="w-4 h-4 mx-auto mb-1 text-[#22c55e]" />
                <span className="text-[11px] text-[#f4f3ef]">Verified Mentors</span>
              </div>
            </div>
            <div className="p-2 bg-[#171720] rounded border border-[#2a2a38] text-center text-[11px] text-[#8e8d88]">
              Domain & Skill Matching Pipeline
            </div>
          </div>
        )}

        {projectId === 'cv-forge' && (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#13131a] rounded border border-[#262632]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-[#f4f3ef] font-semibold">ATS-Parser Alignment</span>
                <span className="text-[10px] text-[#22c55e]">98% Fidelity</span>
              </div>
              <div className="w-full bg-[#202028] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#d4a373] h-full w-[85%]" />
              </div>
            </div>
            <div className="text-[10px] text-[#716f68] text-center">
              Zero-Tracking • Client-Side PDF Generation
            </div>
          </div>
        )}

        {projectId === 'career-mate-ai' && (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#13131a] rounded border border-[#262632] flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#f4f3ef]">
                <Cpu className="w-3.5 h-3.5 text-[#d4a373]" />
                Candidate Skill Gap Analysis
              </span>
              <span className="text-[10px] font-mono text-[#d4a373]">LLM Grounded</span>
            </div>
            <div className="p-2 bg-[#171720] rounded border border-[#252530] text-[10px] text-[#8e8d88] flex justify-between">
              <span>Interview Simulator</span>
              <span>Roadmap Synthesis</span>
            </div>
          </div>
        )}

        {projectId === 'highway-havoc' && (
          <div className="w-full max-w-sm space-y-2 font-mono text-xs">
            <div className="p-3 bg-[#13131a] rounded border border-[#262632] flex items-center justify-between">
              <span className="flex items-center gap-2 text-[#f4f3ef]">
                <Gamepad2 className="w-4 h-4 text-[#d4a373]" />
                C++ Deterministic Game Loop
              </span>
              <span className="text-[10px] text-[#22c55e]">60 FPS</span>
            </div>
            <div className="p-2 bg-[#171720] rounded border border-[#252530] text-[10px] text-[#8e8d88] flex justify-between">
              <span>Continuous Collision AABB</span>
              <span>Memory Optimized</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Placeholder Notice */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#1c1c24] text-[10px] font-mono text-[#716f68]">
        <span>{title} System View</span>
        <span className="text-[#a3a199]">[ Asset placeholder: editable in data/projects.ts ]</span>
      </div>
    </div>
  );
}
