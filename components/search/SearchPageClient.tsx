"use client";

import { motion } from "framer-motion";
import { ShopFilters } from "@/components/shop/shop-filters";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import productApiSlice from "@/redux/api/productsApiSlice";
import { IProduct } from "@/types";
import { ProductCardBase } from "@/components/product/ProductCard";
import { Filter, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Search Results</h1>
              <p className="text-muted-foreground">
                {result} results found {q && `for "${q}"`}
              </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <ShopFilters setQStr={setQStr} />
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Products Header with View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Showing {products.length} products
                </span>
              </div>
              
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {(isLoading || isFetching) && products.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {/* Products Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
                      >
                        <ProductCardBase product={product} index={index} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* No products message */}
                {products.length === 0 && !isLoading && (
                  <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-12 h-12 text-gray-400" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">No products found</h2>
                      <p className="text-muted-foreground mb-4">
                        {q 
                          ? `No results found for "${q}". Try different search terms.`
                          : "Enter a search term to find products."
                        }
                      </p>
                      <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)}>
                        Try Different Search
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
