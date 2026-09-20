import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

interface HeroProps {
  onCursorChange: (type: 'default' | 'interactive', text?: string) => void;
}

export function Hero({ onCursorChange }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [currentTimePKT, setCurrentTimePKT] = useState('');
  const emailAddress = 'captaymaa@gmail.com';

  useEffect(() => {
    const updateTime = () => {
      try {
        const pkt = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setCurrentTimePKT(`${pkt} PKT`);
      } catch {
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
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none z-10"
    >
      {/* Top Subtle Perimeter Chrome */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex items-center justify-between text-[11px] sm:text-xs font-mono text-[#8a8880] tracking-wider"
      >
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
          <span className="text-[#c5c3bc] font-medium">PAF-IAST</span>
          <span className="text-[#3f3e39] hidden sm:inline">/</span>
          <span className="hidden sm:inline text-[#8a8880]">UNDERGRADUATE</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-[#8a8880] hidden md:inline">{currentTimePKT}</span>
          <div className="flex items-center gap-2 text-[#b5b3aa]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a373] animate-pulse" />
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-[#d4a373]">
              AVAILABLE FOR COLLABORATION
            </span>
          </div>
        </div>
      </motion.header>

      {/* Center Dominant Editorial Identity */}
      <div className="my-auto py-8 max-w-5xl">
        {/* Dominant Name Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="group font-display font-extrabold text-[3.25rem] xs:text-[3.75rem] sm:text-7xl md:text-8xl lg:text-[7.25rem] xl:text-[8rem] tracking-tight leading-[0.92] text-[#f4f3ef] mb-6 transition-colors duration-300"
          >
            <span className="inline-block relative">
              AIMA
            </span>{' '}
            <br className="sm:hidden" />
            <span className="inline-block relative text-[#f4f3ef]">
              SALEHEEN
              <span className="text-[#d4a373] font-mono font-light ml-1 inline-block">.</span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle: SOFTWARE ENGINEERING STUDENT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-6 sm:w-10 bg-[#d4a373]/60" />
            <h2 className="font-mono text-xs sm:text-sm md:text-base tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#d4a373] font-medium">
              SOFTWARE ENGINEERING STUDENT
            </h2>
          </div>

          {/* Short supporting line beneath, kept visually secondary */}
          <p className="text-sm sm:text-base md:text-lg text-[#9e9c93] max-w-xl font-light leading-relaxed pl-9 sm:pl-13">
            Designing systems, intelligent interfaces, and software architectures with mathematical precision and digital craftsmanship.
          </p>
        </motion.div>
      </div>

      {/* Bottom Subtle Perimeter Metadata & Contact Action */}
      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#1c1c24]/80 text-[11px] sm:text-xs font-mono text-[#76746d]"
      >
        <div className="flex items-center gap-6">
          <span className="text-[#9e9c93]">HARIPUR, PAKISTAN</span>
          <span className="text-[#3f3e39]">•</span>
          <span className="text-[#9e9c93]">AUSTRIAN APPLIED PEDAGOGY</span>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          {/* Email Copy Trigger */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#121217] hover:bg-[#1a1a22] border border-[#24242e] text-[#c5c3bc] hover:text-[#f4f3ef] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-[#22c55e]">Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#d4a373]" />
                <span>{emailAddress}</span>
              </>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/captaymaa"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="flex items-center gap-1.5 text-[#9e9c93] hover:text-[#f4f3ef] transition-colors py-1.5"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3 text-[#d4a373]" />
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
