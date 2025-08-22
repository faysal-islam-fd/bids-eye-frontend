'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { OptimizedImage } from '@/components/ui/optimized-image';

const products =[
  {
    "id": 1,
    "name": "Casual Shirt",
    "price": 39.99,
    "image": "./collection/casual_shirt_2.jpg",
    "rating": 4.2
  },
  {
    "id": 2,
    "name": "Jacket",
    "price": 49.99,
    "image": "./collection/jacket_3.jpg",
    "rating": 4.7
  },
  {

    "id": 3,
    "name": "Sweat Shirt",
    "price": 129.99,
    "image": "./collection/sweat_shirt_2.jpg",
    "rating": 4.8
  },
  
]


export default function NewArrivals() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
          <p className="text-muted-foreground">Check out our latest products</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeIn('up', index * 0.1)}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="w-full aspect-[3/4] relative">
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 33vw, 25vw"
                    quality={80}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-2 rounded-md flex items-center gap-2 hover:bg-white/90 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                </div>
                <p className="text-primary font-bold">৳ {product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}