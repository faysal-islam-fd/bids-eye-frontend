"use client";

import { motion } from "framer-motion";
import { ShopFilters } from "@/components/shop/shop-filters";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import productApiSlice from "@/redux/api/productsApiSlice";
import { IProduct } from "@/types";
import { ProductCardBase } from "@/components/product/ProductCard";

interface SearchPageClientProps {
  initialQuery: string;
  initialData: {
    products: IProduct[];
    count: number;
  } | null;
  error: boolean;
}

export default function SearchPageClient({ 
  initialQuery, 
  initialData, 
  error 
}: SearchPageClientProps) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || initialQuery;
  
  const [qStr, setQStr] = useState("");
  const [result, setResults] = useState(initialData?.count || 0);
  const [products, setProducts] = useState<IProduct[]>(initialData?.products || []);

  const { data, isSuccess, refetch, isLoading, isFetching } = productApiSlice.useSearchProductsQuery(qStr, {
    // Skip initial client refetch when we already have SSR data for the same query
    skip: !qStr || !!(initialData && qStr === `?q=${encodeURIComponent(initialQuery)}`),
  });

  useEffect(() => {
    // Derive query string directly from current q param
    const qString = q ? `?q=${encodeURIComponent(q)}` : "";
    setQStr(qString);
  }, [q]);

  useEffect(() => {
    if (qStr && (!initialData || qStr !== `?q=${encodeURIComponent(initialQuery)}`)) {
      refetch();
    }
  }, [qStr, refetch, initialQuery, initialData]);

  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
    if (data?.count !== undefined) {
      setResults(data.count);
    }
  }, [isSuccess, data]);

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">Search Error</h2>
        <p className="text-muted-foreground">
          Unable to perform search at the moment. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            {result} results found {q && `for "${q}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <ShopFilters setQStr={setQStr} />
          
          {(isLoading || isFetching) && products.length === 0 ? (
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1">
              {products?.length > 0 ? (
                <motion.div
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCardBase product={product} index={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground">
                    {q 
                      ? `No results found for "${q}". Try different search terms.`
                      : "Enter a search term to find products."
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
