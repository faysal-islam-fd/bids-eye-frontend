"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { fadeIn } from "@/lib/animations";
import collectionApiSlice from "@/redux/api/collectionApiSlice";
import { ICollection } from "@/types";
import { Config } from "@/config/Config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextImage from "next/image";

interface ISlides {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  slug: string;
}

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "tween", ease: "easeOut", duration: 0.6 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: {
      x: { type: "tween", ease: "easeIn", duration: 0.4 },
      opacity: { duration: 0.3 },
    },
  }),
};

// Hero image component with fallback
function HeroImageWithFallback({ 
  src, 
  alt,
  priority = false 
}: { 
  src: string; 
  alt: string;
  priority?: boolean;
}) {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <ImageOff className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      onError={() => setError(true)}
      className="object-cover"
      sizes="100vw"
      quality={90}
    />
  );
}

export default function HeroSlider() {
  const [[currentSlide, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [slides, setSlides] = useState<ISlides[]>([]);
  const router = useRouter();

  const nextSlide = () =>
    setSlide(([prevSlide]) => {
      const newSlide = slides.length > 0 ? (prevSlide + 1) % slides.length : prevSlide;
      return [newSlide, 1];
    });

  const prevSlide = () =>
    setSlide(([prevSlide]) => {
      const newSlide = slides.length > 0 ? (prevSlide - 1 + slides.length) % slides.length : prevSlide;
      return [newSlide, -1];
    });

  const { data, isSuccess } = collectionApiSlice.useGetAllCollectionsQuery("");

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined' || slides.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // Longer delay for smoother transitions
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    if (isSuccess && data) {
      const slideData = data.map((collection: ICollection) => ({
        image: `${Config.BACKEND_STORASE_URL}/${collection.image}`,
        title: collection.name,
        subtitle: collection.description || "Discover the latest trends",
        cta: "Shop Now",
        slug: collection.slug,
      }));
      setSlides(slideData);
    }
  }, [isSuccess, data]);

  // Prefetch collection routes to reduce navigation delay
  useEffect(() => {
    if (slides.length > 0) {
      router.prefetch?.("/collections");
      const path = `/collections/${slides[currentSlide].slug}`;
      router.prefetch?.(path);
    }
  }, [slides, currentSlide, router]);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />

      <AnimatePresence initial={false} custom={direction}>
        {slides.length > 0 ? (
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <HeroImageWithFallback
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                priority={currentSlide === 0}
              />
            </div>
            
            {/* Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30" />
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="space-y-8"
                  >
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm font-semibold tracking-wide">NEW COLLECTION</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight"
                    >
                      {slides[currentSlide].title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-sm text-white/90 leading-relaxed max-w-md"
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <Link href={`/collections/${slides[currentSlide].slug}`} prefetch>
                        <motion.button
                          className="group relative px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center gap-1">
                            {slides[currentSlide].cta}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </motion.button>
                      </Link>

                      <Link href="/collections" prefetch>
                        <motion.button
                          className="group px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium text-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="flex items-center gap-1">
                            View Collections
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </motion.button>
                      </Link>
                    </motion.div>
                  </motion.div>


                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </AnimatePresence>

      {/* Futuristic Navigation Buttons */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative p-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
          
          <ChevronLeft className="w-4 h-4 text-white relative z-10" />
          
          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 border border-purple-400/50 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative p-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
          
          <ChevronRight className="w-4 h-4 text-white relative z-10" />
          
          {/* Pulse Ring */}
          <motion.div
            className="absolute inset-0 border border-pink-400/50 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.button>

      {/* Stunning Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setSlide([index, index > currentSlide ? 1 : -1])}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentSlide ? (
              <motion.div
                layoutId="activeSlide"
                className="w-12 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            ) : (
              <div className="w-3 h-3 bg-white/40 rounded-full hover:bg-white/60 transition-all duration-300" />
            )}
            
            {/* Hover Ring */}
            <motion.div
              className="absolute inset-0 border border-white/30 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        ))}
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 right-12 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-4 text-white/60">
          <span className="text-xs uppercase tracking-widest font-medium">Scroll Down</span>
          <div className="relative">
            <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent" />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"
              animate={{ y: [0, 40, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
