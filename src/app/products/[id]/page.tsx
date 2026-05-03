import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import products from "@/data/products.json";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect(`/login?callbackURL=/products/${id}`);
  }

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32">
        <h1 className="text-4xl font-bold text-on-background">Product Not Found</h1>
        <Link href="/products" className="mt-4 text-primary hover:underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-['Plus_Jakarta_Sans']">
      <Navbar />
      <div className="pt-48 pb-32 px-8 container-max mx-auto">
        <div className="flex flex-col lg:flex-row gap-xl">
          {/* Image Section */}
          <div className="flex-1">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-white/50 aspect-square">
              <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-block px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-label-caps text-xs mb-sm uppercase tracking-widest w-fit">
              {product.brand}
            </div>
            <h1 className="font-h1 text-h1 text-on-background mb-sm leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-md">
              <div className="flex items-center gap-1 text-orange-400">
                  {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: i < Math.floor(product.rating) ? "'FILL' 1" : "" }}>
                          star
                      </span>
                  ))}
              </div>
              <span className="font-bold text-on-background">{product.rating} / 5.0</span>
            </div>

            <div className="text-3xl font-black text-primary mb-md">
              ${product.price.toFixed(2)}
            </div>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-md mb-lg">
              <div className="px-4 py-2 rounded-xl bg-surface-container border border-white/50 text-on-surface-variant">
                  Stock: <span className="font-bold text-on-background">{product.stock} units</span>
              </div>
            </div>

            <button className="hero-gradient px-xl py-5 rounded-full font-button text-button text-on-primary shadow-lg shadow-orange-500/40 hover:brightness-110 active:scale-95 transition-all w-full lg:w-fit">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
