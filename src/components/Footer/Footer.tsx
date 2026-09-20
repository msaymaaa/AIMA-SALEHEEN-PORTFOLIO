import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
}

export function Footer({ onNavigateSection, onCursorChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 sm:px-8 max-w-7xl mx-auto text-xs font-mono text-[#716f68]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-[#1c1c24] pb-12 mb-8">
        <div>
          <span className="font-display font-bold text-xl text-[#f4f3ef] tracking-tight block mb-1">
            AIMA SALEHEEN
          </span>
          <p className="text-[#a3a199]">
            Software Engineering • Pak-Austria Fachhochschule (PAF-IAST)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[#a3a199]">
          <a
            href="https://github.com/captaymaa"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="hover:text-[#f4f3ef] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/aima-saleheen"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="hover:text-[#f4f3ef] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:captaymaa@gmail.com"
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="hover:text-[#f4f3ef] transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => onCursorChange('interactive')}
            onMouseLeave={() => onCursorChange('default')}
            className="hover:text-[#f4f3ef] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131318] border border-[#22222a]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#666560]">
        <div>
          © {currentYear} Aima Saleheen. Crafted with intentional typography, motion, and precision.
        </div>
        <div className="flex items-center gap-4">
          <span>Haripur, Pakistan</span>
          <span>•</span>
          <span className="text-[#a3a199]">Austrian Applied Pedagogy</span>
        </div>
      </div>
    </footer>
  );
}
