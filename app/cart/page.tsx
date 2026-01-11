'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-20 pb-24 px-6 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-4xl font-serif text-white mb-6">Your Bag is Empty</h1>
        <p className="text-white/50 mb-10">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="bg-[#D4AF37] text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-12">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-6 pb-8 border-b border-white/5">
                <div className="w-24 h-32 bg-neutral-900 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-serif text-lg">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-white/30 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[#D4AF37] text-sm mt-1">₹{item.price.toLocaleString()}</p>
                    <div className="flex gap-4 mt-2 text-[10px] uppercase tracking-widest text-white/40">
                      {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-white/50 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#171717] p-8 border border-white/5 sticky top-24">
              <h3 className="text-white font-serif text-xl mb-8">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span className="text-white">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Shipping</span>
                  <span className="text-white">Calculated at checkout</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between font-bold">
                  <span className="text-white uppercase tracking-widest text-xs">Estimated Total</span>
                  <span className="text-[#D4AF37]">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout" className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-5 flex items-center justify-center space-x-3 hover:bg-[#B8860B] transition-colors">
                <span>Checkout</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
