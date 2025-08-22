"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import NextImage from "next/image";
import { OrderType } from "@/app/types/oreders";
import productApiSlice from "@/redux/api/productsApiSlice";
import orderApiSlice from "@/redux/api/orderApiSlice";
import userApiSlice from "@/redux/api/userApiSlice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IOrder } from "@/types";
import { Config } from "@/config/Config";

interface OrderDetailsProps {
  order?: IOrder | undefined;
  isLoading: boolean;
}

export default function OrderDetails({ isLoading, order }: OrderDetailsProps) {
  if (isLoading) {
    return <DetailsSkeleton />;
  }

  const items = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop",
      color: "White",
      size: "L",
    },
    {
      id: 2,
      name: "Slim Fit Denim Jeans",
      price: 79.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop",
      color: "Blue",
      size: "32",
    },
  ];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 divide-y divide-gray-100"
    >
      {/* Order Items */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Order Items</h2>
        <div className="space-y-6">
          {order?.order_products.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex space-x-4"
            >
              <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-gray-50">
                <NextImage
                  src={Config.BACKEND_STORASE_URL + "/" + item.product.image}
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                {item.combination ? (
                  <p className="text-sm text-gray-500">
                    {item.combination.sku}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">{item.product.sku}</p>
                )}

                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="font-medium">
                    {(Number(item.total) * Number(item.quantity)).toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>{order?.total_price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-medium text-lg pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>{order?.total_price.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <div className="text-gray-600">{order?.shipping_address}</div>
      </div>
    </motion.div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 divide-y divide-gray-100">
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        {[1, 2].map((i) => (
          <div key={i} className="flex space-x-4 mb-6">
            <Skeleton className="h-20 w-20 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between pt-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
