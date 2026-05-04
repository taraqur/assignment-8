import React from "react";

const Brands = () => {
  const brands = [
    { name: "SunShade", icon: "wb_sunny" },
    { name: "BeachVibe", icon: "waves" },
    { name: "PureSun", icon: "brightness_7" },
    { name: "SolLux", icon: "wb_twilight" },
  ];

  return (
    <section className="py-24 px-8 bg-white font-['Plus_Jakarta_Sans']">
      <div className="container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center justify-center gap-3">
            <span className="text-orange-300">🏷️</span> Top Brands
          </h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-700">
          {brands.map((brand, index) => (
            <div key={index} className="flex items-center gap-3.5 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-orange-50 transition-colors">
                <span className="material-symbols-outlined text-2xl text-slate-400 group-hover:text-orange-500 transition-colors">
                    {brand.icon}
                </span>
              </div>
              <span className="text-xl font-black text-slate-700 tracking-tighter group-hover:text-slate-900 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
