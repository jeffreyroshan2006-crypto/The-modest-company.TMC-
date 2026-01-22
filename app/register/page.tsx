'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';
  const supabase = createClient();

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // 2. Redirect to account (or wherever they came from)
      // Note: In a real app, you might want to show a "Check your email" screen here
      if (data.session) {
        router.push(redirectPath);
        router.refresh();
      } else {
        // If email confirmation is enabled, session might be null
        alert('Registration successful! Please check your email to verify your account.');
        router.push('/login');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 p-4 flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-white/70">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-[#111] border border-white/10 pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            placeholder="John Doe"
          />
        </div>
      </div>

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
            minLength={6}
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
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <p className="text-center text-white/50 text-sm">
        Already have an account?{' '}
        <Link href={`/login?redirect=${redirectPath}`} className="text-[#D4AF37] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-white mb-4">Create Account</h1>
          <p className="text-white/50">Join us for an exclusive shopping experience.</p>
        </div>

        <Suspense fallback={<div className="text-white text-center">Loading form...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
