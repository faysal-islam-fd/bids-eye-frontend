import { Suspense } from "react";
import HeroSliderServer from "@/components/sections/HeroSliderServer";
import CategoriesServer from "@/components/sections/CategoriesServer";
import FeaturedProductsServer from "@/components/sections/FeaturedProductsServer";
import Newsletter from "@/components/sections/Newsletter";
import { FeaturedSection } from "@/components/sections/FeaturedSection";
import { MessageCircleCode } from "lucide-react";
import { ProductCardSkeleton } from "@/components/skeleton/ProductSkeleton";
import CategorySkeleton from "@/components/skeleton/CategorySkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birds Eye Fashion - Premium Fashion Collection",
  description: "Discover premium fashion collections at Birds Eye Fashion. Shop the latest trends in clothing, accessories, and more with fast delivery and excellent customer service.",
  keywords: "fashion, clothing, premium fashion, online shopping, birds eye fashion",
  openGraph: {
    title: "Birds Eye Fashion - Premium Fashion Collection",
    description: "Discover premium fashion collections at Birds Eye Fashion. Shop the latest trends in clothing, accessories, and more.",
    type: "website",
    url: "https://birdseyefashion.com",
    images: [
      {
        url: "https://api.birdseyefashion.com/storage/app/public/logo-big.png",
        width: 1200,
        height: 630,
        alt: "Birds Eye Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Birds Eye Fashion - Premium Fashion Collection",
    description: "Discover premium fashion collections at Birds Eye Fashion.",
    images: ["https://api.birdseyefashion.com/storage/app/public/logo-big.png"],
  },
};

// Loading components
function FeaturedProductsLoading() {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">Handpicked products for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroSliderServer />
        <FeaturedSection />
        
        <Suspense fallback={<CategorySkeleton />}>
          <CategoriesServer />
        </Suspense>
        
        <Suspense fallback={<FeaturedProductsLoading />}>
          <FeaturedProductsServer />
        </Suspense>
        
        <Newsletter />
      </main>

      {/* Compact Floating Contact Button */}
      <div className="fixed bottom-4 left-4 z-50">
        <a
          href="https://www.messenger.com/t/489636774423136/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-blue-600 rounded-full opacity-15 blur-sm group-hover:opacity-25 transition-all duration-300" />
          
          {/* Main Button */}
          <div className="relative flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <MessageCircleCode className="w-4 h-4" />
          </div>
        </a>
      </div>
    </>
  );
}
