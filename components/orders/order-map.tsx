
"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderType } from "@/app/types/oreders";

interface OrderMapProps {
  order?: OrderType;
  isLoading: boolean;
}

export default function OrderMap({ isLoading }: OrderMapProps) {
  if (isLoading) {
    return <MapSkeleton />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Delivery Route</h2>
          <div className="flex items-center text-sm text-gray-600">
            <Navigation className="w-4 h-4 mr-1.5" />
            <span>Live Tracking</span>
          </div>
        </div>
      </div>
      
      <div className="relative aspect-[16/9] bg-gray-50">
        {/* Map would be integrated here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-gray-600">Map integration coming soon</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <p className="font-medium">Current Location</p>
            <p className="text-sm text-gray-600">Distribution Center, New York</p>
          </div>
          <div className="flex-1">
            <p className="font-medium">Destination</p>
            <p className="text-sm text-gray-600">123 Main St, Brooklyn, NY 11201</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-primary">2.5 hrs</p>
            <p className="text-sm text-gray-600">Estimated Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <Skeleton className="h-8 w-48" />
      </div>
      <Skeleton className="aspect-[16/9]" />
      <div className="p-6 bg-gray-50">
        <div className="flex items-start space-x-4">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="w-24 space-y-2">
            <Skeleton className="h-5 w-16 ml-auto" />
            <Skeleton className="h-4 w-24 ml-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}