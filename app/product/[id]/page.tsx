'use client';

import React, { useState, use } from 'react';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ShoppingBag, Heart, MessageCircle, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);
  const { addToCart, toggleWishlist, wishlist } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.variants.color?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.variants.size?.[0]);

  if (!product) notFound();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-white/40 mb-12">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link href={`/category/${product.category}`} className="hover:text-white transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-neutral-900 overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="aspect-square bg-neutral-900 cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                {product.isNew ? 'New Arrival' : 'Premium Collection'}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">{product.name}</h1>
              <p className="text-2xl text-white font-light">₹{product.price.toLocaleString()}</p>
            </div>

            <div className="prose prose-invert mb-12">
              <p className="text-white/60 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-8 mb-12">
              {product.variants.color && (
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Select Color</label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.color.map(c => (
                      <button 
                        key={c} 
                        onClick={() => setSelectedColor(c)}
                        className={cn(
                          "px-6 py-2 border text-xs uppercase tracking-widest transition-colors",
                          selectedColor === c ? "border-[#D4AF37] text-[#D4AF37]" : "border-white/10 text-white hover:border-[#D4AF37]"
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {product.variants.size && (
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-white/50">Select Size</label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.size.map(s => (
                      <button 
                        key={s} 
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "w-12 h-12 border flex items-center justify-center text-xs transition-colors",
                          selectedSize === s ? "border-[#D4AF37] text-[#D4AF37]" : "border-white/10 text-white hover:border-[#D4AF37]"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => addToCart(product, 1, selectedColor, selectedSize)}
                className="flex-1 bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-5 flex items-center justify-center space-x-3 hover:bg-[#B8860B] transition-colors"
              >
                <ShoppingBag size={20} />
                <span>Add to Bag</span>
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "px-8 py-5 border transition-colors",
                  isWishlisted ? "border-[#D4AF37] text-[#D4AF37]" : "border-white/10 text-white hover:border-white"
                )}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-white/5">
              <div className="flex items-center space-x-4">
                <Truck className="text-[#D4AF37]" size={24} />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest">Fast Shipping</h4>
                  <p className="text-white/40 text-[10px]">Pan-India delivery in 5-7 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ShieldCheck className="text-[#D4AF37]" size={24} />
                <div>
                  <h4 className="text-white text-xs font-bold uppercase tracking-widest">Secure Payment</h4>
                  <p className="text-white/40 text-[10px]">100% safe checkout process</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Inquiry */}
            <a 
              href={`https://wa.me/918939075553?text=Hi TMC! I'm interested in the ${product.name}.`}
              target="_blank"
              className="mt-8 flex items-center justify-center space-x-2 text-white/50 hover:text-[#25D366] transition-colors text-xs uppercase tracking-widest"
            >
              <MessageCircle size={18} />
              <span>Inquire about this product</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
