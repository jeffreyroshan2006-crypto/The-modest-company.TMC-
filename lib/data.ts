export interface Product {
  id: string;
  name: string;
  category: 'hijabs' | 'abayas' | 'pakistani-suits';
  price: number;
  description: string;
  images: string[];
  variants: { size?: string[]; color?: string[] };
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: 'h1',
    name: 'Premium Silk Chiffon Hijab',
    category: 'hijabs',
    price: 1299,
    description: 'Our signature OG imported silk chiffon hijab. Lightweight, breathable, and perfectly draped.',
    images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800'],
    variants: { color: ['Champagne', 'Midnight', 'Rose Gold'] },
    isNew: true
  },
  {
    id: 'a1',
    name: 'Luxury Velvet Open Abaya',
    category: 'abayas',
    price: 5499,
    description: 'Exquisite velvet abaya with intricate gold embroidery. Perfect for evening occasions.',
    images: ['https://images.unsplash.com/photo-1564113808230-e8b2e544aa0e?q=80&w=800'],
    variants: { size: ['S', 'M', 'L', 'XL'], color: ['Black', 'Emerald'] },
    isBestSeller: true
  },
  {
    id: 's1',
    name: 'Embroidered Pakistani Lawn Suit',
    category: 'pakistani-suits',
    price: 8999,
    description: 'Authentic 3-piece Pakistani suit with heavy thread work and pure chiffon dupatta.',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'],
    variants: { size: ['M', 'L'] },
    isNew: true
  },
  // Add more items as needed...
];
