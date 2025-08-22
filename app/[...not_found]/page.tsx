
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Home, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import SearchSuggestions from "@/components/404/search-suggestions";


export default function NotFound() {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Animated 404 Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <ShoppingBag className="w-20 h-20 text-primary" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            404
          </h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! Looks like this page has gone shopping. Let's help you find what you're looking for.
          </p>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/" className="w-full">
              <Button
                variant="outline"
                className="w-full h-12 text-lg hover:bg-primary hover:text-white transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              className="w-full h-12 text-lg"
              onClick={() => setShowSuggestions(!showSuggestions)}
            >
              <Search className="w-5 h-5 mr-2" />
              Search Products
            </Button>
          </div>

          {/* Search Suggestions */}
          <SearchSuggestions show={showSuggestions} />

          {/* Featured Categories */}
          <div className="text-left bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "New Arrivals",
                "Best Sellers",
                "Sale Items",
                "Men's Fashion",
                "Women's Fashion",
                "Accessories"
              ].map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href="/" className="group block">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors">
                      <span className="text-sm font-medium">{category}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}