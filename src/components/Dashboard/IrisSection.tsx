import { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Send, 
  Cpu, 
  Bot, 
  CheckCircle2, 
  CornerDownLeft, 
  RefreshCw 
} from 'lucide-react';

interface IrisSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function IrisSection({ onCursorChange }: IrisSectionProps) {
  const [inputQuery, setInputQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState<Array<{ sender: 'user' | 'iris'; text: string }>>([
    {
      sender: 'iris',
      text: "Greetings. I am Iris — Aima Saleheen's automated engineering assistant. Ask me about Aima's work in cybersecurity, UAV telemetry, software development, industry internships at NRTC & Mechaline, or project availability.",
    },
  ]);

  const presetQueries = [
    "What is Aima's background in Cybersecurity & UAVs?",
    "Tell me about the NRTC and Mechaline internships",
    "What are Aima's featured projects?",
    "How can I contact Aima directly?",
  ];

  const handleSend = (queryToSend?: string) => {
    const q = queryToSend || inputQuery;
    if (!q.trim() || isProcessing) return;

    const userMessage = q.trim();
    setInputQuery('');
    setConversation((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setIsProcessing(true);

    // Dynamic simulated response engine based on Aima's verified dossier
    setTimeout(() => {
      let reply = '';
      const lower = userMessage.toLowerCase();

      if (lower.includes('cyber') || lower.includes('uav') || lower.includes('drone') || lower.includes('security')) {
        reply = "Aima has hands-on experience in web application security assessment, penetration testing fundamentals (Kali Linux, Burp Suite, SQLMap, DVWA), and UAV avionics telemetry (ArduPilot, Mission Planner, MAVLink, SITL simulation, UDP telemetry, and real-time video streaming) developed through direct work in the UAV Department at NRTC.";
      } else if (lower.includes('internship') || lower.includes('experience') || lower.includes('nrtc') || lower.includes('mechaline') || lower.includes('leverify')) {
        reply = "Aima's professional experience spans three 2026 roles: (1) Vibe Coding & AI Agent Developer at Leverify (LEVERIFY QUEST) engineering AI-assisted software prototypes and agentic workflows, (2) Cybersecurity & UAV Technology Intern at NRTC assessing UAV control systems, and (3) Business Development & Partnership Intern at Mechaline Pvt. Ltd.";
      } else if (lower.includes('credential') || lower.includes('certif')) {
        reply = "Aima's verified credentials include LEVERIFY QUEST — Vibe Coding & AI Agent Certification (Applied AI Development & Agentic Workflows, 2026), NRTC UAV Department Internship Certificate, Mechaline Business Development Internship Certificate, C++ for Beginners (ScholarHat, 2025), and PwC & Deloitte enterprise consulting simulations.";
      } else if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('game')) {
        reply = "Aima's portfolio features 7 production projects and case studies: Highway Havoc (live racing game: https://highway-havoc.vercel.app/), MentorNexus (live mentorship platform: https://mentornexus-live-2026.vercel.app/), CVForge (live interactive resume builder: https://aima-cvforge.vercel.app/), Enterprise Cybersecurity Laboratory (network security testing at NRTC), Automated Appointment Booking System (n8n/Make calendar pipelines), Automated Google Drive Media Ingestion, and AI Brand Research Pipelines.";
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('phone') || lower.includes('reach')) {
        reply = "You can contact Aima directly via Email: captaymaa@gmail.com, Phone: 0310-9867715, GitHub: github.com/msaymaaa, and LinkedIn: linkedin.com/in/aima-s-806a543a9. Aima is based in Haripur, Pakistan and open to remote opportunities worldwide.";
      } else if (lower.includes('stack') || lower.includes('language') || lower.includes('skills')) {
        reply = "Aima's technical stack spans C++, JavaScript, TypeScript, React, Next.js, Astro, Tailwind CSS, Python, Android Studio/Kotlin, alongside automation tools (n8n, Make.com, Apify) and security suites (Kali Linux, Burp Suite, SQLMap, ArduPilot, MAVLink).";
      } else {
        reply = `Analyzing query: "${userMessage}". Aima Saleheen is a Software Engineering undergraduate at Pak-Austria Fachhochschule (PAF-IAST) bridging cybersecurity, UAV telemetry, software engineering, and business development. Check the Projects or Craft sections for live demos and deeper architectural briefs.`;
      }

      setConversation((prev) => [...prev, { sender: 'iris', text: reply }]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <section id="iris" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-widest uppercase">05 // INTERACTIVE AGENT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Iris Terminal<span className="text-sky-400">.</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>IRIS ENGINE ONLINE // LATENCY 18MS</span>
        </div>
      </div>

      {/* Terminal UI Container */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/5 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-slate-300 font-semibold pl-2">iris@aima-os:~$</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-sky-400/80">
            <Bot className="w-3.5 h-3.5" />
            <span>AGENT RUNTIME</span>
          </div>
        </div>

        {/* Conversation Stream */}
        <div className="p-6 sm:p-8 space-y-5 max-h-96 overflow-y-auto font-mono text-xs sm:text-sm">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'iris' && (
                <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-2xl leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-500/20 text-sky-100 border border-sky-500/30 font-sans'
                    : 'bg-white/[0.03] text-slate-200 border border-white/5 font-sans'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500 mb-1">
                  {msg.sender === 'user' ? 'GUEST USER' : 'IRIS v2.6'}
                </div>
                {msg.text}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-3 text-sky-400 font-mono text-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Querying verified knowledge base...</span>
            </div>
          )}
        </div>

        {/* Preset Query Chips */}
        <div className="p-4 bg-white/[0.01] border-t border-white/5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-500 mr-2">Quick queries:</span>
          {presetQueries.map((query, i) => (
            <button
              key={i}
              onClick={() => handleSend(query)}
              onMouseEnter={() => onCursorChange('interactive')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-sky-500/30 text-slate-300 hover:text-white font-mono text-[11px] transition-all"
            >
              {query}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center gap-3">
          <Terminal className="w-4 h-4 text-sky-400 shrink-0 ml-2" />
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask Iris anything about Aima's technical experience, projects, or stack..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-500 font-mono outline-none"
          />
          <button
            onClick={() => handleSend()}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            disabled={!inputQuery.trim() || isProcessing}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:hover:bg-sky-500 text-slate-950 font-bold font-mono text-xs flex items-center gap-1.5 transition-all"
          >
            <span>Execute</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
