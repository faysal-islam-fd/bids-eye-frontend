"use client";

import { motion, AnimatePresence } from "framer-motion";
import CartItem from "./cart-item";
import { CartItemType } from "@/app/types/cart";
import { Skeleton } from "@/components/ui/skeleton";
import { groupByCategory } from "@/lib/cart-utils";
import { ICartProduct } from "@/redux/slice/cartSlice";

interface CartCategoriesProps {
  items: ICartProduct[];
  isLoading: boolean;
}

export default function CartCategories({
  items,
  isLoading,
}: CartCategoriesProps) {
  if (isLoading) {
    return <CartCategoriesSkeleton />;
  }

  return (
    <div className="space-y-8">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 * 0.1 }}
          className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden"
        >
          <div className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CartCategoriesSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2].map((j) => (
              <div key={j} className="p-6">
                <div className="flex space-x-4">
                  <Skeleton className="h-24 w-24 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
