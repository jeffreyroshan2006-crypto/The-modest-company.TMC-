'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // If auto-confirm is on, they might be logged in, but user requested redirect to login
      setTimeout(() => {
        router.push('/login?message=Check your email to confirm your account.');
      }, 3000);
    }
  };

  return (
    <div className="pt-20 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full bg-[#171717] p-8 md:p-12 border border-white/5">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-white mb-2">Create Account</h1>
          <p className="text-white/50 text-sm">Join the TMC community</p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm">
              Account created successfully! Please check your email for a confirmation link.
            </div>
            <p className="text-white/50 text-xs">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-6">
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
                minLength={6}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]" 
              />
            </div>

            {error && <p className="text-red-500 text-xs bg-red-500/10 p-3 border border-red-500/20">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] py-4 hover:bg-[#B8860B] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
            
            <p className="text-center text-white/40 text-xs">
              Already have an account?{' '}
              <Link href="/login" className="text-[#D4AF37] hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
