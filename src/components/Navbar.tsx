"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "My Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl px-8 py-3.5 flex items-center justify-between border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#F97316] tracking-tighter">SunCart</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`relative text-[15px] font-bold transition-all duration-300 ${pathname === link.href ? 'text-[#F97316]' : 'text-slate-600 hover:text-[#F97316]'}`}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-active"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#F97316] rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-3 bg-white/40 px-4 py-2 rounded-full border border-white/40 shadow-sm hover:shadow-md transition-all group">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-orange-100 group-hover:border-orange-500 transition-colors">
                  {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-500 font-bold text-[10px] uppercase">
                      {session.user.name[0]}
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-700">{session.user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-orange-500 hover:bg-white/50 transition-all border border-white/20"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[14px] font-bold text-[#F97316] shadow-sm hover:shadow-md transition-all active:scale-95">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-[#F97316] transition-colors">
                  <span className="material-symbols-outlined text-2xl">logout</span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
