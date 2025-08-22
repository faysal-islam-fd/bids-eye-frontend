


"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../product-card";

const hoodieProducts = [
  {
    id: 301,
    name: "Classic Pullover Hoodie",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    category: "hoodies",
    isNew: true
  },
  {
    id: 302,
    name: "Zip-Up Hoodie",
    price: 64.99,
    image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500&h=500&fit=crop",
    category: "hoodies",
    discount: 20
  },
  {
    id: 303,
    name: "Oversized Comfort Hoodie",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1556821840-5a6e18314819?w=500&h=500&fit=crop",
    category: "hoodies"
  },
  {
    id: 304,
    name: "Athletic Performance Hoodie",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1578768079046-aa76e52ff62e?w=500&h=500&fit=crop",
    category: "hoodies",
    discount: 15
  }
];

export function HoodiesSection() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Cozy Hoodies</h2>
        <Link href="/shop/hoodies">
          <Button variant="ghost" className="group">
            View All 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hoodieProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}