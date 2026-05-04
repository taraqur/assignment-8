import React from "react";

const CareTips = () => {
  const tips = [
    {
      title: "Hydration",
      description:
        "Stay hydrated by drinking at least 3 liters of water daily. Infuse with lemon or mint for a refreshing Mediterranean twist.",
      icon: "water_drop",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-400",
    },
    {
      title: "Skincare",
      description:
        "Cleanse thoroughly after beach days to remove salt and sand. Use aloe-based moisturizers to soothe sun-exposed skin.",
      icon: "eco",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-400",
    },
    {
      title: "Sun Protection",
      description:
        "Reapply SPF every 2 hours and wear wide-brimmed hats during peak hours between 11 AM and 4 PM.",
      icon: "light_mode",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <section className="py-28 px-8 bg-[#F0F9FF]/50 font-['Plus_Jakarta_Sans']">
      <div className="container-max mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-800 mb-3 flex items-center justify-center gap-3">
            <span className="text-green-500">🌿</span> Summer Care Tips
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Expert advice to keep you glowing and healthy all summer long.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-12 rounded-[3.5rem] text-center shadow-[0_15px_50px_rgba(0,0,0,0.02)] border border-white hover:shadow-[0_30px_70px_rgba(0,0,0,0.06)] transition-all duration-700 group"
            >
              <div
                className={`w-24 h-24 mx-auto mb-10 rounded-full ${tip.iconBg} flex items-center justify-center ${tip.iconColor} group-hover:scale-110 transition-transform duration-700 shadow-sm`}
              >
                <span className="material-symbols-outlined text-4xl">
                  {tip.icon}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-5 tracking-tight">
                {tip.title}
              </h3>
              <p className="text-slate-400 font-medium leading-relaxed px-2">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareTips;
