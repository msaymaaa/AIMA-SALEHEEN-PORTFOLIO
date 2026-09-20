import { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, Clock, Send, MessageSquare } from 'lucide-react';

interface ContactProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Contact({ onCursorChange }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [currentTimePKT, setCurrentTimePKT] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const emailAddress = 'captaymaa@gmail.com';
  const githubUrl = 'https://github.com/captaymaa';
  const linkedinUrl = 'https://www.linkedin.com/in/aima-saleheen'; // Editable placeholder

  // Format Pakistan Time (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const pktString = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setCurrentTimePKT(pktString);
      } catch (e) {
        setCurrentTimePKT('UTC+5');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            08 / GET IN TOUCH
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-[#f4f3ef] tracking-tight">
            Let's build something remarkable.
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-[#8e8d88]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121218] border border-[#22222c]">
            <Clock className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>PKT (UTC+5): {currentTimePKT || 'Loading...'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#22c55e]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span>Open to inquiries</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Links & Reachability */}
        <div className="lg:col-span-5 space-y-8">
          <p className="text-base sm:text-lg text-[#c7c5bc] font-light leading-relaxed">
            Whether discussing full-stack engineering opportunities, AI application workflows, research projects, or potential collaborations — my inbox is always open.
          </p>

          {/* Email Copy Card */}
          <div className="p-6 rounded-xl bg-[#0f0f14] border border-[#20202a] space-y-4">
            <span className="text-xs font-mono text-[#716f68] uppercase block">
              Direct Contact Email
            </span>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <a
                href={`mailto:${emailAddress}`}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="font-mono text-sm sm:text-base text-[#f4f3ef] hover:text-[#d4a373] transition-colors truncate"
              >
                {emailAddress}
              </a>

              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-3.5 py-1.5 rounded-lg bg-[#181822] hover:bg-[#232330] border border-[#282836] text-xs font-mono text-[#d4a373] flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                    <span className="text-[#22c55e]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#716f68] uppercase block">
              Professional Profiles
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0f0f14] border border-[#1f1f28] hover:border-[#333342] text-[#f4f3ef] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-[#d4a373]" />
                  <div>
                    <span className="text-sm font-medium block">GitHub</span>
                    <span className="text-[11px] font-mono text-[#716f68]">@captaymaa</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#716f68] group-hover:text-[#f4f3ef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="flex items-center justify-between p-4 rounded-xl bg-[#0f0f14] border border-[#1f1f28] hover:border-[#333342] text-[#f4f3ef] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-[#d4a373]" />
                  <div>
                    <span className="text-sm font-medium block">LinkedIn</span>
                    <span className="text-[11px] font-mono text-[#716f68]">Aima Saleheen</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#716f68] group-hover:text-[#f4f3ef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7 bg-[#0f0f14] border border-[#1f1f28] rounded-2xl p-8 sm:p-10">
          <div className="flex items-center justify-between border-b border-[#1c1c24] pb-4 mb-6">
            <h3 className="font-display font-semibold text-xl text-[#f4f3ef] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#d4a373]" />
              Send a Message
            </h3>
            <span className="text-xs font-mono text-[#716f68]">Direct Inquiries</span>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-xl text-[#f4f3ef]">
                Thank you for reaching out!
              </h4>
              <p className="text-sm text-[#a3a199] max-w-md mx-auto">
                Your message has been captured. Aima will review and get back to you at{' '}
                <span className="text-[#f4f3ef]">{formData.email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setFormSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-4 py-2 rounded-lg bg-[#181822] text-xs font-mono text-[#d4a373]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8e8d88] uppercase block mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-lg bg-[#14141a] border border-[#252530] text-sm text-[#f4f3ef] placeholder-[#555450] focus:border-[#d4a373] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8e8d88] uppercase block mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-[#14141a] border border-[#252530] text-sm text-[#f4f3ef] placeholder-[#555450] focus:border-[#d4a373] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8e8d88] uppercase block mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Project Collaboration / Engineering Role"
                  className="w-full px-4 py-3 rounded-lg bg-[#14141a] border border-[#252530] text-sm text-[#f4f3ef] placeholder-[#555450] focus:border-[#d4a373] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8e8d88] uppercase block mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the project, opportunity, or inquiry..."
                  className="w-full px-4 py-3 rounded-lg bg-[#14141a] border border-[#252530] text-sm text-[#f4f3ef] placeholder-[#555450] focus:border-[#d4a373] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => onCursorChange('interactive')}
                onMouseLeave={() => onCursorChange('default')}
                className="w-full py-3.5 rounded-lg bg-[#f4f3ef] hover:bg-[#e2e0d8] text-[#09090b] font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
