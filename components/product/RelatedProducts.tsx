"use client";

import { motion } from "framer-motion";
import { ProductCardBase } from "./ProductCard";
import { useParams } from "next/navigation";
import productApiSlice from "@/redux/api/productsApiSlice";
import { useEffect, useState, useMemo } from "react";
import { IProduct } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronDown } from "lucide-react";

export default function RelatedProducts() {
  const params = useParams();
  const currentSlug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  
  const { data, isSuccess, refetch, isFetching, isLoading } =
    productApiSlice.useGetRelatedProductsQuery(
      { slug: currentSlug, page },
      { skip: !currentSlug }
    );
  
  // Number of products to show initially and per load
  const INITIAL_PRODUCTS = 4;
  const PRODUCTS_PER_LOAD = 4;

  // Memoize products to prevent unnecessary re-renders
  const memoizedProducts = useMemo(() => {
    if (isSuccess && data?.products) {
      return data.products;
    }
    return [];
  }, [isSuccess, data?.products]);

  useEffect(() => {
    if (isSuccess && data?.products) {
      if (page === 1) {
        setAllProducts(data.products);
        // Only show initial products
        setDisplayedProducts(data.products.slice(0, INITIAL_PRODUCTS));
      } else {
        // Append new products to all products
        setAllProducts(prev => [...prev, ...data.products]);
        // Add new products to displayed products
        setDisplayedProducts(prev => [...prev, ...data.products]);
      }
    }
  }, [isSuccess, data?.products, page]);

  // Check if there are more products to load
  const hasMoreProducts = allProducts.length > displayedProducts.length;

  const handleLoadMore = () => {
    const currentCount = displayedProducts.length;
    const nextBatch = allProducts.slice(currentCount, currentCount + PRODUCTS_PER_LOAD);
    setDisplayedProducts(prev => [...prev, ...nextBatch]);
  };

  // Loading skeleton for initial load
  if (isLoading && page === 1) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="w-full aspect-[3/4] rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold">Related Products</h2>
        </div>
        
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {displayedProducts.map((product, index) => (
                <ProductCardBase 
                  key={`${product.id}-${index}`} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>

            {/* Load More Button - Only show when there are more products to display */}
            {hasMoreProducts && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center mt-12"
              >
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="group relative overflow-hidden bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/60 transition-all duration-300 px-8 py-3 rounded-xl shadow-sm hover:shadow-md"
                >
                  <span className="relative z-10 font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                    Load More Products
                  </span>
                  <ChevronDown className="ml-2 h-5 w-5 text-gray-500 group-hover:text-primary transition-all duration-300 group-hover:translate-y-0.5" />
                  
                  {/* Subtle background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]" />
                </Button>
              </motion.div>
            )}

            {/* Products loaded indicator */}
            {!hasMoreProducts && allProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-green-700">
                    All {allProducts.length} related products loaded
                  </span>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No related products found</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
