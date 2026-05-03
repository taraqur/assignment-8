"use client";

import React, { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="min-h-screen bg-[#F8FCFF] font-['Plus_Jakarta_Sans']">
      <Navbar />

      <div className="pt-32 pb-32 px-8 max-w-7xl mx-auto relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-40 -left-20 w-96 h-96 bg-orange-100/40 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px] -z-10"></div>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-10 px-4">
          <Link href="/profile" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors">Account</Link>
          <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Edit Profile</span>
        </nav>

        {/* Main Card */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-3xl rounded-[4rem] border border-white p-8 md:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.04)] mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Avatar Section */}
            <div className="flex flex-col items-center text-center lg:border-r border-slate-100 lg:pr-24">
              <div className="relative group mb-10">
                <div className="w-56 h-56 rounded-full p-2 bg-gradient-to-tr from-orange-400 to-orange-100 shadow-2xl">
                  <div className="w-full h-full rounded-full border-8 border-white overflow-hidden bg-slate-50 relative">
                    {image ? (
                      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-7xl font-black text-orange-200 uppercase">
                        {name[0]}
                      </div>
                    )}
                  </div>
                </div>
                {/* Camera Trigger */}
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={triggerFileSelect}
                  className="absolute bottom-4 right-4 w-14 h-14 bg-[#FF6D42] rounded-2xl shadow-[0_12px_24px_rgba(255,109,66,0.3)] flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group/cam"
                >
                  <span className="material-symbols-outlined text-2xl group-hover/cam:rotate-12 transition-transform">photo_camera</span>
                </button>
              </div>

              <h2 className="text-2xl font-black text-slate-800 mb-3">Your Avatar</h2>
              <p className="text-slate-500 font-medium text-sm max-w-[240px] leading-relaxed">
                Click the camera icon to browse and upload a new profile photo.
              </p>
            </div>

            {/* Right: Form Section */}
            <div>
              <div className="mb-12">
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">Profile Details</h1>
                <p className="text-slate-400 font-bold text-sm">Update your personal information below.</p>
              </div>

              <form onSubmit={handleUpdate} className="space-y-10">
                {/* Full Name */}
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">person</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-8 focus:ring-orange-500/5 outline-none transition-all font-bold text-slate-700"
                      placeholder="e.g. Julian Costa"
                      required
                    />
                  </div>
                </div>

                {/* Image URL (Now showing the source/base64) */}
                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Image Source</label>
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-orange-500 transition-colors">link</span>
                    <input
                      ref={imageUrlRef}
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-slate-50/50 border border-white focus:bg-white focus:ring-8 focus:ring-orange-500/5 outline-none transition-all font-bold text-slate-700 text-xs truncate"
                      placeholder="Image URL or Base64 data"
                    />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <span className="material-symbols-outlined text-sm text-slate-300">info</span>
                    <p className="text-[11px] text-slate-400 font-bold italic">You can also paste a direct image link here.</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 flex flex-col sm:flex-row gap-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-[#FF6D42] to-[#FF9B7B] text-white font-black text-sm shadow-[0_20px_40px_rgba(255,109,66,0.2)] hover:shadow-[0_20px_40px_rgba(255,109,66,0.3)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Information"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 py-5 rounded-2xl bg-white border border-slate-100 text-slate-500 font-black text-sm hover:bg-slate-50 active:scale-95 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bottom Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-8 p-10 rounded-[3rem] bg-white/40 backdrop-blur-xl border border-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-800 text-lg mb-2">Data Privacy</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">Your personal information is encrypted and never shared with third parties without your consent.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-8 p-10 rounded-[3rem] bg-white/40 backdrop-blur-xl border border-white shadow-sm hover:shadow-md transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-800 text-lg mb-2">Verified Badge</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">Complete your profile to earn a verified status and gain exclusive early access to summer drops.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
