'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('Check your email for the confirmation link.');
    }
    setLoading(false);
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

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-[#B8860B] transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>
          
          <button 
            type="button"
            onClick={handleSignUp}
            disabled={loading}
            className="w-full border border-white/10 text-white font-bold uppercase tracking-[0.2em] py-4 hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
