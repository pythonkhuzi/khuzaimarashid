import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    if (!name || !email || !message) return;

    // 1. Format text for WhatsApp
    const whatsappText = `Hello Khuzaima!%0A%0AMy name is ${encodeURIComponent(name)}.%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/923072480246?text=${whatsappText}`;
    
    // 2. Format text for Email
    const mailtoSubject = encodeURIComponent(`New Portfolio Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:khuzaimarashid5511@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Open default Email client in the current window
    window.location.href = mailtoUrl;

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In <span className="text-brand-blue">Touch</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Ready to start your next project? Reach out and let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass p-6 rounded-2xl flex items-center gap-4 glass-hover">
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Call Me</p>
                <a href="tel:03072480246" className="text-lg font-bold hover:text-brand-blue transition-colors">03072480246</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-center gap-4 glass-hover">
              <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Email Me</p>
                <a href="mailto:khuzaimarashid5511@gmail.com" className="text-lg font-bold hover:text-brand-purple transition-colors truncate">khuzaimarashid5511@gmail.com</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-center gap-4 glass-hover">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">WhatsApp</p>
                <a href="https://wa.me/923072480246" target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-[#25D366] transition-colors">Chat on WhatsApp</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-center gap-4 glass-hover">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-slate-300" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Location</p>
                <p className="text-lg font-bold">Hasilpur, Punjab, Pakistan</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="glass p-8 rounded-2xl space-y-6" onSubmit={handleSubmit}>
              <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold rounded-xl px-6 py-3.5 hover:opacity-90 hover:scale-[0.98] transition-all"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
