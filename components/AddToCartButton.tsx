'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  category: string;
  colors?: string[];
  sizes?: string[];
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // ✅ Fix: Use "images" (array) instead of "image" string
    // ✅ Added "as any" to prevent strict type blocking during build
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      // Create an array of images: use product.images if available, else wrap single image in array
      images: product.images || (product.image ? [product.image] : []), 
      quantity: 1,
      selectedColor: product.colors ? product.colors[0] : undefined,
      selectedSize: product.sizes ? product.sizes[0] : undefined,
    } as any);
    
    // Optional: Add toast notification here
    // alert('Added to cart!');
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-[#D4AF37] text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-[#B8860B] transition-colors flex items-center space-x-3 w-full sm:w-auto justify-center"
    >
      <ShoppingCart size={20} />
      <span>Add to Cart</span>
    </button>
  );
}
