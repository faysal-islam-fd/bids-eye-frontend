

import { Product } from '../types/product';

export const product: Product = {
  id: '1',
  name: "Men's Premium Blazer",
  price: 149.99,
  originalPrice: 199.99,
  description: "Elevate your formal wardrobe with our premium men's blazer. Crafted from high-quality materials, this blazer features a modern fit, sophisticated design, and exceptional attention to detail. Perfect for both business and special occasions.",
  features: [
    'Premium Italian fabric',
    'Modern slim fit',
    'Fully lined interior',
    'Double-vent design',
    'Four interior pockets',
    'Handcrafted buttons'
  ],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Navy Blue', 'Charcoal Grey', 'Black'],
  images: [
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800',
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800',
    'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800',
    'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=800'
  ],
  category: "Men's Fashion",
  brand: 'Premium Collection',
  rating: 4.8,
  reviews: 128
};