"use client";

import React, { useState, Suspense, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets9.lottiefiles.com/packages/lf20_yr6zz3wv.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Error loading animation:", err));
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callbackURL") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackURL,
    });

    if (authError) {
      setError(authError.message || "Login failed. Please check your credentials.");
      setLoading(false);
    } else {
      router.push(callbackURL);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackURL,
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-[#F7941D] overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#FFB75E] opacity-50 blur-[100px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#ED1C24] opacity-20 blur-[120px]"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#FFD200] opacity-30 blur-[80px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-orange-600/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10 px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[480px] w-full bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-12 shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-white/40"
        >
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24">
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              </div>
            </div>
            <h2 className="text-4xl font-black text-orange-500 tracking-tighter mb-2">SunCart</h2>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome Back</h1>
            <p className="text-slate-500 text-sm">Step back into the warmth of summer.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm border border-red-100 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#FFF9F2]/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-orange-200"
                  placeholder="hello@summer.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-[11px] font-bold text-orange-500 hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">lock</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-[#FFF9F2]/50 border border-white focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-slate-700 placeholder:text-orange-200"
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
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl bg-white border border-slate-100 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold text-slate-600">Login with Google</span>
          </button>

          <p className="text-center mt-10 text-slate-500 text-sm font-medium">
            Don't have an account?{" "}
            <Link href={`/register?callbackURL=${encodeURIComponent(callbackURL)}`} className="text-orange-500 font-bold hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Login Footer */}
      <footer className="relative z-10 w-full px-12 py-8 flex flex-col md:flex-row justify-between items-center bg-white/90 backdrop-blur-md border-t border-white/20">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-black text-orange-500 tracking-tighter">SunCart</h3>
          <p className="text-[11px] text-slate-400 mt-1">© 2024 SunCart Mediterranean Summer. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-orange-500 transition-colors">Privacy Policy</Link>
          <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-orange-500 transition-colors">Terms of Service</Link>
          <Link href="#" className="text-xs font-semibold text-slate-500 hover:text-orange-500 transition-colors">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F7941D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
