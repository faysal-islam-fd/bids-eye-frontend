

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../product-card";

const pantProducts = [
  {
    id: 401,
    name: "Slim Fit Chinos",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
    category: "pants",
    isNew: true
  },
  {
    id: 402,
    name: "Classic Denim Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    category: "pants",
    discount: 15
  },
  {
    id: 403,
    name: "Cargo Pants",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&h=500&fit=crop",
    category: "pants"
  },
  {
    id: 404,
    name: "Formal Trousers",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
    category: "pants",
    discount: 20
  }
];

export function PantsSection() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Stylish Pants</h2>
        <Link href="/shop/pants">
          <Button variant="ghost" className="group">
            View All 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pantProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}