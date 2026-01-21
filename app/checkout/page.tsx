'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('Please login to place an order');
        router.push('/login?redirect=/checkout');
        return;
      }

      // Create order in Supabase
      // Using "as any" to bypass strict type check for build
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
        status: 'pending',
        shipping_address: formData
      } as any);

      if (error) throw error;

      // Success
      clearCart();
      router.push('/checkout/success');
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-serif text-white mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-[#D4AF37] hover:underline uppercase tracking-widest text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <Link href="/cart" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <h1 className="text-3xl font-serif text-white mb-8">Shipping Details</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70">PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-[#111] border border-white/10 p-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] text-black py-4 font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-[#111] p-8 border border-white/5 h-fit">
            <h2 className="text-xl font-serif text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                  <div className="text-white/70">
                    <span className="text-white">{item.quantity}x</span> {item.name}
                    <div className="text-xs text-white/30 ml-5">
                      {item.selectedSize} / {item.selectedColor}
                    </div>
                  </div>
                  <div className="text-white">₹{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-[#D4AF37] font-bold text-lg pt-2 border-t border-white/10 mt-2">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

