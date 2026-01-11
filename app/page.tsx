import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import TestimonialSlider from '@/components/TestimonialSlider';

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1920" 
            alt="Luxury Modest Wear" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0A0A0A]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-[#D4AF37] uppercase tracking-[0.5em] text-xs mb-6 block animate-fade-in">
            The OG Imported Collection
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight animate-slide-up">
            Redefining <br /> <span className="italic">Modest Luxury</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
            Experience the finest Hijabs, Abayas, and Pakistani Suits curated for the sophisticated woman.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/shop" 
              className="bg-[#D4AF37] text-black px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#B8860B] transition-all duration-300 w-full sm:w-auto"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="border border-white/20 text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Hijabs', slug: 'hijabs', img: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800' },
              { name: 'Abayas', slug: 'abayas', img: 'https://images.unsplash.com/photo-1564113808230-e8b2e544aa0e?q=80&w=800' },
              { name: 'Pakistani Suits', slug: 'pakistani-suits', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800' },
            ].map((cat) => (
              <Link key={cat.slug} href={`/category/${cat.slug}`} className="group relative aspect-[4/5] overflow-hidden">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-3xl font-serif mb-4">{cat.name}</h3>
                  <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] border-b border-[#D4AF37] pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">New Arrivals</h2>
              <p className="text-white/50">The latest additions to our premium catalog.</p>
            </div>
            <Link href="/shop" className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest group">
              <span>View All Products</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <div className="flex justify-center text-[#D4AF37]"><Truck size={32} /></div>
            <h4 className="text-white font-serif text-xl">Pan-India Shipping</h4>
            <p className="text-white/50 text-sm">Fast and secure delivery across all states in India.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center text-[#D4AF37]"><ShieldCheck size={32} /></div>
            <h4 className="text-white font-serif text-xl">OG Imported Quality</h4>
            <p className="text-white/50 text-sm">Authentic fabrics sourced directly from premium manufacturers.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex justify-center text-[#D4AF37]"><RefreshCw size={32} /></div>
            <h4 className="text-white font-serif text-xl">Easy Exchange</h4>
            <p className="text-white/50 text-sm">Hassle-free exchange policy for your peace of mind.</p>
          </div>
        </div>
      </section>

      <TestimonialSlider />
    </div>
  );
}
