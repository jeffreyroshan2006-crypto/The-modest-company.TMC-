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
    variants: { color: ['Champagne', 'Midnight', 'Rose Gold', 'Sage'] },
    isNew: true
  },
  {
    id: 'h2',
    name: 'Essential Jersey Hijab',
    category: 'hijabs',
    price: 899,
    description: 'The perfect everyday hijab. Stretchy, non-slip, and incredibly soft jersey fabric.',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'],
    variants: { color: ['Mocha', 'Slate', 'Sand', 'Black'] },
    isBestSeller: true
  },
  {
    id: 'h3',
    name: 'Medina Silk Hijab',
    category: 'hijabs',
    price: 1499,
    description: 'Luxurious Medina silk with a subtle sheen. Opaque and elegant for formal wear.',
    images: ['https://images.unsplash.com/photo-1564113808230-e8b2e544aa0e?q=80&w=800'],
    variants: { color: ['Dusty Rose', 'Olive', 'Navy', 'Cream'] },
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
    id: 'a2',
    name: 'Nidha Classic Butterfly Abaya',
    category: 'abayas',
    price: 3999,
    description: 'Flowy butterfly cut made from premium Nidha fabric. Modest and comfortable.',
    images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800'],
    variants: { size: ['52', '54', '56', '58'], color: ['Black', 'Maroon', 'Navy'] },
    isNew: true
  },
  {
    id: 'a3',
    name: 'Linen Summer Abaya',
    category: 'abayas',
    price: 4599,
    description: 'Breathable linen abaya with minimalist detailing. Ideal for warm climates.',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'],
    variants: { size: ['S', 'M', 'L'], color: ['Beige', 'Terracotta', 'White'] },
  },
  {
    id: 's1',
    name: 'Embroidered Pakistani Lawn Suit',
    category: 'pakistani-suits',
    price: 8999,
    description: 'Authentic 3-piece Pakistani suit with heavy thread work and pure chiffon dupatta.',
    images: ['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'],
    variants: { size: ['M', 'L', 'XL'] },
    isNew: true
  },
  {
    id: 's2',
    name: 'Festive Organza Collection',
    category: 'pakistani-suits',
    price: 12499,
    description: 'Stunning organza suit with hand-crafted embellishments and silk trousers.',
    images: ['https://images.unsplash.com/photo-1564113808230-e8b2e544aa0e?q=80&w=800'],
    variants: { size: ['S', 'M', 'L'] },
    isBestSeller: true
  },
  {
    id: 's3',
    name: 'Daily Wear Cotton Suit',
    category: 'pakistani-suits',
    price: 4999,
    description: 'Comfortable cotton suit with digital print and matching dupatta.',
    images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800'],
    variants: { size: ['S', 'M', 'L', 'XL', 'XXL'] },
  },
];
