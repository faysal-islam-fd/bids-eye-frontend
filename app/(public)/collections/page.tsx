import { Suspense } from "react";
import { apiClient } from "@/lib/api";
import { ICollection } from "@/types";
import { Metadata } from "next";
import CollectionSectionServer from "@/components/collections/CollectionSectionServer";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";

export const metadata: Metadata = {
  title: "Collections - Birds Eye Fashion",
  description: "Explore our curated fashion collections. Discover the latest trends in clothing and accessories at Birds Eye Fashion.",
  keywords: "fashion collections, clothing, accessories, birds eye fashion, online shopping",
  openGraph: {
    title: "Collections - Birds Eye Fashion",
    description: "Explore our curated fashion collections. Discover the latest trends in clothing and accessories.",
    type: "website",
  },
};

interface CollectionsResponse {
  collections: ICollection[];
}

function CollectionsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          {Array.from({ length: 3 }).map((_, index) => (
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

export default async function CollectionsPage() {
  let collections: ICollection[] = [];
  let error = false;

  try {
    const data: CollectionsResponse = await apiClient.getAllCollectionsWithProducts();
    collections = (data.collections || []).filter(
      item => item.products && item.products.length > 0
    );
  } catch (err) {
    console.error("Failed to fetch collections:", err);
    error = true;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Collections</h1>
            <p className="text-muted-foreground">Unable to load collections at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-16">
          {collections.map((collection, index) => (
            <Suspense key={collection.id} fallback={<CollectionsLoading />}>
              <CollectionSectionServer collection={collection} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}


