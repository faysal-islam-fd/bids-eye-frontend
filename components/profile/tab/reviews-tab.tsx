"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import NextImage from "next/image";

const reviews = [
  {
    id: 1,
    productName: "Premium Cotton T-Shirt",
    rating: 5,
    date: "Mar 15, 2024",
    comment: "Excellent quality and perfect fit. Highly recommended!",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    productName: "Classic Leather Watch",
    rating: 4,
    date: "Mar 10, 2024",
    comment: "Beautiful design and comfortable to wear. Great value for money.",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop"
  }
];

export default function ReviewsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Reviews</h2>
        <span className="text-sm text-gray-600">{reviews.length} reviews</span>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <div className="flex space-x-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                <NextImage
                  src={review.image}
                  alt={review.productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{review.productName}</h3>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}