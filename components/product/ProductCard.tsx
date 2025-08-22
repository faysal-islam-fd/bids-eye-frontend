"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IProduct } from "@/types";
import { fadeIn } from "@/lib/animations";
import { ProductImage } from "@/components/ui/optimized-image";
import Link from "next/link";

export const ProductCardBase = ({
  product,
  index,
}: {
  product: IProduct;
  index: number;
}) => {
  return (
    <Link href={`/product/${product.slug}`} className="block">
      <motion.div
        key={product.id}
        variants={fadeIn("up", index * 0.1)}
        className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-square">
          <ProductImage
            src={product.image || ''}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            priority={index < 4}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">{product.category?.name}</span>
          </div>
          
          {/* Price overlay on hover */}
          <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  {product?.has_variations ? (
                    <p className="text-lg font-bold text-gray-900">
                      ৳{product.first_combination && product.first_combination.price}
                    </p>
                  ) : (
                    <p className="text-lg font-bold text-gray-900">৳{product.price}</p>
                  )}
                </div>
                <div className="bg-gray-900 hover:bg-blue-600 rounded-full p-2 transition-colors duration-300">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Default content (when not hovering) */}
        <div className="p-3 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            {product?.has_variations ? (
              <p className="text-sm font-bold text-gray-900">
                ৳{product.first_combination && product.first_combination.price}
              </p>
            ) : (
              <p className="text-sm font-bold text-gray-900">৳{product.price}</p>
            )}
            <div className="w-6 h-0.5 bg-blue-400" />
          </div>
        </div>
        
        {/* Subtle border */}
        <div className="absolute inset-0 border border-gray-100 rounded-lg group-hover:border-blue-400/30 transition-all duration-300" />
      </motion.div>
    </Link>
  );
};
