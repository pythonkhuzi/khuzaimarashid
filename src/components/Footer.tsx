import { Code2, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center gap-2 mb-6 group">
            <div className="p-2 bg-gradient-to-br from-brand-blue to-brand-purple rounded-xl group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Khuzaima<span className="text-brand-blue">.</span></span>
          </a>
          
          <h3 className="text-xl font-medium text-slate-300 mb-8 italic">
            "Crafting Digital Experiences with Code"
          </h3>

          <div className="flex gap-4 mb-12">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group">
              <Github className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group">
              <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all group">
              <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            Copyright © {currentYear} Muhammad Khuzaima Rashid. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
