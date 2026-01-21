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
    // Basic add to cart logic - allows adding without specific color/size for now
    // or defaults to first available option if complex logic is needed
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images ? product.images[0] : product.image || '',
      quantity: 1,
      selectedColor: product.colors ? product.colors[0] : undefined,
      selectedSize: product.sizes ? product.sizes[0] : undefined,
    });
    
    // Optional: Add toast notification here
    alert('Added to cart!');
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
