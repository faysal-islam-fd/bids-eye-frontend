"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { useState } from "react";
import { Product } from "@/hooks/use-products";
import QuickView from "../quick-view/QuickView";
import { IProduct } from "@/types";
import { ProductCardBase } from "../product/ProductCard";

interface FeaturedProductsClientProps {
  products: IProduct[];
}

export default function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <section className="py-8 bg-muted/30">
      <QuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        closeModal={closeQuickView}
      />
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked products for you</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product, index) => (
            <ProductCardBase
              key={product.id}
              index={index}
              product={product}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
