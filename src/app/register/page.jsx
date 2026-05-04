"use client";

import React, { useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function RegisterContent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoUrl || undefined,
      callbackURL: `/login?callbackURL=${encodeURIComponent(callbackURL)}`,
    });

    if (authError) {
      setError(authError.message || "Registration failed. Please try again.");
      setLoading(false);
    } else {
      router.push(`/login?callbackURL=${encodeURIComponent(callbackURL)}`);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackURL,
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Mediterranean Beach Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
          alt="Beach" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 py-20">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-orange-500 tracking-tighter mb-1">SunCart</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Mediterranean Summer</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[520px] w-full bg-white/80 backdrop-blur-3xl rounded-[3rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/40"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Your Account</h1>
            <p className="text-slate-500 text-sm">Join our community for a premium shopping journey</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 ml-1">Full Name</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">person</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="Alex Rivera"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="alex@summer.com"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 ml-1">Photo URL</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">image</span>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="https://image-url.com/profile.jpg"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 ml-1">Password</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-slate-300"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-white font-bold shadow-[0_10px_30px_rgba(255,126,95,0.3)] hover:brightness-105 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-100"></div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-slate-100"></div>
          </div>

          {/* Social Signup */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl bg-slate-50/50 border border-white flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-[0.98] shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold text-slate-600">Sign up with Google</span>
          </button>

          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            Already have an account?{" "}
            <Link href={`/login?callbackURL=${encodeURIComponent(callbackURL)}`} className="text-orange-500 font-bold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 flex justify-center gap-8 border-t border-white/10">
        <Link href="#" className="text-xs font-semibold text-slate-400 hover:text-orange-500 transition-colors">Privacy Policy</Link>
        <Link href="#" className="text-xs font-semibold text-slate-400 hover:text-orange-500 transition-colors">Terms of Service</Link>
        <Link href="#" className="text-xs font-semibold text-slate-400 hover:text-orange-500 transition-colors">Contact</Link>
      </footer>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
        <div className="min-h-screen bg-orange-100 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    }>
      <RegisterContent />
    </Suspense>
  );
}
