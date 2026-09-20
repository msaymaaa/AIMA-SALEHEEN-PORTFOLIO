import { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Check, 
  ExternalLink, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code2
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function ResumeModal({ isOpen, onClose, onCursorChange }: ResumeModalProps) {
  const [downloading, setDownloading] = useState(false);
  const printButtonRef = useRef<HTMLButtonElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  // Attach native JavaScript event listeners to both Print and Download PDF buttons
  useEffect(() => {
    if (!isOpen) return;

    const handleTriggerPrint = (e: MouseEvent) => {
      e.preventDefault();
      window.print();
    };

    const printEl = printButtonRef.current;
    const downloadEl = downloadButtonRef.current;

    if (printEl) {
      printEl.addEventListener('click', handleTriggerPrint);
    }
    if (downloadEl) {
      downloadEl.addEventListener('click', handleTriggerPrint);
    }

    return () => {
      if (printEl) {
        printEl.removeEventListener('click', handleTriggerPrint);
      }
      if (downloadEl) {
        downloadEl.removeEventListener('click', handleTriggerPrint);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    window.print();
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    window.print();
    setTimeout(() => setDownloading(false), 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      id="cv-modal-backdrop"
      className="cv-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cv-modal-container"
        className="cv-modal-container relative w-full max-w-4xl my-8 rounded-2xl glass-panel border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Action Bar (Hidden during print) */}
        <div
          id="cv-action-bar"
          className="cv-action-bar no-print flex items-center justify-between px-6 py-4 bg-[#090a12] border-b border-white/10 text-xs font-mono"
        >
          <div className="flex items-center gap-2 text-sky-400">
            <FileText className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider">
              AIMA SALEHEEN // CURRICULUM VITAE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={printButtonRef}
              id="cv-print-button"
              onClick={handlePrint}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="no-print flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title="Print Document (Ctrl+P / Cmd+P)"
            >
              <Printer className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              ref={downloadButtonRef}
              id="cv-download-button"
              onClick={handleDownload}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="no-print flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
              title="Download or Save as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Preparing...' : 'Download PDF'}</span>
            </button>

            <button
              id="cv-close-button"
              onClick={onClose}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="no-print p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors ml-2 cursor-pointer"
              aria-label="Close CV"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable A4 CV Container */}
        <div
          id="cv-document-content"
          className="cv-document-content overflow-y-auto p-6 sm:p-10 bg-[#0b0c14] space-y-8 text-slate-200"
        >
          {/* Header */}
          <div className="border-b border-white/10 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
                AIMA SALEHEEN
              </h1>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
                Software Engineering Undergraduate
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <a href="mailto:captaymaa@gmail.com" className="hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>captaymaa@gmail.com</span>
              </a>
              <span>•</span>
              <a href="tel:03109867715" className="hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>0310-9867715</span>
              </a>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Haripur, Pakistan</span>
              </span>
              <span>•</span>
              <a href="https://github.com/msaymaaa" target="_blank" rel="noreferrer" className="hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                <Github className="w-3.5 h-3.5 text-sky-400" />
                <span>github.com/msaymaaa</span>
              </a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/aima-s-806a543a9/" target="_blank" rel="noreferrer" className="hover:text-sky-400 flex items-center gap-1.5 transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>linkedin.com/in/aima-s-806a543a9</span>
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Professional Summary</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Software Engineering undergraduate at Pak-Austria Fachhochschule (PAF-IAST) with hands-on industry experience spanning cybersecurity, UAV technology, software development, and business development. Experienced in web application security assessment, penetration testing fundamentals, UAV communication and simulation, lead generation, client engagement, and technical documentation, with practical exposure to tools including Kali Linux, Burp Suite, SQLMap, DVWA, ArduPilot, Mission Planner, MAVLink, SITL, and C++. Brings a combination of technical curiosity, analytical problem-solving, professional communication, and adaptability, with a strong interest in transforming emerging technologies into practical, real-world solutions.
            </p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span>Industry Work & Applied Experience</span>
            </h2>

            {/* Role 1 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-white">
                  Vibe Coding & AI Agent Developer
                </h3>
                <span className="text-xs font-mono text-sky-400">2026 | Remote / Applied Lab</span>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                Leverify — LEVERIFY QUEST (Applied AI & Agentic Workflows)
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-light leading-relaxed pt-1">
                <li>Practiced AI-assisted software development and rapid application prototyping using natural-language prompting and iterative cycles.</li>
                <li>Constructed and refined applications through continuous prompt choreography, evaluating structural design and code maintainability.</li>
                <li>Designed and deployed AI agent concepts, agentic workflows, and task automation pipelines to streamline development processes.</li>
                <li>Integrated AI capabilities directly into practical software applications, verifying API interactions and context management.</li>
                <li>Conducted rigorous debugging, testing, and continuous refinement of AI-generated implementations to maintain software quality and reliability.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-white">
                  Cybersecurity & UAV Technology Intern
                </h3>
                <span className="text-xs font-mono text-sky-400">2026 | Haripur, PK</span>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                National Radio & Telecommunication Corporation (NRTC) — UAV Department
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-light leading-relaxed pt-1">
                <li>Performed web application security assessments on a UAV control system, identifying and analyzing vulnerabilities in authentication, input handling, and data transmission.</li>
                <li>Conducted penetration testing using Kali Linux, Burp Suite, and SQLMap; simulated attack scenarios on DVWA to strengthen practical exploitation and vulnerability-assessment skills.</li>
                <li>Explored UAV configuration, simulation, and telemetry workflows using ArduPilot, Mission Planner, MAVLink, and SITL, gaining hands-on understanding of flight control systems.</li>
                <li>Analyzed UAV communication protocols, including UDP-based telemetry and real-time video streaming, to assess security and reliability of control interfaces.</li>
                <li>Documented findings in structured technical reports, translating security observations into actionable insights.</li>
              </ul>
            </div>

            {/* Role 3 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-white">
                  Business Development & Partnership Intern
                </h3>
                <span className="text-xs font-mono text-sky-400">2026 | Pakistan</span>
              </div>
              <span className="text-xs font-mono text-slate-400 block">
                Mechaline Pvt. Ltd. — Business & UAV Department Collaboration
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-light leading-relaxed pt-1">
                <li>Drove lead generation efforts using Google Maps and market research to identify, qualify, and organize high-potential prospects.</li>
                <li>Executed inbound and outbound sales outreach, engaging prospects through structured scripts and professional communication strategies.</li>
                <li>Delivered client demonstration calls, presenting product value propositions and handling objections to move leads through the sales funnel.</li>
                <li>Prepared and reviewed partnership documentation and legal/business agreements, supporting cross-functional deal execution.</li>
                <li>Gained direct exposure to the UAV industry through collaboration with the company&apos;s UAV Department, connecting business strategy with emerging technology.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Education</span>
            </h2>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-white">
                  Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology (PAF–IAST)
                </h3>
                <span className="text-xs font-mono text-sky-400">2025 - 2029</span>
              </div>
              <span className="text-xs font-mono text-slate-300 block">
                Bachelor of Science in Software Engineering (BS SE)
              </span>
              <p className="text-xs text-slate-400 font-light pt-1">
                Austrian dual-pedagogy applied engineering curriculum integrating software architecture, distributed algorithms, cybersecurity, and computer engineering.
              </p>
            </div>
          </div>

          {/* Certifications & Job Simulations */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-sky-400" />
              <span>Certifications & Enterprise Simulations</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-sky-500/[0.04] border border-sky-400/25 sm:col-span-2 space-y-0.5">
                <span className="font-semibold text-white block">LEVERIFY QUEST — Vibe Coding & AI Agent</span>
                <span className="text-[11px] font-mono text-sky-400">Certification | Applied AI Development & Agentic Workflows | 2026</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">NRTC UAV Department Internship</span>
                <span className="text-[11px] font-mono text-sky-400">Certificate of Completion | 2026</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">Mechaline PVT. LTD BizDev Internship</span>
                <span className="text-[11px] font-mono text-sky-400">Certificate of Completion | 2026</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">C++ for Beginners — ScholarHat</span>
                <span className="text-[11px] font-mono text-slate-400">Course Certification | 2025</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">PwC Technology Consulting Job Simulation</span>
                <span className="text-[11px] font-mono text-slate-400">Client Discovery & Roadmapping (Forage, 2026)</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">Deloitte Digital Literacy Simulation</span>
                <span className="text-[11px] font-mono text-slate-400">Boolean Search Operators & Research (Forage)</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                <span className="font-semibold text-white block">Deloitte Effective Leadership Simulation</span>
                <span className="text-[11px] font-mono text-slate-400">Consulting Leadership & Decision Scenarios</span>
              </div>
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Technical Skills</span>
            </h2>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div>
                <span className="font-mono text-slate-400 font-semibold">Languages & Frameworks: </span>
                <span className="text-slate-200">C++, JavaScript, TypeScript, React, Next.js, Astro, Tailwind CSS, HTML5, CSS3</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 font-semibold">Cybersecurity & Testing: </span>
                <span className="text-slate-200">Kali Linux, Burp Suite, SQLMap, DVWA, Web App Security, Vulnerability Assessment, Network Testing</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 font-semibold">UAV & Systems: </span>
                <span className="text-slate-200">ArduPilot, Mission Planner, MAVLink, SITL Simulation, UDP Telemetry, Video Streaming, RTK</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 font-semibold">Automation & AI: </span>
                <span className="text-slate-200">n8n, Make.com, Apify, OpenAI API, Gemini API, Google Workspace APIs (Gmail, Calendar, Drive, Sheets)</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 font-semibold">Databases & Cloud: </span>
                <span className="text-slate-200">Supabase, PostgreSQL, Android Studio/Kotlin, Vercel, Git, GitHub, Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
