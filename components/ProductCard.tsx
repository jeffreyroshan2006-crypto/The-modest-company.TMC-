'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col">
      <Link href={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
            New
          </span>
        )}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute top-4 right-4 p-2 backdrop-blur-md rounded-full transition-colors z-10",
            isWishlisted ? "bg-[#D4AF37] text-black" : "bg-black/20 text-white hover:text-[#D4AF37]"
          )}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </Link>
      
      <div className="mt-6 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{product.category.replace('-', ' ')}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-white font-serif text-lg group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-[#D4AF37] font-medium">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
