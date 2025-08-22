"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ConnectionErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function ConnectionError({
  message = "We're having trouble connecting to our servers",
  onRetry
}: ConnectionErrorProps) {
  const router = useRouter();
  
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Refresh the current page
      router.refresh();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col items-center justify-center p-8 bg-red-50 border border-red-100 rounded-lg text-center my-8"
    >
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Connection Error
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. This might be due to a network issue or our servers may be temporarily unavailable.
      </p>
      
      <button
        onClick={handleRetry}
        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </button>
    </motion.div>
  );
}

