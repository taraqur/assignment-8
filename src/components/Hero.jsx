"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden font-['Plus_Jakarta_Sans']">

      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          alt="Summer Background"
          src="/images/summer-bg.png"
        />
      </div>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

        className="relative z-10 w-full max-w-2xl mx-4 bg-white/30 backdrop-blur-2xl rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden"
      >
        <div className="p-10 lg:p-14 flex flex-col items-start">

          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF6D42] text-white text-[10px] font-bold uppercase tracking-widest mb-6">
            Limited Time Offer
          </span>

          <h1 className="text-[48px] lg:text-[56px] font-black text-slate-800 leading-tight mb-2">
            Summer Sale <span className="text-[#B23B1C]">50% OFF</span>
          </h1>

          <p className="text-xl font-bold text-[#FF6D42] mb-6 flex items-center gap-2">
            Hot Deals 🔥
          </p>


          <p className="text-slate-700 text-[16px] lg:text-lg font-medium leading-relaxed mb-10 max-w-none">
            Discover our curated collection of Mediterranean essentials.
            From sun-drenched beachwear to premium skincare, find everything
            you need for the perfect getaway.
          </p>


          <div className="flex flex-row items-center gap-4 w-full">
            <Link href="/products">
              <button className="px-10 py-3.5 rounded-full bg-[#FF8A65] text-white font-bold shadow-lg shadow-orange-500/20 hover:bg-[#FF7B54] transition-all">
                Shop Now
              </button>
            </Link>
            <button className="px-10 py-3.5 rounded-full border border-[#5C2D1F] font-bold text-[#5C2D1F] hover:bg-white/10 transition-all">
              View Lookbook
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;