"use client";

import { motion } from "framer-motion";
import OrderHeader from "@/components/orders/order-header";
import OrderTimeline from "@/components/orders/order-timeline";
import OrderDetails from "@/components/orders/order-details";
import OrderMap from "@/components/orders/order-map";
import { useOrderTracking } from "@/hooks/use-order-tracking";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import userApiSlice from "@/redux/api/userApiSlice";
import { IOrder } from "@/types";

export default function OrderTrackingPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = useParams();
  const { data, isSuccess, isLoading } = userApiSlice.useGetOrderDetailsQuery(
    id,
    {
      skip: !id,
    }
  );
  const [order, setOrder] = useState<IOrder>();
  useEffect(() => {
    if (data?.order) {
      setOrder(data?.order);
    }
  }, [data, isSuccess]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <OrderHeader order={order} orderId={params.id} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <OrderTimeline order={order} isLoading={isLoading} />
              {/* <OrderMap order={order} isLoading={isLoading} /> */}
            </div>
            <div className="lg:col-span-1">
              <OrderDetails order={order} isLoading={isLoading} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
