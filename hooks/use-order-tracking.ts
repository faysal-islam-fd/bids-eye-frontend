

"use client";

import { OrderType } from "@/app/types/oreders";
import { useState, useEffect } from "react";

export function useOrderTracking(orderId: string) {
  const [order, setOrder] = useState<OrderType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  return { order, isLoading };
}