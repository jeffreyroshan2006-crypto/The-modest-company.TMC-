'use client';

import React, { Suspense } from 'react'; // ✅ Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client'; // ✅ Fix import
import Link from 'next/link';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

// ✅ Create a separate component for the logic that uses searchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account'; // ✅ Uses searchParams
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 p-4 flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-white/70">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#111] border border-white/10 pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-white/70">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#111] border border-white/10 pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D4AF37] text-black py-4 font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={20} />
            Signing In...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <p className="text-center text-white/50 text-sm">
        Don't have an account?{' '}
        <Link href={`/register?redirect=${redirectPath}`} className="text-[#D4AF37] hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}

// ✅ Main Page Component wraps the form in Suspense
export default function LoginPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-white mb-4">Welcome Back</h1>
          <p className="text-white/50">Sign in to access your account and orders.</p>
        </div>

        {/* ✅ Wrap with Suspense boundary */}
        <Suspense fallback={<div className="text-white text-center">Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
