import { useEffect, useState, SVGProps } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download, Terminal } from 'lucide-react';

const TYPING_TEXTS = [
  "Web Developer",
  "Frontend Developer",
  "AI Enthusiast"
];

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = TYPING_TEXTS[textIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, textIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-blue/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-brand-purple/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pb-12 lg:pb-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-sm font-medium text-brand-blue mb-2 lg:mb-4 border-brand-blue/30">
              <Terminal className="w-4 h-4" />
              <span>Available for new projects</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight">
              Hi, I'm <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                Muhammad Khuzaima Rashid
              </span>
            </h1>
            
            <div className="h-12 flex items-center justify-center lg:justify-start text-xl lg:text-2xl font-medium text-slate-300">
              <span className="mr-2">I am a</span>
              <span className="text-white relative">
                {currentText}
                <span className="absolute -right-1 top-0 h-full w-[2px] bg-brand-blue animate-pulse"></span>
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed px-4 lg:px-0">
              Building modern, fast, and visually stunning websites that help businesses grow online.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold hover:shadow-lg hover:shadow-brand-blue/25 transition-all group"
              >
                Contact Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold hover:bg-white/10 transition-colors"
              >
                Download CV
                <Download className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[260px] sm:max-w-sm md:max-w-md mx-auto mt-8 lg:mt-0"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative elements behind image */}
              <div className="absolute inset-0 rounded-full border border-white/10 scale-105 animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full border border-brand-blue/30 scale-110 animate-[spin_40s_linear_infinite_reverse]"></div>
              
              <div className="absolute inset-0 rounded-full overflow-hidden glass p-2">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center overflow-hidden relative">
                  <img src="/profile.jpg" alt="Muhammad Khuzaima Rashid" className="w-full h-full object-cover relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 mix-blend-overlay z-20 pointer-events-none"></div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 sm:top-10 -left-4 sm:-left-10 glass px-3 sm:px-4 py-2 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 z-30"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#E34F26]/20 flex items-center justify-center">
                  <div className="text-[#E34F26] font-bold text-[10px] sm:text-xs">HTML</div>
                </div>
                <div className="text-xs sm:text-sm font-semibold">Web Dev</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-4 sm:bottom-10 -right-4 sm:-right-10 glass px-3 sm:px-4 py-2 sm:py-3 rounded-2xl flex items-center gap-2 sm:gap-3 z-30"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
                  <div className="text-[#38BDF8] font-bold text-[10px] sm:text-xs">TW</div>
                </div>
                <div className="text-xs sm:text-sm font-semibold">Tailwind</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Code2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
