"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ProductCard = ({
  id,
  image,
  badge,
  badgeColor,
  title,
  rating,
  price,
  oldPrice,
}) => {
  return (
    <motion.div 
      whileHover={{ y: -12 }}
      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-50 shadow-[0_12px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.08)] transition-all duration-700 font-['Plus_Jakarta_Sans']"
    >
      {/* Image Container */}
      <div className="relative aspect-[1.1/1] overflow-hidden m-4 rounded-[2rem]">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          alt={title}
          src={image}
        />
        <div className={`absolute top-4 right-4 ${badgeColor} px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] text-white shadow-sm backdrop-blur-md bg-opacity-90`}>
          {badge}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 pt-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-slate-800 line-clamp-1 group-hover:text-[#FF6D42] transition-colors">{title}</h3>
          <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
            <span className="material-symbols-outlined text-orange-500 text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-[10px] font-black text-orange-700">{rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-xs font-bold line-through text-slate-300">
                {oldPrice}
              </span>
            )}
            <span className="text-2xl font-black text-slate-800 tracking-tight">
              {price}
            </span>
          </div>
          <Link href={`/products/${id}`}>
            <button className="bg-[#991B1B] text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider hover:bg-[#7F1D1D] hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-red-900/10">
                View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
