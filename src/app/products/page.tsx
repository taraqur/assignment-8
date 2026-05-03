import React from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="pt-32 pb-xl px-8 container-max mx-auto">
      <div className="mb-xl">
        <h1 className="font-h1 text-h1 text-on-background mb-sm">All Products</h1>
        <p className="text-on-surface-variant font-body-lg">
          Browse our full collection of summer essentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            badge={product.category}
            badgeColor="bg-primary-container text-on-primary-container"
            title={product.name}
            rating={product.rating.toString()}
            price={`$${product.price.toFixed(2)}`}
          />
        ))}
      </div>
    </main>
  );
}
