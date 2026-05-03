"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setName(session.user.name);
      setImage(session.user.image || "");
    }
  }, [session]);

  if (isPending) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4FAFD]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      alert(error.message || "Failed to update profile");
      setLoading(false);
    } else {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#F4FAFD] font-['Plus_Jakarta_Sans']">
      <Navbar />

      <div className="pt-48 pb-32 px-8 flex flex-col items-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-orange-100/30 to-transparent -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
        >
            <div className="bg-white/40 backdrop-blur-3xl p-12 md:p-16 rounded-[4rem] border border-white/40 shadow-[0_32px_120px_rgba(0,0,0,0.06)]">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-4">Update Information</h1>
                    <p className="text-slate-500 font-bold">Personalize your SunCart experience</p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-8">
                    <div className="space-y-3">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-8 py-5 rounded-[2rem] bg-white/60 border border-white/80 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-slate-700 text-lg"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Profile Image URL</label>
                        <input
                            type="url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="w-full px-8 py-5 rounded-[2rem] bg-white/60 border border-white/80 focus:border-orange-300 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all font-bold text-slate-700 text-lg"
                            placeholder="https://images.unsplash.com/your-photo"
                        />
                        <p className="text-[10px] text-slate-400 font-bold ml-2 italic">Provide a link to your profile picture (JPG, PNG, WebP)</p>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-5 rounded-full bg-gradient-to-r from-[#FF6D42] to-[#FF9B7B] text-white font-black text-lg shadow-[0_20px_50px_rgba(255,109,66,0.25)] hover:shadow-[0_20px_50px_rgba(255,109,66,0.35)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50 disabled:translate-y-0"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Updating...
                                </span>
                            ) : "Update Information"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-10 py-5 rounded-full bg-white/40 border border-white/80 text-slate-500 font-black text-lg hover:bg-white/60 active:scale-95 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
