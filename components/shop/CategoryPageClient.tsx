"use client";

import { motion } from "framer-motion";
import { ShopFilters } from "@/components/shop/shop-filters";
import { useSearchParams } from "next/navigation";
import productApiSlice from "@/redux/api/productsApiSlice";
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "@/types";
import { ProductCardBase } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Loader2, Filter, Grid3X3, List } from "lucide-react";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";

interface CategoryPageClientProps {
  categoryId: string;
  initialData: {
    category: ICategory;
    children?: ICategory;
  };
  subId?: string;
}

export default function CategoryPageClient({ 
  categoryId, 
  initialData, 
  subId 
}: CategoryPageClientProps) {
  const [page, setPage] = useState(1);
  const [categoryData, setCategoryData] = useState<ICategory>(initialData.category);
  const [subCategoryData, setSubCategoryData] = useState<ICategory | undefined>(initialData.children);
  const [products, setProducts] = useState<IProduct[]>(initialData.category.products || []);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const searchParams = useSearchParams();
  const currentSubId = searchParams.get("sub_id");

  const { data, isSuccess, isLoading } = productApiSlice.useGetBySingleCategoryQuery(
    {
      id: categoryId,
      limit: 12,
      page: page,
      sub_id: currentSubId,
    },
    {
      // Always fetch; when page === 1 we will replace products, for >1 we append
      skip: false,
    }
  );

  // Reset products when sub_id changes (normalize undefined/null)
  useEffect(() => {
    const normalizedCurrent = currentSubId ?? null;
    const normalizedInitial = subId ?? null;
    if (normalizedCurrent !== normalizedInitial) {
      setPage(1);
      setIsLoadingMore(false);
    }
  }, [currentSubId, subId]);

  // Handle data updates (replace on page 1, append otherwise)
  useEffect(() => {
    if (isSuccess && data?.category) {
      setCategoryData(data.category);
      if (data.children) {
        setSubCategoryData(data.children as unknown as ICategory);
      }

      const newProducts = data.category.products || [];
      if (page === 1) {
        setProducts(newProducts);
      } else if (newProducts.length > 0) {
        setProducts(prev => [...prev, ...newProducts]);
      }
      setIsLoadingMore(false);
    }
  }, [data, isSuccess, page]);

  const loadMore = () => {
    setIsLoadingMore(true);
    setPage(prev => prev + 1);
  };

  const hasMoreProducts = (data?.category?.products?.length || 0) === 12;

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
              <h1 className="text-3xl font-bold mb-2">{categoryData.name}</h1>
              <p className="text-muted-foreground">
                {products.length} products found
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
              <ShopFilters subCategories={subCategoryData} />
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

            {/* Loading skeleton for more products */}
            {isLoadingMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMoreProducts && !isLoadingMore && (
              <div className="flex justify-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Load More Products
                </Button>
              </div>
            )}

            {/* No products message */}
            {products.length === 0 && !isLoadingMore && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-12 h-12 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No products found</h2>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or browse other categories.
                  </p>
                  <Button variant="outline" onClick={() => setIsMobileFiltersOpen(true)}>
                    Adjust Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
