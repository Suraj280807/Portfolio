import React, { useState } from 'react';
import { Award, Star, Compass, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Chess Knight Icon
const ChessKnight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 20H5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1z" />
    <path d="M6 17c0-2 1-3 2.5-4C8.5 13 8 11.5 8 10c0-3.3 2.7-6 6-6 1.5 0 2.5.5 3 1 .5.5 1 2 1 4 0 1.5-.5 2.5-.5 2.5s1 1 1.5 2c.5 1 .5 2.5-1 3.5" />
    <circle cx="12" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

interface Achievement {
  title: string;
  category: string;
  backTitle: string;
  summaryPoints: string[];
  issuer: string;
  date: string;
  signatory: string | null;
  certUrl: string | null;
  icon: React.ReactNode;
  dotColor: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Base44 Hackathon",
    category: "CERTIFICATE OF PARTICIPATION",
    backTitle: "Base 44 Hackathon",
    summaryPoints: [
      "Participated in the intensive hackathon as part of team 'codestorm'.",
      "Successfully developed and deployed a custom software project using the Base44 platform.",
      "Demonstrated rapid problem solving and full-stack technical implementation."
    ],
    issuer: "NxtWave Institute of Advanced Technologies",
    date: "November 28, 2025",
    signatory: "Elsa Welshofer (Global Head of Education for Base44)",
    certUrl: "/cert_base44.png",
    icon: <Award className="w-8 h-8 text-amber-400" />,
    dotColor: "#fbbf24"
  },
  {
    title: "NASA Space Apps Challenge",
    category: "GALACTIC PROBLEM SOLVER",
    backTitle: "NASA Space Apps Challenge",
    summaryPoints: [
      "Honored as a Galactic Problem Solver in the NASA Space Apps global challenge.",
      "Collaborated on engineering efforts to solve complex geospatial and space challenges.",
      "Contributed to data modeling and visual interface design schemas."
    ],
    issuer: "NASA International Space Apps Challenge",
    date: "October 4-5, 2025",
    signatory: "Dr. Keith Gaddis (Program Scientist, NASA)",
    certUrl: "/cert_nasa.png",
    icon: <Compass className="w-8 h-8 text-sky-400" />,
    dotColor: "#38bdf8"
  },
  {
    title: "36-Hour Hackathon",
    category: "CERTIFICATE OF PARTICIPATION",
    backTitle: "SCE 36-Hour Hackathon",
    summaryPoints: [
      "Represented Sanjay Ghodawat University in the 36-Hour Hackathon event.",
      "Demonstrated outstanding innovation, enthusiasm, and technical excellence.",
      "Collaborated with developers for rapid prototyping, coding, and code deployment."
    ],
    issuer: "Shivalik College of Engineering",
    date: "April 16-17, 2026",
    signatory: "Associate Dean CBII, Dean Academics & Director SCE",
    certUrl: "/cert_shivalik.jpg",
    icon: <Star className="w-8 h-8 text-pink-400" />,
    dotColor: "#fb7185"
  },
  {
    title: "Chess Championship Runner-Up",
    category: "SCHOOL CHAMPIONSHIP",
    backTitle: "♟️ Chess Championship",
    summaryPoints: [
      "Secured second place in the school-wide chess tournament.",
      "Developed advanced strategic planning and pattern recognition capabilities.",
      "Applied tactical decision-making and cognitive focus under strict time controls."
    ],
    issuer: "School Chess Association",
    date: "Annual Tournament",
    signatory: null,
    certUrl: null,
    icon: <ChessKnight className="w-8 h-8 text-white/90" />,
    dotColor: "#ffffff"
  }
];

export const FlipCard: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  // Shivalik cert is stored portrait but is actually landscape — rotate 90°
  const isRotated = selectedCert?.includes('cert_shivalik');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4 relative">
      {ACHIEVEMENTS.map((ach, idx) => {
        const isFlipped = flippedIndex === idx;
        const isChess = ach.title.includes('Chess');

        return (
          <div
            key={idx}
            className="h-[440px] cursor-pointer relative"
            style={{ perspective: '1200px' }}
            onMouseEnter={() => setFlippedIndex(idx)}
            onMouseLeave={() => setFlippedIndex(null)}
            onClick={() => setFlippedIndex(isFlipped ? null : idx)}
          >
            {/* Card Inner Wrapper */}
            <div
              className="relative w-full h-full duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front Side */}
              <div
                className="absolute inset-0 w-full h-full liquid-glass p-8 flex flex-col justify-between items-start backface-hidden overflow-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  background: isChess 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isChess && isFlipped 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow: isChess && isFlipped 
                    ? '0 8px 32px 0 rgba(255, 255, 255, 0.06)' 
                    : 'none',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Chess background silhouette */}
                {isChess && (
                  <div 
                    className="absolute right-[-10px] bottom-[-10px] w-32 h-32 pointer-events-none text-white z-0"
                    style={{ opacity: 0.03 }}
                  >
                    <ChessKnight className="w-full h-full stroke-[0.8]" />
                  </div>
                )}

                <div className="w-full flex justify-between items-start z-10">
                  <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">
                    {ach.category}
                  </span>
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                    {ach.icon}
                  </div>
                </div>

                <div className="flex flex-col gap-3 z-10 w-full">
                  <h3 className="text-2xl font-bold tracking-tight text-white/95">
                    {ach.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-white/50 group-hover:text-white transition-colors">
                    Hover or tap to inspect →
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div
                className="absolute inset-0 w-full h-full liquid-glass p-8 flex flex-col justify-between items-start backface-hidden overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: isChess 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)' 
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: isChess && isFlipped 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div className="w-full flex flex-col gap-1 shrink-0">
                  <span className="text-[9px] tracking-[0.2em] font-bold text-white/30 uppercase">
                    {ach.category}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {ach.backTitle}
                  </h4>
                </div>

                {/* Summary points list container */}
                <div className="flex flex-col gap-2.5 w-full my-3 flex-1 overflow-y-auto pr-1">
                  {ach.summaryPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3 text-[12.5px] text-white/75 font-light leading-relaxed">
                      <span 
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-2" 
                        style={{ backgroundColor: ach.dotColor }}
                      />
                      <span className="text-left">{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="w-full flex flex-col gap-1 text-[11px] text-white/50 border-t border-white/5 pt-3">
                  <div>
                    <strong className="text-white/60">Issued by:</strong> {ach.issuer}
                  </div>
                  <div>
                    <strong className="text-white/60">Date:</strong> {ach.date}
                  </div>
                  {ach.signatory && (
                    <div className="truncate" title={ach.signatory}>
                      <strong className="text-white/60">Signatory:</strong> {ach.signatory}
                    </div>
                  )}
                </div>

                {ach.certUrl ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(ach.certUrl);
                    }}
                    className="w-full mt-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/95 active:scale-95 transition-all text-center flex items-center justify-center gap-1 cursor-pointer pointer-events-auto shadow-md"
                  >
                    View Certificate
                  </button>
                ) : (
                  <div className="w-full mt-4 py-2.5 rounded-xl bg-white/5 text-white/40 text-xs font-semibold text-center border border-white/5 cursor-default select-none">
                    No Digital Copy
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Modal for viewing certificates */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-5xl max-h-[85vh] bg-black/40 border border-white/10 rounded-2xl p-2 shadow-2xl flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Certificate Image */}
              <img
                src={selectedCert}
                alt="Certificate"
                className="object-contain rounded-lg shadow-inner"
                style={isRotated ? {
                  transform: 'rotate(-90deg)',
                  maxWidth: '80vh',
                  maxHeight: '80vw',
                  width: 'auto',
                  height: 'auto',
                } : {
                  maxWidth: '100%',
                  maxHeight: '80vh',
                }}
              />

              {/* Open in new tab / download option */}
              <a
                href={selectedCert}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/15 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-semibold text-white backdrop-blur-md active:scale-95 transition-all flex items-center gap-1.5 shadow-lg"
              >
                <ExternalLink size={13} />
                Open Original in New Tab
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
