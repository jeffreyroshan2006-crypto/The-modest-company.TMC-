'use client';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <CheckCircle size={64} className="text-[#D4AF37]" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-white/70 text-lg mb-2">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        
        <p className="text-white/50 mb-8">
          We'll send you an email with order details and tracking information soon.
        </p>
        
        <div className="bg-[#111] border border-white/10 p-8 mb-12">
          <p className="text-white/70 mb-2">Order processing...</p>
          <p className="text-2xl font-serif text-[#D4AF37]">Your order is being prepared for shipment</p>
          <p className="text-white/50 text-sm mt-4">Typically ships within 2-3 business days</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/shop" 
            className="bg-[#D4AF37] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight size={18} className="ml-3" />
          </Link>
          
          <Link 
            href="/" 
            className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
