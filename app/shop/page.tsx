import React from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="py-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">All Collections</h1>
            <p className="text-white/50">Discover our full range of luxury modest wear.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="bg-transparent border-b border-white/20 text-white text-xs uppercase tracking-widest py-2 focus:outline-none focus:border-[#D4AF37]">
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
