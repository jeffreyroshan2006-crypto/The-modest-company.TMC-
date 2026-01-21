'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const msg = searchParams.get('message');
    const err = searchParams.get('error');
    if (msg) setMessage(msg);
    if (err) setError(err);
  }, [searchParams]);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/account');
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/account');
      router.refresh();
    }
  };

  return (
    <div className="pt-20 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full bg-[#171717] p-8 md:p-12 border border-white/5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-white mb-2">Welcome Back</h1>
          <p className="text-white/50 text-sm">Sign in to your TMC account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/50">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" 
            />
          </div>

          {error && <p className="text-red-500 text-xs bg-red-500/10 p-3 border border-red-500/20">{error}</p>}
          {message && <p className="text-[#D4AF37] text-xs bg-[#D4AF37]/10 p-3 border border-[#D4AF37]/20">{message}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-[#B8860B] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#171717] px-2 text-white/30">New to TMC?</span>
            </div>
          </div>

          <Link 
            href="/signup"
            className="block w-full text-center border border-white/10 text-white font-bold uppercase tracking-[0.2em] py-4 hover:bg-white/5 transition-colors"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
