
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "../product-card";

const tshirtProducts = [
  {
    id: 201,
    name: "Premium Cotton T-Shirt",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "tshirts",
    isNew: true
  },
  {
    id: 202,
    name: "Graphic Print T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
    category: "tshirts",
    discount: 10
  },
  {
    id: 203,
    name: "Urban Style T-Shirt",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
    category: "tshirts"
  },
  {
    id: 204,
    name: "Classic Black T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
    category: "tshirts",
    discount: 15
  }
];

export function TshirtsSection() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Trendy T-Shirts</h2>
        <Link href="/shop/tshirts">
          <Button variant="ghost" className="group">
            View All 
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tshirtProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}