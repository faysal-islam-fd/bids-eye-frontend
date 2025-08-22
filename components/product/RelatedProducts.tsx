"use client";

import { motion } from "framer-motion";
import { ProductCardBase } from "./ProductCard";
import { useParams } from "next/navigation";
import productApiSlice from "@/redux/api/productsApiSlice";
import { useEffect, useState, useMemo } from "react";
import { IProduct } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function RelatedProducts() {
  const params = useParams();
  const currentSlug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const [page, setPage] = useState(1);
  
  const { data, isSuccess, refetch, isFetching, isLoading } =
    productApiSlice.useGetRelatedProductsQuery(
      { slug: currentSlug, page },
      { skip: !currentSlug }
    );
  
  const [products, setProducts] = useState<IProduct[]>([]);

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
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
    }
  }, [isSuccess, data?.products, page]);

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
        
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <ProductCardBase 
                  key={`${product.id}-${index}`} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>

            {/* Load more button */}
            <motion.button
              onClick={() => {
                setPage((p) => p + 1);
                refetch();
              }}
              disabled={isFetching}
              whileTap={{ scale: 0.95 }}
              className="text-primary mt-8 flex w-full justify-center hover:underline font-medium disabled:opacity-60 transition-opacity"
            >
              {isFetching ? "Loading..." : "Load more"}
            </motion.button>
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
