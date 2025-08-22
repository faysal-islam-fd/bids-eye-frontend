import { Suspense } from "react";
import { apiClient } from "@/lib/api";
import { IProduct } from "@/types";
import { Metadata } from "next";
import SearchPageClient from "@/components/search/SearchPageClient";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  
  return {
    title: query ? `Search: ${query} - Birds Eye Fashion` : "Search - Birds Eye Fashion",
    description: query 
      ? `Search results for "${query}" at Birds Eye Fashion. Find the perfect fashion items from our collection.`
      : "Search for fashion items at Birds Eye Fashion. Discover clothing, accessories, and more.",
    keywords: `search, ${query}, fashion, clothing, birds eye fashion`,
    openGraph: {
      title: query ? `Search: ${query} - Birds Eye Fashion` : "Search - Birds Eye Fashion",
      description: query 
        ? `Search results for "${query}" at Birds Eye Fashion.`
        : "Search for fashion items at Birds Eye Fashion.",
      type: "website",
    },
  };
}

interface SearchResponse {
  products: IProduct[];
  count: number;
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  let initialData: SearchResponse | null = null;
  let error = false;

  // Only fetch if there's a search query
  if (query.trim()) {
    try {
      const queryString = `?q=${encodeURIComponent(query)}`;
      initialData = await apiClient.searchProducts(queryString);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      error = true;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<SearchLoading />}>
          <SearchPageClient
            initialQuery={query}
            initialData={initialData}
            error={error}
          />
        </Suspense>
      </div>
    </div>
  );
}