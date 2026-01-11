'use client';

import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ayesha R.",
    text: "The quality of the OG imported hijabs is unmatched. Truly luxury modest wear.",
    rating: 5
  },
  {
    id: 2,
    name: "Zainab K.",
    text: "My Pakistani suit arrived perfectly tailored. TMC is my go-to for every occasion.",
    rating: 5
  },
  {
    id: 3,
    name: "Mariam S.",
    text: "The Abayas are so elegant and the fabric feels premium. Highly recommend!",
    rating: 5
  }
];

const TestimonialSlider = () => {
  return (
    <section className="py-24 bg-[#111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Happy Clients</h2>
          <div className="w-24 h-px bg-[#D4AF37] mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#171717] p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-colors">
              <div className="flex mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <p className="text-white/70 italic mb-6 leading-relaxed">"{t.text}"</p>
              <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
