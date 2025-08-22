"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import { useEffect, useState } from "react";
import { Product } from "@/hooks/use-products";
import QuickView from "../quick-view/QuickView";
import productApiSlice from "@/redux/api/productsApiSlice";
import { IProduct } from "@/types";
import { ProductCardBase } from "../product/ProductCard";
import CategorySkeleton from "../skeleton/CategorySkeleton";
import { ProductCardSkeleton } from "../skeleton/ProductSkeleton";

export default function FeaturedProducts() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const { data, isSuccess, isLoading } =
    productApiSlice.useGetAllFeaturedProductsQuery("");
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (data?.products) {
      setProducts(data?.products);
    }
  }, [isSuccess, data]);
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

        {isLoading ? (
          
         <div 
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
         >
           {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

         </div>
          
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {products.map((product, index) => {
              return (
                <ProductCardBase
                  index={index}
                  product={product}
                  key={product.id}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
