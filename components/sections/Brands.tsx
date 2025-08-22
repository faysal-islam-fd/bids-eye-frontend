'use client';

import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { OptimizedImage } from '@/components/ui/optimized-image';

const brands = [
  {
    name: 'Nike',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
  },
  {
    name: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
  },
  {
    name: 'Puma',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
  },
  {
    name: 'Reebok',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
  },
  {
    name: 'Under Armour',
    logo: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80',
  },
];

export default function Brands() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn('up')}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Brands</h2>
          <p className="text-muted-foreground">Trusted by the world's best brands</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              variants={fadeIn('up', index * 0.1)}
              className="flex items-center justify-center"
            >
              <div className="h-12 w-24 relative">
                <OptimizedImage
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="96px"
                  quality={70}
                  className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}