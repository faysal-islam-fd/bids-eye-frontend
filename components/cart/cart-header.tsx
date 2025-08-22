"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-4"
      >
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Continue Shopping
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-2"
      >
        <ShoppingBag className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
          {itemCount}
        </span>
      </motion.div>
    </div>
  );
}