"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IProductImage } from "@/types";
import { Config } from "@/config/Config";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export default function ProductGallery({
  product_images,
}: {
  product_images: IProductImage[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Preload next few images for better UX
  useEffect(() => {
    if (product_images.length > 1) {
      const preloadImages = product_images.slice(1, 4).map(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `${Config.BACKEND_STORASE_URL}/${img.image}`;
        document.head.appendChild(link);
        return link;
      });

      return () => {
        preloadImages.forEach(link => document.head.removeChild(link));
      };
    }
  }, [product_images]);

  return (
    <div className="space-y-4">
      {/* Main Product Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg group"
      >
        <OptimizedImage
          src={`${Config.BACKEND_STORASE_URL}/${product_images[selectedImage]?.image}`}
          alt="Product image"
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px"
          quality={95}
          className="object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          priority={true}
          placeholder="blur"
        />
        
        {/* Zoom button */}
        <button
          onClick={() => {
            setIsZoomed(true);
            setZoomLevel(1);
            setRotation(0);
          }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white text-sm font-medium">
            {selectedImage + 1} / {product_images.length}
          </span>
        </div>
      </motion.div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {product_images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative aspect-square cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index 
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20" 
                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <OptimizedImage
              src={`${Config.BACKEND_STORASE_URL}/${image.image}`}
              alt={`Product thumbnail ${index + 1}`}
              fill
              sizes="120px"
              quality={85}
              className="object-cover transition-transform duration-300 hover:scale-110"
              priority={index < 2} // Prioritize first 2 thumbnails
              placeholder="blur"
            />
            
            {/* Selection indicator */}
            {selectedImage === index && (
              <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(Math.max(0.5, zoomLevel - 0.5));
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-4 h-4 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(Math.min(3, zoomLevel + 0.5));
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRotation(rotation + 90);
                  }}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomLevel(1);
                    setRotation(0);
                  }}
                  className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white text-sm"
                >
                  Reset
                </button>
                
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Zoomed Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="relative w-full h-full flex items-center justify-center cursor-move"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: 'transform 0.2s ease-out'
                  }}
                >
                  <OptimizedImage
                    src={`${Config.BACKEND_STORASE_URL}/${product_images[selectedImage]?.image}`}
                    alt="Zoomed product image"
                    fill
                    sizes="90vw"
                    quality={95}
                    className="object-contain"
                    unoptimized={false}
                  />
                </div>
              </motion.div>

              {/* Image Navigation in Zoom Mode */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {product_images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                      setZoomLevel(1);
                      setRotation(0);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      selectedImage === index 
                        ? "bg-white" 
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
