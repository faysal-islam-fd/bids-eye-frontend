

"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

export function ShopHeader() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="sticky top-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            EasyFashion
          </motion.h1>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative w-64">
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                0
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}