'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('orders').insert({
      user_id: user.id,
      total_amount: cartTotal,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize
      })),
      status: 'processing',
      shipping_address: { city: 'Chennai', state: 'Tamil Nadu' } // In a real app, this would come from the form
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      clearCart();
      router.push('/account');
    }
  };

  if (cart.length === 0) {
    router.push('/shop');
    return null;
  }

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-12">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-white font-serif text-xl">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="First Name" className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
                <input required placeholder="Last Name" className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <input required placeholder="Address" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="City" className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
                <input required placeholder="Postal Code" className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-5 hover:bg-[#B8860B] transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₹${cartTotal.toLocaleString()}`}
            </button>
          </form>

          <div className="bg-[#171717] p-8 border border-white/5 h-fit">
            <h3 className="text-white font-serif text-xl mb-8">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between text-xs">
                  <span className="text-white/70">{item.name} x {item.quantity}</span>
                  <span className="text-white">₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4 mb-8 pt-6 border-t border-white/5">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="text-white">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Shipping</span>
                <span className="text-white">Free</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between font-bold">
                <span className="text-white uppercase tracking-widest text-xs">Total</span>
                <span className="text-[#D4AF37]">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
