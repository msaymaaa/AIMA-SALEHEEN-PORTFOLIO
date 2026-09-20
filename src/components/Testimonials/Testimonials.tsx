import { MessageSquareQuote, ShieldAlert, FileText, CheckCircle, Mail } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

interface TestimonialsProps {
  onCursorChange: (type: 'default' | 'interactive' | 'project', text?: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export function Testimonials({ onCursorChange, onNavigateSection }: TestimonialsProps) {
  const hasTestimonials = testimonials && testimonials.length > 0;

  return (
    <section id="testimonials" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-[#1c1c24]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#1c1c24] pb-8">
        <div>
          <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase mb-2 block">
            07 / RECOMMENDATIONS & ENDORSEMENTS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#f4f3ef] tracking-tight">
            Peer & Mentor Testimonials.
          </h2>
        </div>
        <p className="text-sm font-mono text-[#8e8d88] max-w-md">
          Strict policy of authentic documentation — no synthetic or fabricated testimonials.
        </p>
      </div>

      {/* Render Testimonials if present, otherwise Elegant Empty State */}
      {hasTestimonials ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-xl bg-[#0f0f14] border border-[#1e1e28] flex flex-col justify-between"
            >
              <MessageSquareQuote className="w-8 h-8 text-[#d4a373] mb-4" />
              <p className="text-base text-[#c7c5bc] italic font-light mb-6">
                "{t.quote}"
              </p>
              <div>
                <h4 className="font-display font-semibold text-sm text-[#f4f3ef]">
                  {t.authorName}
                </h4>
                <p className="text-xs text-[#8e8d88]">
                  {t.authorTitle} • {t.relationship}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Editorial Empty State with Request Mechanism */
        <div
          onMouseEnter={() => onCursorChange('interactive')}
          onMouseLeave={() => onCursorChange('default')}
          className="p-8 sm:p-12 rounded-2xl bg-[#0f0f14] border border-dashed border-[#262634] text-center max-w-3xl mx-auto space-y-6"
        >
          <div className="w-12 h-12 rounded-full bg-[#171720] border border-[#2b2b38] mx-auto flex items-center justify-center text-[#d4a373]">
            <MessageSquareQuote className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-[#d4a373] tracking-widest uppercase block">
              AUTHENTIC RECORD POLICY
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f4f3ef]">
              Recommendations Available Upon Request
            </h3>
            <p className="text-sm text-[#a3a199] font-light max-w-xl mx-auto leading-relaxed">
              In upholding genuine professional integrity, synthetic testimonials are not generated.
              Academic references from PAF-IAST faculty and supervisors from NRTC UAV division or past engagements are available for formal evaluation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#14141b] border border-[#20202c] text-xs font-mono text-[#716f68] max-w-lg mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-[#a3a199]">
              <FileText className="w-4 h-4 text-[#d4a373]" />
              <span>Standard schema supported in <code className="text-[#f4f3ef]">data/testimonials.ts</code>:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1 text-[11px]">
              <li>Person's Full Name & Designation</li>
              <li>Professional Role & Academic/Work Relationship</li>
              <li>Authentic Testimonial Content & Date</li>
              <li>Explicit written permission to publish</li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigateSection('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#181822] hover:bg-[#22222e] border border-[#2a2a38] text-xs font-mono text-[#f4f3ef] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#d4a373]" />
              <span>Request Verified Professional References</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
