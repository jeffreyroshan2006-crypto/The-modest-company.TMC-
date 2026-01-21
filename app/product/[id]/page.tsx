'use client';

import React, { useState } from 'react';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  MessageCircle,
  ShieldCheck,
  Truck,
  ChevronRight,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const product = products.find((p) => p.id === id);
  const { addToCart, wishlist, toggleWishlist } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.variants.color?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.variants.size?.[0]
  );

  if (!product) notFound();

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest py-2 focus:outline-none focus:border-none">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={10} />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-white transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={10} />
          <span className="text-white/50">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          {/* Product Image */}
          <div className="bg-[#111] p-8 flex items-center justify-center min-h-96">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-96 object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
                {product.name}
              </h1>
              <p className="text-white/50 text-sm mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-[#D4AF37]">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Variants */}
            {product.variants.color && product.variants.color.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 block mb-3">
                  Color
                </label>
                <div className="flex gap-3">
                  {product.variants.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'px-4 py-2 text-sm border transition-colors',
                        selectedColor === color
                          ? 'border-[#D4AF37] text-white'
                          : 'border-white/20 text-white/50 hover:border-white/50'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants.size && product.variants.size.length > 0 && (
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 block mb-3">
                  Size
                </label>
                <div className="flex gap-3">
                  {product.variants.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-4 py-2 text-sm border transition-colors',
                        selectedSize === size
                          ? 'border-[#D4AF37] text-white'
                          : 'border-white/20 text-white/50 hover:border-white/50'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-4">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    selectedColor,
                    selectedSize,
                  })
                }
                className="flex-1 bg-[#D4AF37] text-black font-semibold py-3 px-6 hover:bg-[#e0bf4f] transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  'p-3 border transition-colors',
                  isWishlisted
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-white/20 text-white hover:border-white/50'
                )}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#D4AF37]" />
                <span className="text-sm text-white/70">100% Authentic & Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-[#D4AF37]" />
                <span className="text-sm text-white/70">Free Shipping on Orders Above ₹500</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={20} className="text-[#D4AF37]" />
                <span className="text-sm text-white/70">24/7 Customer Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
