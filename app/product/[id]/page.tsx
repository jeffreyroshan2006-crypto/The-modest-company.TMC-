import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';
import AddToCartButton from '@/components/AddToCartButton';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import Image from 'next/image';

// ✅ Fix 1: Update Params Type for Next.js 15
interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  // ✅ Fix 2: Await the params
  const { id } = await params;
  
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-[#111] p-8 flex items-center justify-center min-h-[500px] relative">
            {/* ✅ Fix 3: Use product.images[0] instead of product.image */}
            {/* Also upgraded to Next.js Image component for better performance */}
            <Image
              src={product.images[0]} 
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
              unoptimized // Added to avoid external domain config issues
            />
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <span className="text-[#D4AF37] text-sm uppercase tracking-widest mb-2 block">
                {product.category}
              </span>
              <h1 className="text-4xl font-serif text-white mb-4">{product.name}</h1>
              <p className="text-2xl text-white font-light">₹{product.price.toLocaleString()}</p>
            </div>

            <p className="text-white/70 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-white/10 pt-8">
              <AddToCartButton product={product} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck className="text-[#D4AF37]" size={24} />
                <span className="text-white text-sm">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck className="text-[#D4AF37]" size={24} />
                <span className="text-white text-sm">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <RefreshCw className="text-[#D4AF37]" size={24} />
                <span className="text-white text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
