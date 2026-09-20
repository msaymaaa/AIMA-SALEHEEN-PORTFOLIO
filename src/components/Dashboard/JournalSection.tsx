import { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock, Tag, X } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
}

interface JournalSectionProps {
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function JournalSection({ onCursorChange }: JournalSectionProps) {
  const [activeArticle, setActiveArticle] = useState<JournalEntry | null>(null);

  const articles: JournalEntry[] = [
    {
      id: 'agentic-ai-pipelines',
      title: 'Architecting Resilient Multi-Agent AI Pipelines with Deterministic Fallbacks',
      date: 'OCT 2024',
      readTime: '6 MIN READ',
      category: 'AI / Distributed Systems',
      excerpt: 'How to transition from brittle prompt chaining to robust, finite-state machine guided agents with verifiable output schemas and execution guarantees.',
      content: `When building commercial applications with Large Language Models, treating the model as a non-deterministic black box without operational guardrails leads to cascading failures. In this log, I examine the architecture implemented in LeadToQuote and CareerMateAI: wrapping generative models inside strictly typed state machines with structural JSON schema enforcement, automatic retry backoffs, and deterministic fallback paths when latency budgets or validation thresholds are breached.`
    },
    {
      id: 'austrian-pedagogy',
      title: 'The Dual-Pedagogy Paradigm: Bridging Austrian Fachhochschule Applied Theory with Modern Software',
      date: 'AUG 2024',
      readTime: '5 MIN READ',
      category: 'Engineering / Pedagogy',
      excerpt: 'Reflections on the Austrian applied science framework at PAF-IAST: why rigorous theoretical modeling combined with immediate industrial execution produces superior software engineers.',
      content: `The Austrian Fachhochschule model practiced at PAF-IAST fundamentally changes how software engineering is approached. Rather than isolating algorithmic theory in abstract vacuums, coursework pairs mathematical proofs with real-time hardware execution, UAV telemetry pipelines, and production-grade compiler construction. This dual approach trains engineers to look at systems from silicon to the browser.`
    },
    {
      id: 'state-machines-ui',
      title: 'Deterministic State Machines in Frontends: Eliminating Impossible UI States',
      date: 'JUN 2024',
      readTime: '4 MIN READ',
      category: 'Frontend Engineering',
      excerpt: 'Why boolean soup (isLoading, isError, isSubmitting) is an anti-pattern, and how modeling component lifecycles as mathematical state charts prevents UI glitches.',
      content: `Modern web interfaces are frequently plagued by conflicting visual states: a button simultaneously showing a spinner while an error banner appears, or a modal dismissing before network cleanup occurs. By mapping state charts with explicit legal transitions, complex multi-step workflows (like quotation generation or live ATS parsing) become mathematically provable and trivial to test.`
    },
  ];

  return (
    <section id="journal" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 border-t border-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span className="tracking-widest uppercase">04 // THOUGHT LOGS & TECHNICAL REFLECTIONS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Engineering Journal<span className="text-sky-400">.</span>
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-sm">
          Essays and technical documentation on distributed systems, AI architectures, and software design.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            onClick={() => setActiveArticle(art)}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="p-6 sm:p-7 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-6 cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-sky-400">{art.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {art.readTime}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors leading-snug">
                {art.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-slate-400 text-[11px]">
                {art.category}
              </span>
              <span className="text-sky-400 flex items-center gap-1 group-hover:underline">
                <span>Read Note</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl glass-panel p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto relative my-auto border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-mono text-sky-400">
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
                <span>•</span>
                <span>{activeArticle.category}</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {activeArticle.title}
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300">
              {activeArticle.excerpt}
            </div>

            <div className="text-sm text-slate-300 leading-relaxed font-light space-y-4 whitespace-pre-line border-t border-white/10 pt-4">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-medium"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
