import React from 'react';
import { products } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

// ✅ Fix: Update type to Promise<{ slug: string }>
export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // ✅ Fix: Await the params object before destructuring
  const { slug } = await params;
  
  const categoryProducts = products.filter(p => p.category === slug);
  
  if (categoryProducts.length === 0 && !['hijabs', 'abayas', 'pakistani-suits'].includes(slug)) {
    notFound();
  }

  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">{title}</h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Explore our curated collection of premium {title.toLowerCase()}, designed for elegance and comfort.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
