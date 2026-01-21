import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Package, User, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch orders safely, handle case where table might not exist yet or error
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (ordersError && ordersError.code !== 'PGRST116') {
    console.error('Error fetching orders:', ordersError);
  }

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="py-12 border-b border-white/5 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2">My Account</h1>
            <p className="text-white/50">Welcome back, {user.email}</p>
          </div>
          <form action="/auth/signout" method="post">
            <button className="flex items-center space-x-2 text-white/50 hover:text-[#D4AF37] transition-colors text-xs uppercase tracking-widest">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button className="w-full flex items-center space-x-4 p-4 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest">
              <Package size={18} />
              <span>Orders</span>
            </button>
            <button className="w-full flex items-center space-x-4 p-4 text-white/50 hover:bg-white/5 font-bold text-xs uppercase tracking-widest transition-colors">
              <User size={18} />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center space-x-4 p-4 text-white/50 hover:bg-white/5 font-bold text-xs uppercase tracking-widest transition-colors">
              <MapPin size={18} />
              <span>Addresses</span>
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-serif text-white mb-8">Order History</h2>
            
            {orders && orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#171717] border border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-white/30">Order ID: {order.id.slice(0, 8)}</p>
                      <p className="text-white font-medium">₹{order.total_amount.toLocaleString()}</p>
                      <p className="text-white/50 text-xs">{new Date(order.created_at!).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {order.status}
                      </span>
                      <button className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#171717] border border-white/5">
                <p className="text-white/30 uppercase tracking-widest text-sm">You haven't placed any orders yet.</p>
                <Link href="/shop" className="inline-block mt-6 text-[#D4AF37] text-xs font-bold uppercase tracking-widest border-b border-[#D4AF37] pb-1">
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
