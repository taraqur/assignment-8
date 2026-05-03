import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CareTips from "@/components/CareTips";
import Brands from "@/components/Brands";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Riviera Shades",
      price: "$149.00",
      rating: "4.9",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9MpP25JXvPpca3wKTvLd238_K860xvcPXjxVihu41VyC4pgCeKZZmK-OOUT0yC9L060JDtZ8m_bQXCkJ_B4tATHlfZyXY47ZAMpiKB2RTStLWuQn-bxHJdx04XbqW93Z1AKI1UGJdvwzlhMMRvnMsSs4mviWm9pMuFVG_TqMteUq9vLp7UQkOnRp708mr_YTCu3XcsGHMrcJSh5BC08T4fgCF0C2AAwZdtxbEtY4mhLjb366EKLOiam62EYOggxcVITPFHKrVl3CN",
      badge: "NEW",
      badgeColor: "bg-[#0EA5E9]"
    },
    {
      id: 2,
      name: "Azure Trunks",
      price: "$42.50",
      oldPrice: "$65.00",
      rating: "4.7",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFmdrQO4-JI0ry_vKcmcLY-7vHfDRcPegWOTzybAH6ME8iEvi5O_fzoVPgpmqOeeWNr8RHaMPhQc0cE7BM_jDpLLXFfHRqXao8YDfcYnzBHbctCIhdUSXTbSok4x1fn9OJh8oIHgWH3QAuUvA0B_c_NAfWCG2B4ktc8sZ5ZosRvTZcWSOGmXXiKHA31fNFsxzMOgP_KqQtw_HW99nFDk-XVlLgUMuAOnPvPQylXnLLYXTIRlRarRQxJL6A-L3AgJk1miW05l3k_kuG",
      badge: "SALE",
      badgeColor: "bg-[#F97316]"
    },
    {
      id: 3,
      name: "SunShield SPF 50",
      price: "$29.00",
      rating: "5.0",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq__bMTRaU3XxHyf5rmJ8bMbKHyfh_eiWXj_GCuNpgdT1Jep_XC9_z1hGmIy_iGRGdDEq1cuXmDuNxRVGU2Y1hDCDkQdx4kQaXOY58lCxDZ3myfYWEUEOZIf_K7eOjXSBr3MTIrnVX92M0_7ioi6lC1M9oN1NyNRL4Bs8kVK6EWVxzvMn3m3J3MIdXVE3N03miT4Uq5S1NiIg2bXnTOHNTbfNnLlTJgxv5p16m6NTsZ_McVBesYMD1UZ1OFtF8-Egg0ax-E3aJq6t1",
      badge: "FAVOURITE",
      badgeColor: "bg-[#0F172A]"
    }
  ];

  return (
    <main className="min-h-screen bg-white font-['Plus_Jakarta_Sans']">
      <Navbar />
      <Hero />
      
      {/* Popular Products Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-20 px-2">
            <div>
                <h2 className="text-4xl font-black text-slate-800 mb-3 flex items-center gap-3">
                    <span className="text-[#FF6D42]">🔥</span> Popular Products
                </h2>
                <p className="text-slate-500 font-medium text-lg">
                The most wanted essentials for your sun-soaked adventures.
                </p>
            </div>
            <Link className="text-slate-800 font-black text-sm flex items-center gap-2 group hover:text-[#FF6D42] transition-colors pb-1" href="/products">
                See All <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
            </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, index) => (
                <ProductCard 
                    key={index} 
                    id={product.id}
                    image={product.image}
                    badge={product.badge}
                    badgeColor={product.badgeColor}
                    title={product.name}
                    rating={product.rating}
                    price={product.price}
                    oldPrice={product.oldPrice}
                />
            ))}
            </div>
        </div>
      </section>

      <CareTips />
      <Brands />
      <Footer />
    </main>
  );
}
