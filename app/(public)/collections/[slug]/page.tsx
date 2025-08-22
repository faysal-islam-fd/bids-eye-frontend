import { Suspense } from "react";
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api";
import { IProduct } from "@/types";
import { ProductCardBase } from "@/components/product/ProductCard";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";
import { Metadata } from "next";

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

interface CollectionProductsResponse {
  products: IProduct[];
  collection?: {
    name: string;
    description?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  try {
    const data: CollectionProductsResponse = await apiClient.getProductsByCollectionSlug(params.slug);
    const collectionName = data.collection?.name || "Collection";
    const description = data.collection?.description || `Shop ${collectionName} at Birds Eye Fashion. Discover our curated selection of premium fashion items.`;

    return {
      title: `${collectionName} - Birds Eye Fashion`,
      description,
      keywords: `${collectionName}, fashion collection, clothing, birds eye fashion, online shopping`,
      openGraph: {
        title: `${collectionName} - Birds Eye Fashion`,
        description,
        type: "website",
      },
    };
  } catch (error) {
    return {
      title: "Collection - Birds Eye Fashion",
      description: "Shop our curated fashion collections at Birds Eye Fashion.",
    };
  }
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  let products: IProduct[] = [];
  let collectionName = "Collection";
  let error = false;

  try {
    const data: CollectionProductsResponse = await apiClient.getProductsByCollectionSlug(params.slug);
    products = data.products || [];
    collectionName = data.collection?.name || "Collection";
  } catch (err) {
    console.error("Failed to fetch collection products:", err);
    error = true;
  }

  if (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{collectionName}</h1>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <Suspense fallback={<ProductsLoading />}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCardBase
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        </Suspense>

        {products.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground">This collection doesn't have any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
