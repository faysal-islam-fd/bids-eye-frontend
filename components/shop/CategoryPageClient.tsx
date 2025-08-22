"use client";

import { motion } from "framer-motion";
import { ShopFilters } from "@/components/shop/shop-filters";
import { useSearchParams } from "next/navigation";
import productApiSlice from "@/redux/api/productsApiSlice";
import { useEffect, useState } from "react";
import { ICategory, IProduct } from "@/types";
import { ProductCardBase } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{categoryData.name}</h1>
          <p className="text-muted-foreground">
            {products.length} products found
          </p>
        </div>

        {/* Filters */}
        {subCategoryData && (
          <div className="mb-8">
            <ShopFilters subCategories={subCategoryData} />
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

        {/* Loading skeleton for more products */}
        {isLoadingMore && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array.from({ length: 8 }).map((_, index) => (
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
              className="px-8 py-3"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Load More Products
            </Button>
          </div>
        )}

        {/* No products message */}
        {products.length === 0 && !isLoadingMore && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters or browse other categories.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
