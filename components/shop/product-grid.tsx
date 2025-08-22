"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./product-card";

const products = [
  {
    id: 1,
    name: "Floral Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop",
    category: "New Arrivals",
    isNew: true
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop",
    category: "Best Sellers",
    discount: 15
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Striped Cotton Shirt",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    category: "Summer Collection",
    discount: 20
  },
  {
    id: 5,
    name: "High-Waist Jeans",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop",
    category: "Best Sellers"
  },
  {
    id: 6,
    name: "Casual Sneakers",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
    category: "Footwear",
    isNew: true
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

interface ProductGridProps {

  category: string;

}
export function ProductGrid( { category }: ProductGridProps ) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}