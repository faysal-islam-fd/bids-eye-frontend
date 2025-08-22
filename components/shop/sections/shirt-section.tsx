"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../product-card";

const shirtProducts = [
  {
    id: 101,
    name: "Classic White Oxford Shirt",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
    category: "shirts",
    isNew: true
  },
  {
    id: 102,
    name: "Blue Striped Business Shirt",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
    category: "shirts",
    discount: 15
  },
  {
    id: 103,
    name: "Slim Fit Cotton Shirt",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    category: "shirts"
  },
  {
    id: 104,
    name: "Casual Linen Shirt",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=500&h=500&fit=crop",
    category: "shirts",
    discount: 20
  }
];

export function ShirtsSection() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Premium Shirts</h2>
        <Link href="/shop/shirts">
          <Button variant="ghost" className="group">
            View All 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shirtProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}