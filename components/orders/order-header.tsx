"use client";

import { formatDate } from "@/lib/utils";
import { IOrder } from "@/types";
import { motion } from "framer-motion";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderHeaderProps {
  orderId: string;
  order: IOrder | undefined;
}

export default function OrderHeader({ orderId, order }: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-4"
      >
        <Link
          href="/profile"
          className="flex items-center text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Orders
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center space-x-3"
      >
        <Package className="w-6 h-6 text-primary" />
        <div className="text-right">
          <h1 className="text-2xl font-bold">Order #{orderId}</h1>
          <p className="text-sm text-gray-600">
            Placed on {formatDate(order?.created_at as string)}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
