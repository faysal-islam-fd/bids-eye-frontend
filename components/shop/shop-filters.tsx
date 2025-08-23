"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function ShopFilters({ setQStr, subCategories }: { setQStr?: (value: string) => void; subCategories?: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const queryString = `?q=${encodeURIComponent(searchTerm.trim())}`;
      router.push("/search" + queryString);
      setQStr?.(queryString);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    setSearchTerm(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Search & Filters</h2>
            <p className="text-sm text-gray-600">Find your perfect products</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Search Products</label>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <Button 
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
            disabled={!searchTerm.trim()}
          >
            Search
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Quick Filters</label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => {
                const queryString = "?q=shirt";
                router.push("/search" + queryString);
                setQStr?.(queryString);
              }}
            >
              <span className="text-sm">Shirts</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => {
                const queryString = "?q=pants";
                router.push("/search" + queryString);
                setQStr?.(queryString);
              }}
            >
              <span className="text-sm">Pants</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 px-3"
              onClick={() => {
                const queryString = "?q=shoes";
                router.push("/search" + queryString);
                setQStr?.(queryString);
              }}
            >
              <span className="text-sm">Shoes</span>
            </Button>
          </div>
        </div>

        {/* Category Navigation */}
        {subCategories && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Categories</label>
            <div className="space-y-2">
              {subCategories.children?.map((subCategory: any) => (
                <Button
                  key={subCategory.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    const queryString = `?q=${encodeURIComponent(subCategory.name)}`;
                    router.push("/search" + queryString);
                    setQStr?.(queryString);
                  }}
                >
                  <span className="text-sm">{subCategory.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            Use the search bar to find specific products or click quick filters for popular categories.
          </p>
        </div>
      </div>
    </motion.aside>
  );
}
