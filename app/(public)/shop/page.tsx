import { Suspense } from "react";
import { apiClient } from "@/lib/api";
import { ICategory } from "@/types";
import { Metadata } from "next";
import CategorySectionServer from "@/components/shop/CategorySectionServer";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";

export const metadata: Metadata = {
  title: "Shop - Birds Eye Fashion",
  description: "Shop the latest fashion trends at Birds Eye Fashion. Browse our wide selection of clothing, accessories, and more with fast delivery and excellent customer service.",
  keywords: "fashion shop, clothing, online shopping, birds eye fashion, trendy clothes",
  openGraph: {
    title: "Shop - Birds Eye Fashion",
    description: "Shop the latest fashion trends at Birds Eye Fashion. Browse our wide selection of clothing, accessories, and more.",
    type: "website",
  },
};

interface CategoriesResponse {
  categories: ICategory[];
}

function ShopLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, productIndex) => (
                  <ProductCardSkeleton key={productIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function ShopPage() {
  let categories: ICategory[] = [];
  let error = false;

  try {
    const data: CategoriesResponse = await apiClient.getAllProductsGroupByCategories();
    categories = (data.categories || []).filter(
      item => item.products && item.products.length > 0
    );
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    error = true;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Shop</h1>
            <p className="text-muted-foreground">Unable to load products at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Shop</h1>
          <p className="text-muted-foreground">Discover our latest fashion collections</p>
        </div>
        
        <div className="space-y-16">
          {categories.map((category, index) => (
            <Suspense key={category.id} fallback={<ShopLoading />}>
              <CategorySectionServer category={category} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}


