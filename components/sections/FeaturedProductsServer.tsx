import { apiClient, handleApiError } from "@/lib/api";
import { IProduct } from "@/types";
import { ProductCardBase } from "../product/ProductCard";
import FeaturedProductsClient from "./FeaturedProductsClient";

interface FeaturedProductsData {
  products: IProduct[];
}

export default async function FeaturedProductsServer() {
  let products: IProduct[] = [];
  let error = false;

  try {
    const data: FeaturedProductsData = await apiClient.getFeaturedProducts();
    products = data.products || [];
  } catch (err) {
    console.error("Failed to fetch featured products:", err);
    error = true;
  }

  if (error) {
    return (
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked products for you</p>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load featured products at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 relative">
        {/* Clean Header Section */}
        <div className="text-center mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-blue-700 mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-semibold">Featured Products</span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Trending Products
          </h2>
          
          {/* Subtitle */}
          <p className="text-base text-gray-600 max-w-xl mx-auto mb-6">
            Discover our handpicked selection of premium fashion pieces
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">{products.length}+</div>
              <div className="text-xs">Featured Items</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">Premium</div>
              <div className="text-xs">Quality</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 mb-1">Fast</div>
              <div className="text-xs">Delivery</div>
            </div>
          </div>
        </div>

        {/* Cool Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <ProductCardBase
                key={product.id}
                index={index}
                product={product}
              />
            </div>
          ))}
        </div>
        
        {/* Clean CTA Section */}
        <div className="text-center mt-8">
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <button className="group px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-1">
                View All Products
                <svg 
                  className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 hover:border-blue-300 hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-1">
                Shop Collections
                <svg 
                  className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>


    </section>
  );
}
