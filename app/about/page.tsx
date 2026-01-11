import React from 'react';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs mb-4 block">Our Story</span>
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-12">TMC – The Modest Company</h1>
        
        <div className="space-y-8 text-white/70 leading-relaxed text-lg">
          <p>
            Founded with a vision to redefine modest fashion, TMC brings you the finest "OG Imported" Hijabs, Abayas, and Pakistani Suits. We believe that modesty and luxury should go hand in hand.
          </p>
          <p>
            Our collections are curated for the modern woman who values authenticity, quality, and sophisticated styling. Every piece in our catalog is a testament to our commitment to excellence.
          </p>
          
          <div className="py-12 border-y border-white/10 my-12">
            <p className="text-white italic text-xl mb-4">
              "Modesty is the highest form of elegance."
            </p>
            <p className="text-[#D4AF37] uppercase tracking-widest text-sm font-bold">
              — @fictionally_flawless_farwah, Founder
            </p>
          </div>
          
          <p>
            Based on our successful journey on Instagram, we've built a community of thousands of happy clients who trust us for their most special occasions and everyday elegance.
          </p>
        </div>
      </section>
    </div>
  );
}
