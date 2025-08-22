"use client";

import { motion } from "framer-motion";
import { Package, Truck, Box, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderType } from "@/app/types/oreders";
import { IOrder } from "@/types";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface OrderTimelineProps {
  order: IOrder | undefined;
  isLoading: boolean;
}
export interface IOrderStep {
  icon: React.ElementType; // Icon component
  title: string; // Title of the step
  description: string; // Description of the step
  date: string; // Date of the step in a formatted string
}
export const generateOrderSteps = (order: IOrder) => {
  const steps: IOrderStep[] = [
    {
      icon: Package,
      title: "Order Confirmed",
      description: "Your order has been confirmed and is being processed",
      date: order.confirmed ? formatDate(order.confirmed_at) : "Pending",
    },
    {
      icon: Box,
      title: "Order Packed",
      description: "Your items have been packed and are ready for shipping",
      // date: order.packed ? formatDate(order.packed_at) : "Pending",
      date: order.packed ? formatDate(order.packed_at) : "Pending",
    },
    {
      icon: Truck,
      title: "In Transit",
      description: "Your package is on its way to you",
      date: order.in_transit ? formatDate(order.in_transit_at) : "Pending",
    },
    {
      icon: CheckCircle,
      title: "Delivered",
      description: order.delivered
        ? "Your package has been delivered"
        : `Expected by ${formatDate(order.estimated_delivery_date)}`,
      date: order.delivered ? formatDate(order.delivered_at) : "Pending",
    },
  ];

  return steps;
};

export default function OrderTimeline({
  isLoading,
  order,
}: OrderTimelineProps) {
  if (isLoading) {
    return <TimelineSkeleton />;
  }

  // const currentStep = 2;
  const [currentStep, setCurrentStep] = useState(0);

  const [steps, setSteps] = useState<IOrderStep[]>([]);

  useEffect(() => {
    if (order) {
      setSteps(generateOrderSteps(order));
      for (let index = 0; index < generateOrderSteps(order).length; index++) {
        if (generateOrderSteps(order)[index].date !== "Pending") {
          setCurrentStep(currentStep + 1);
        } else {
          break;
        }
      }
    }
  }, [order]);

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
      <h2 className="text-xl font-semibold mb-8">Order Timeline</h2>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(currentStep / (steps.length - 1)) * 100}%` }}
            className="absolute top-0 left-0 w-full bg-primary"
            transition={{ duration: 1 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStep;
            const isPending = index === currentStep + 1;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start pl-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : isPending
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3
                    className={`font-medium ${
                      isActive ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {step.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{step.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="space-y-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start pl-16 relative">
            <Skeleton className="absolute left-0 w-12 h-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
