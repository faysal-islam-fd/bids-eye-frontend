import { apiClient } from "@/lib/api";
import { ICategoryWithCount } from "@/types";
import { ServerCategoryImage } from "../ui/server-image";
import Link from "next/link";
import { Suspense } from "react";

interface CategoriesData {
  categories: ICategoryWithCount[];
}

export default async function CategoriesServer() {
  let categories: ICategoryWithCount[] = [];
  let error = false;

  try {
    const data: CategoriesData = await apiClient.getCategoriesByProductCount();
    // Filter categories with images
    categories = (data.categories || []).filter(item => item.image !== null);
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    error = true;
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
          </div>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Unable to load categories at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100" />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-6 relative">
        {/* Clean Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-600 mb-4 shadow-sm">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-medium">Explore Categories</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Shop by Category
          </h2>
          
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Discover our curated collections designed for every style and occasion
          </p>
        </div>

        {/* Cool Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/shop/${category.slug}`}>
              <div className="group relative cursor-pointer">
                {/* Cool Card Container */}
                <div className="relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 aspect-square">
                  
                  {/* Background Image */}
                  <ServerCategoryImage
                    src={category.image || ''}
                    alt={category.name}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-300"
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-3">
                    {/* Top - Product Count */}
                    <div className="flex justify-end">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white text-xs font-medium">{category.products_count}</span>
                      </div>
                    </div>
                    
                    {/* Bottom - Category Name */}
                    <div>
                      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <div className="w-8 h-0.5 bg-blue-400 group-hover:w-12 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Subtle Border */}
                  <div className="absolute inset-0 border border-white/10 rounded-lg group-hover:border-blue-400/30 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link href="/shop">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <span className="relative flex items-center gap-2">
                View All Products
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
