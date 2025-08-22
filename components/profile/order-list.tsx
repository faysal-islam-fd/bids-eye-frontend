"use client";

import { Config } from "@/config/Config";
import userApiSlice from "@/redux/api/userApiSlice";
import { IOrder } from "@/types";
import { motion } from "framer-motion";
import {  ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/optimized-image";

const orders = [
  {
    id: "ORD001",
    date: "Mar 15, 2024",
    status: "Delivered",
    total: "249.99",
    items: [
      {
        name: "Premium Cotton T-Shirt",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      },
    ],
  },
  {
    id: "ORD002",
    date: "Mar 12, 2024",
    status: "In Transit",
    total: "189.99",
    items: [
      {
        name: "Slim Fit Denim Jeans",
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
      },
    ],
  },
];

export default function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess } = userApiSlice.useGetAllOrdersQuery({
    limit: 5,
    page: currentPage,
  });
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    if (data?.orders) {
      setOrders([...orders, ...data?.orders]);
    }
  }, [isSuccess, data]);

  const getStatus = (order: IOrder) => {
    let status = "Pending";
    if (order.confirmed) {
      status = "Confirmed";
    }
    if (order.packed) {
      status = "Packed";
    }
    if (order.in_transit) {
      status = "In transit";
    }
    if (order.delivered) {
      status = "Delivered";
    }

    return status;
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                  {order?.order_products && (
                    <OptimizedImage
                      src={
                        Config.BACKEND_STORASE_URL +
                        "/" +
                        order.order_products[0]?.product.image
                      }
                      alt={order.order_products[0]?.product?.name}
                      fill
                      sizes="64px"
                      quality={80}
                    />
                  )}
                </div>
                <div>
                  <div className="font-medium">{order.tran_id}</div>
                  <div className="text-sm text-gray-600">
                    {formatDate(order.created_at)}
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {getStatus(order)}
                  </div>
                </div>
              </div>
              <Link
                href={"/orders/" + order.id}
                className="flex items-center space-x-6"
              >
                <div className="text-right">
                  <div className="font-medium">৳ {order.total_price}</div>
                  <div className="text-sm text-gray-600">
                    {order.order_products_count} items
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={() => setCurrentPage(currentPage + 1)}>
          Load more
        </Button>
      </div>
    </div>
  );
}
