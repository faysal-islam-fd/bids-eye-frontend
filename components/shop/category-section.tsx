
"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: 1, name: "New Arrivals", count: 24 },
  { id: 2, name: "Best Sellers", count: 18 },
  { id: 3, name: "Summer Collection", count: 32 },
  { id: 4, name: "Winter Essentials", count: 15 },
  { id: 5, name: "Accessories", count: 27 },
  { id: 6, name: "Footwear", count: 21 }
];

export function CategoriesSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 overflow-x-auto"
    >
      <div className="flex space-x-4 pb-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category.name} ({category.count})
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}