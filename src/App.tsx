/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <div className="min-h-screen text-slate-50 selection:bg-brand-purple/30 selection:text-white bg-slate-950 overflow-x-clip">
      {/* Sleek static gradient background instead of heavy images */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
}
