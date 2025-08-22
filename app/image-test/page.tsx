"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Config } from "@/config/Config";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function ImageTestPage() {
  const [testResults, setTestResults] = useState<Array<{
    url: string;
    description: string;
    status: "loading" | "success" | "error";
  }>>([
    {
      url: "/logo.png",
      description: "Local public image",
      status: "loading",
    },
    {
      url: "/logo-big.png",
      description: "Local larger image",
      status: "loading",
    },
    {
      url: `${Config.BACKEND_STORASE_URL}/logo.png`,
      description: "API storage image",
      status: "loading",
    },
    {
      url: "https://api.birdseyefashion.com/storage/app/public/logo-big.png",
      description: "Full URL API image",
      status: "loading",
    }
  ]);

  const handleImageLoad = (index: number) => {
    setTestResults(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: "success" };
      return updated;
    });
  };

  const handleImageError = (index: number) => {
    setTestResults(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status: "error" };
      return updated;
    });
  };

  const retestAll = () => {
    setTestResults(prev => 
      prev.map(item => ({ ...item, status: "loading" }))
    );
    
    // Force reload of images by adding a timestamp
    setTimeout(() => {
      setTestResults(prev => 
        prev.map(item => ({ 
          ...item, 
          url: item.url.includes('?') 
            ? item.url.split('?')[0] + '?t=' + Date.now() 
            : item.url + '?t=' + Date.now() 
        }))
      );
    }, 100);
  };

  // Add a placeholder test
  useEffect(() => {
    setTestResults(prev => [
      ...prev,
      {
        url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzIyYWE5OSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiI+UGxhY2Vob2xkZXIgSW1hZ2U8L3RleHQ+PC9zdmc+",
        description: "Placeholder image (data URL)",
        status: "loading"
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Loading Test</h1>
          <p className="mt-2 text-gray-600">
            Diagnosing image loading issues
          </p>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">
              Configuration
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Base URL</dt>
                <dd className="mt-1 text-sm text-gray-900">{Config.BACKEND_BASE_URL}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Storage URL</dt>
                <dd className="mt-1 text-sm text-gray-900">{Config.BACKEND_STORASE_URL}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-8">
          {testResults.map((test, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                <h4 className="text-lg font-medium text-gray-900">
                  {test.description}
                </h4>
                <div>
                  {test.status === "loading" ? (
                    <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  ) : test.status === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className="border-t border-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 relative mb-4 bg-gray-100">
                      <NextImage
                        src={test.url}
                        alt={`Test image ${index + 1}`}
                        fill
                        sizes="160px"
                        className="object-contain"
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                    </div>
                    <p className="text-xs text-gray-500 break-all mt-2">{test.url}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button onClick={retestAll}>
            Test Again
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            Return
          </Button>
        </div>
      </div>
    </div>
  );
}


