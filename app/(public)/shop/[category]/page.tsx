import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api";
import { ICategory, IProduct } from "@/types";
import { Metadata } from "next";
import CategoryPageClient from "@/components/shop/CategoryPageClient";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    sub_id?: string;
  };
}

interface CategoryResponse {
  category: ICategory;
  children?: ICategory;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const data: CategoryResponse = await apiClient.getProductsByCategory(params.category, 12, 1);
    const categoryName = data.category?.name || "Category";
    const description = `Shop ${categoryName} at Birds Eye Fashion. Discover our premium collection of ${categoryName.toLowerCase()} with fast delivery and excellent customer service.`;

    return {
      title: `${categoryName} - Birds Eye Fashion`,
      description,
      keywords: `${categoryName}, fashion, clothing, online shopping, birds eye fashion`,
      openGraph: {
        title: `${categoryName} - Birds Eye Fashion`,
        description,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Category - Birds Eye Fashion",
      description: "Shop our fashion categories at Birds Eye Fashion.",
    };
  }
}

function CategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  let initialData: CategoryResponse | null = null;
  let error = false;

  try {
    const data = await apiClient.getProductsByCategory(
      params.category, 
      12, 
      1, 
      searchParams.sub_id
    );
    initialData = data;
  } catch (err) {
    console.error("Failed to fetch category data:", err);
    error = true;
  }

  if (error || !initialData?.category) {
    notFound();
  }

  // Pass initial server-rendered data to client component
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageClient
        categoryId={params.category}
        initialData={initialData}
        subId={searchParams.sub_id}
      />
    </Suspense>
  );
}