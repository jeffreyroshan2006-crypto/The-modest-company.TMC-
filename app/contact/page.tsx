import React from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">Get in Touch</h1>
            <p className="text-white/60 mb-12 max-w-md">
              Have a question about our collections or need styling advice? Our team is here to help you.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">WhatsApp Enquiry</h4>
                  <p className="text-white/70">+91 89390 75553</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">Operational Hours</h4>
                  <p className="text-white/70">11:00 AM – 8:00 PM (IST)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#D4AF37]/10 p-3 rounded-lg text-[#D4AF37]">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">Email</h4>
                  <p className="text-white/70">hello@themodestcompany.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#171717] p-8 md:p-12 border border-white/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Subject</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Message</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"></textarea>
              </div>
              <button className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-[#B8860B] transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
