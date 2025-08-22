"use client";

import { motion, AnimatePresence } from "framer-motion";
import {  ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface SearchSuggestionsProps {
  show: boolean;
}

export default function SearchSuggestions({ show }: SearchSuggestionsProps) {
  const suggestions = [
    { text: "Premium T-Shirts", count: 128 },
    { text: "Summer Collection", count: 96 },
    { text: "Denim Jeans", count: 84 },
    { text: "Casual Shoes", count: 72 }
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
            <div className="flex items-center space-x-2 mb-4 text-primary">
              <TrendingUp className="w-5 h-5" />
              <h3 className="font-semibold">Trending Searches</h3>
            </div>
            <div className="space-y-2">
              {suggestions.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href="/" className="group block">
                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{item.text}</span>
                        <span className="text-xs text-gray-400">{item.count} items</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}