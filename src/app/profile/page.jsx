import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect("/login");
    }

    const { user } = session;

    return (
        <main className="min-h-screen bg-[#F4FAFD] font-['Plus_Jakarta_Sans']">
            <Navbar />

            <div className="pt-40 pb-32 px-8 flex flex-col items-center relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-100/50 to-transparent -z-10"></div>
                <div className="absolute top-20 -left-20 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute top-40 -right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>

                {/* Profile Card */}
                <div className="max-w-4xl w-full relative">
                    <div className="bg-white/40 backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] border border-white/40 shadow-[0_32px_120px_rgba(0,0,0,0.06)] flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="relative mb-10">
                            <div className="w-44 h-44 rounded-full border-[10px] border-white shadow-2xl overflow-hidden bg-orange-50">
                                {user.image ? (
                                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl font-black text-orange-200">
                                        {user.name[0]}
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-orange-500 border border-orange-50">
                                <span className="material-symbols-outlined text-2xl">verified</span>
                            </div>
                        </div>

                        {/* User Info */}
                        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-tighter mb-3">{user.name}</h1>
                        <p className="text-slate-400 font-bold text-xl mb-12">{user.email}</p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-14">
                            <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/50 border border-white/60 text-left hover:bg-white/70 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Default Location</p>
                                    <p className="font-black text-slate-700 text-lg">Barcelona, Spain</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/50 border border-white/60 text-left hover:bg-white/70 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Member Since</p>
                                    <p className="font-black text-slate-700 text-lg">June 2023</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <Link href="/update-profile">
                            <button className="px-14 py-5 rounded-full bg-gradient-to-r from-[#FF6D42] to-[#FF9B7B] text-white font-black text-lg shadow-[0_20px_50px_rgba(255,109,66,0.25)] hover:shadow-[0_20px_50px_rgba(255,109,66,0.35)] hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3">
                                Update Information <span className="material-symbols-outlined text-xl">edit_square</span>
                            </button>
                        </Link>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20 px-10">
                        <div className="text-center group cursor-default">
                            <p className="text-4xl font-black text-slate-800 group-hover:text-orange-500 transition-colors"></p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2"></p>
                        </div>
                        <div className="text-center md:border-l border-slate-200 group cursor-default">
                            <p className="text-4xl font-black text-slate-800 group-hover:text-orange-500 transition-colors"></p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2"></p>
                        </div>
                        <div className="text-center md:border-l border-slate-200 group cursor-default">
                            <p className="text-4xl font-black text-slate-800 group-hover:text-orange-500 transition-colors"></p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2"></p>
                        </div>
                        <div className="text-center md:border-l border-slate-200 group cursor-default">
                            <p className="text-4xl font-black text-slate-800 group-hover:text-orange-500 transition-colors"></p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2"></p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
