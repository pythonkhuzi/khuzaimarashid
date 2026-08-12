import { motion } from 'motion/react';
import { User, MapPin, Mail, Calendar } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-brand-blue">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl glass overflow-hidden relative group">
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <User className="w-24 h-24 text-slate-600" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">2+</div>
              <div className="text-sm font-medium text-slate-300 mt-1">Years of<br/>Experience</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Turning Ideas Into Digital Reality</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Hi, I'm Muhammad Khuzaima Rashid, a passionate Web Developer from Hasilpur, Pakistan. I specialize in creating modern, responsive, and user-friendly websites using the latest web technologies. I enjoy turning ideas into beautiful digital experiences and helping businesses establish a strong online presence.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 rounded-xl glass-hover glass">
                <User className="w-5 h-5 text-brand-purple" />
                <div>
                  <div className="text-xs text-slate-400">Name</div>
                  <div className="font-medium text-sm">M. Khuzaima Rashid</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl glass-hover glass">
                <MapPin className="w-5 h-5 text-brand-purple" />
                <div>
                  <div className="text-xs text-slate-400">Location</div>
                  <div className="font-medium text-sm">Hasilpur, Pakistan</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl glass-hover glass">
                <Mail className="w-5 h-5 text-brand-purple" />
                <div>
                  <div className="text-xs text-slate-400">Email</div>
                  <div className="font-medium text-sm">khuzaima...5511@</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl glass-hover glass">
                <Calendar className="w-5 h-5 text-brand-purple" />
                <div>
                  <div className="text-xs text-slate-400">Availability</div>
                  <div className="font-medium text-sm">Freelance / Full-time</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
