import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { apiClient } from "@/lib/api";
import { IProduct, IProductImage } from "@/types";
import { Metadata } from "next";
import { ConnectionError } from "@/components/ui/connection-error";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

interface ProductResponse {
  product: IProduct;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  try {
    const data: ProductResponse = await apiClient.getProductDetails(params.slug);
    const product = data.product;

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: `${product.name} - Birds Eye Fashion`,
      description: product.description || `Buy ${product.name} at Birds Eye Fashion. High quality fashion items with fast delivery.`,
      keywords: `${product.name}, fashion, clothing, online shopping, birds eye fashion`,
      openGraph: {
        title: `${product.name} - Birds Eye Fashion`,
        description: product.description || `Buy ${product.name} at Birds Eye Fashion.`,
        type: "website",
        images: [
          {
            url: product.image?.startsWith('http') ? product.image : `https://api.birdseyefashion.com/storage/app/public/${product.image}`,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} - Birds Eye Fashion`,
        description: product.description || `Buy ${product.name} at Birds Eye Fashion.`,
        images: [product.image?.startsWith('http') ? product.image : `https://api.birdseyefashion.com/storage/app/public/${product.image}`],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

// Generate static params for popular products (optional)
export async function generateStaticParams() {
  // You can implement this to pre-generate popular product pages
  return [];
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  let product: IProduct | null = null;
  let error = false;

  try {
    // Fetch product data with optimized caching
    const data: ProductResponse = await apiClient.getProductDetails(params.slug);
    product = data.product;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    error = true;
  }

  if (error || !product) {
    // Instead of just sending to 404, show a connection error component
    // which will allow the user to retry the request
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <ConnectionError 
          message="We couldn't load this product's information" 
        />
      </div>
    );
  }

  const newImages: IProductImage[] = [
    { id: 0, image: product.image ?? "", product_id: product.id ?? 0 },
    ...(product.product_images ?? []),
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Hero Product Section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Gallery */}
            <div className="relative">
              <ProductGallery product_images={newImages} />
            </div>
            
            {/* Product Info */}
            <div className="relative">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
        
        {/* Related Products Section - Load in parallel */}
        <div className="bg-gray-50 py-12">
          <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-4">
                      <div className="aspect-[3/4] bg-gray-200 rounded-lg"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <RelatedProducts />
          </Suspense>
        </div>
      </main>
    </>
  );
}
