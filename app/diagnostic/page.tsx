"use client";

import { useEffect, useState } from "react";
import { Config } from "@/config/Config";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface EndpointStatus {
  name: string;
  url: string;
  status: "loading" | "success" | "error";
  message?: string;
  responseTime?: number;
}

export default function DiagnosticPage() {
  const [endpoints, setEndpoints] = useState<EndpointStatus[]>([
    {
      name: "Featured Products",
      url: `${Config.BACKEND_API_URL}/products/featured-products`,
      status: "loading"
    },
    {
      name: "Categories",
      url: `${Config.BACKEND_API_URL}/categories/with-subcategories`,
      status: "loading"
    },
    {
      name: "Collections",
      url: `${Config.BACKEND_API_URL}/collections/view-with-products`,
      status: "loading"
    }
  ]);

  const [isCheckingConnection, setIsCheckingConnection] = useState(true);
  const [globalStatus, setGlobalStatus] = useState<"loading" | "success" | "error">("loading");
  const [networkInfo, setNetworkInfo] = useState({ online: true });

  const checkEndpoint = async (endpoint: EndpointStatus, index: number) => {
    const startTime = performance.now();
    
    try {
      const response = await fetch(endpoint.url, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Short timeout to avoid long waits
        signal: AbortSignal.timeout(5000)
      });
      
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      
      if (response.ok) {
        updateEndpointStatus(index, {
          status: "success",
          message: `HTTP ${response.status} OK`,
          responseTime
        });
      } else {
        updateEndpointStatus(index, {
          status: "error",
          message: `HTTP ${response.status} ${response.statusText}`,
          responseTime
        });
      }
    } catch (error: any) {
      updateEndpointStatus(index, {
        status: "error",
        message: error.name === "AbortError" 
          ? "Timeout (>5s)" 
          : error.message || "Network error"
      });
    }
  };

  const updateEndpointStatus = (index: number, update: Partial<EndpointStatus>) => {
    setEndpoints(prevEndpoints => {
      const newEndpoints = [...prevEndpoints];
      newEndpoints[index] = { ...newEndpoints[index], ...update };
      return newEndpoints;
    });
  };

  const runAllChecks = () => {
    setIsCheckingConnection(true);
    setGlobalStatus("loading");
    
    // Reset all endpoints
    setEndpoints(prevEndpoints => 
      prevEndpoints.map(endpoint => ({ ...endpoint, status: "loading", message: undefined, responseTime: undefined }))
    );
    
    // Check network connectivity
    setNetworkInfo({ online: navigator.onLine });
    
    // Check each endpoint
    endpoints.forEach((endpoint, index) => {
      checkEndpoint(endpoint, index);
    });
  };

  // Update global status whenever endpoints change
  useEffect(() => {
    if (!isCheckingConnection) return;
    
    const allFinished = endpoints.every(endpoint => endpoint.status !== "loading");
    
    if (allFinished) {
      const hasErrors = endpoints.some(endpoint => endpoint.status === "error");
      setGlobalStatus(hasErrors ? "error" : "success");
      setIsCheckingConnection(false);
    }
  }, [endpoints, isCheckingConnection]);

  // Run checks on initial load
  useEffect(() => {
    runAllChecks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Connection Diagnostic</h1>
          <p className="mt-2 text-gray-600">
            Check your connection to the Birdseyefashion API services
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">
              Network Status
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className={`h-4 w-4 rounded-full mr-2 ${networkInfo.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-700">
                {networkInfo.online ? 'Your device is online' : 'Your device is offline'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">API Endpoints</h3>
            
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full mr-2 ${
                globalStatus === "loading" ? "bg-yellow-500" :
                globalStatus === "success" ? "bg-green-500" : "bg-red-500"
              }`}></div>
              <span className="text-sm text-gray-600">
                {globalStatus === "loading" ? "Testing..." :
                 globalStatus === "success" ? "All endpoints working" : "Some endpoints failed"}
              </span>
            </div>
          </div>
          
          <ul className="divide-y divide-gray-200">
            {endpoints.map((endpoint, index) => (
              <motion.li 
                key={endpoint.url}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-4 sm:px-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {endpoint.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {endpoint.url}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    {endpoint.status === "loading" ? (
                      <div className="h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : endpoint.status === "success" ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        OK ({endpoint.responseTime}ms)
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Failed: {endpoint.message}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between">
          <Button
            onClick={runAllChecks}
            disabled={isCheckingConnection}
            className="mb-4 sm:mb-0"
          >
            {isCheckingConnection ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Testing...
              </>
            ) : "Run Tests Again"}
          </Button>
          
          <div className="space-x-4">
            <Link href="/">
              <Button variant="outline">
                Return to Homepage
              </Button>
            </Link>
            
            <Link href={`${Config.BACKEND_BASE_URL}`} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                Visit API Server
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

