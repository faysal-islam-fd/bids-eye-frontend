"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";

const wishlistItems = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: "29.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Classic Leather Watch",
    price: "149.99",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=150&h=150&fit=crop"
  }
];

export default function WishlistTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Wishlist</h2>
        <span className="text-sm text-gray-600">
          {wishlistItems.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-4 relative group"
          >
            <div className="flex space-x-4">
              <div className="w-24 h-24 rounded-lg overflow-hidden relative">
                <NextImage
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">{item.name}</h3>
                <p className="text-primary font-semibold">৳ {item.price}</p>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}