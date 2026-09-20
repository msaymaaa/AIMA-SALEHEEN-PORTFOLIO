import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

interface SplashScreenProps {
  onEnter: () => void;
  onCursorChange: (type: 'default' | 'interactive') => void;
}

export function SplashScreen({ onEnter, onCursorChange }: SplashScreenProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      try {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setCurrentTime(`${time} PKT`);
      } catch {
        setCurrentTime('UTC+5');
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen for Spacebar or Enter to enter workspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none bg-[#050508]/90 backdrop-blur-sm cursor-pointer"
      onClick={onEnter}
    >
      {/* Top Status Perimeter */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="w-full flex items-center justify-between text-xs font-mono text-slate-400"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="tracking-widest uppercase text-slate-300">SYSTEM.INITIALIZE</span>
          <span className="text-slate-600">//</span>
          <span className="text-slate-500 hidden sm:inline">33.99° N, 72.93° E</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden sm:inline">{currentTime}</span>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-sky-950/40 border border-sky-500/30 text-sky-300 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>PORTFOLIO OS v2.6</span>
          </div>
        </div>
      </motion.div>

      {/* Center Dominant Hollow / Outline Typography */}
      <div className="my-auto text-center flex flex-col items-center justify-center max-w-5xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-6"
        >
          {/* Subtle electric blue ambient glow behind outline */}
          <div className="absolute inset-0 blur-3xl bg-sky-500/15 pointer-events-none -z-10 rounded-full" />

          {/* Centered, bold, hollow/outline typography */}
          <h1
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-outline select-none transition-all duration-300 hover:text-sky-300/10 cursor-pointer"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.85)',
              letterSpacing: '-0.03em',
            }}
          >
            AIMA SALEHEEN
          </h1>
        </motion.div>

        {/* Subtitle & Focus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono tracking-[0.25em] text-sky-400 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
            <span>Software Engineering Undergraduate</span>
          </div>

          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
            Hands-on industry experience spanning cybersecurity vulnerability assessment, UAV avionics telemetry, full-stack engineering, and business development.
          </p>
        </motion.div>

        {/* Interactive Click-Through Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-10"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 hover:border-sky-400 text-sky-300 hover:text-white font-mono text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
          >
            <span>ENTER WORKSPACE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            <span className="text-[10px] text-sky-400/60 hidden sm:inline ml-2 border-l border-sky-500/30 pl-3">
              PRESS SPACE
            </span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle Coordinates & Pedagogy */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2 border-t border-white/5 pt-4"
      >
        <div className="flex items-center gap-3">
          <span>PAK-AUSTRIA FACHHOCHSCHULE (PAF-IAST)</span>
          <span>•</span>
          <span className="text-slate-400">DUAL-PEDAGOGY DEGREE</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span>CLICK ANYWHERE TO ENTER</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
