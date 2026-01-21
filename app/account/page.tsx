'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LogOut, Package, User } from 'lucide-react';

// ✅ Fix 1: Define the Interface for an Order
interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/login');
          return;
        }
        
        setUserEmail(user.email || null);
        
        // Fetch orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) {
          setOrders(data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error checking user:', err);
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif text-white">My Account</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors text-sm uppercase tracking-wider"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid gap-8">
          {/* Profile Section */}
          <div className="bg-[#111] p-8 border border-white/5">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37]">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl text-white font-serif">Profile Details</h2>
                <p className="text-white/50 text-sm">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-[#111] p-8 border border-white/5">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                <Package size={24} />
              </div>
              <h2 className="text-xl text-white font-serif">Order History</h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10">
                <p className="text-white/50 mb-4">No orders found</p>
                <button 
                  onClick={() => router.push('/shop')}
                  className="text-[#D4AF37] text-sm uppercase tracking-widest hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#171717] border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-white/30">
                        Order ID: {order.id.slice(0, 8)}
                      </p>
                      <p className="text-white font-medium">
                        ₹{order.total_amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-widest border ${
                        order.status === 'delivered' 
                          ? 'border-green-500/30 text-green-400' 
                          : 'border-yellow-500/30 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                      <span className="text-white/30 text-xs">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
