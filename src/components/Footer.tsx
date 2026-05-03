import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 px-8 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-black text-[#F97316] tracking-tighter">SunCart</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
              Elevating your summer experience with curated Mediterranean essentials since 2024.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F97316] hover:text-white transition-all border border-white/10">
                <span className="material-symbols-outlined text-lg">public</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F97316] hover:text-white transition-all border border-white/10">
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F97316] hover:text-white transition-all border border-white/10">
                <span className="material-symbols-outlined text-lg">bar_chart</span>
              </button>
            </div>
          </div>

          {/* Shop Essentials */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-slate-300">Shop Essentials</h3>
            <ul className="space-y-4">
              {['New Arrivals', 'Best Sellers', 'Beachwear', 'Skincare'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-slate-400 hover:text-[#F97316] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-slate-300">Guest Services</h3>
            <ul className="space-y-4">
              {['Shipping & Returns', 'Track Your Order', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-slate-400 hover:text-[#F97316] transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Inspired */}
          <div className="flex flex-col gap-8">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-2 text-slate-300">Stay Inspired</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join our community for exclusive summer style guides and early sale access.
            </p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#F97316]/50 transition-colors"
              />
              <button className="bg-gradient-to-r from-[#FF6D42] to-[#FF9B7B] text-white font-bold py-4 rounded-2xl text-sm shadow-lg shadow-orange-950/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                Subscribe Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-[10px] font-medium">
            © 2024 SunCart Mediterranean Summer. All rights reserved.
          </p>
          <div className="flex gap-10">
            {['Terms', 'Cookies', 'Accessibility'].map((item) => (
              <Link key={item} href="#" className="text-[10px] font-medium text-slate-500 hover:text-white transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
