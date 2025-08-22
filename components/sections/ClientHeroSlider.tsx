"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  slug: string;
}

export default function ClientHeroSlider({ slides }: { slides: Slide[] }) {
  const [[current, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [error, setError] = useState<Record<number, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient || slides.length === 0) return;
    const id = setInterval(() => setSlide(([i]) => [slides.length > 0 ? (i + 1) % slides.length : i, 1]), 6000);
    return () => clearInterval(id);
  }, [isClient, slides]);

  const next = () => setSlide(([i]) => [slides.length > 0 ? (i + 1) % slides.length : i, 1]);
  const prev = () => setSlide(([i]) => [slides.length > 0 ? (i - 1 + slides.length) % slides.length : i, -1]);

  const variants = {
    initial: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    animate: { x: 0, opacity: 1, transition: { x: { type: "tween", ease: "easeOut", duration: 0.6 }, opacity: { duration: 0.4 } } },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0, transition: { x: { type: "tween", ease: "easeIn", duration: 0.4 }, opacity: { duration: 0.3 } } }),
  };

  const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAICEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvK6iuAEVvvhw/8AMq/Z';

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/30" />
      <AnimatePresence initial={false} custom={direction}>
        {slides.length > 0 ? (
          <motion.div key={current} custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
            <div className="absolute inset-0">
              {error[current] ? (
                <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
                  <div className="text-center">
                    <ImageOff className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{slides[current].title}</p>
                  </div>
                </div>
              ) : (
                <NextImage
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  priority={current === 0}
                  sizes="100vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  onError={() => setError((e) => ({ ...e, [current]: true }))}
                  className="object-cover"
                />
              )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/30" />

            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm font-semibold tracking-wide">NEW COLLECTION</span>
                    </div>
                    <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                      {slides[current].title}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-sm text-white/90 leading-relaxed max-w-md">
                      {slides[current].subtitle}
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="flex flex-col sm:flex-row gap-3">
                      <Link href={`/collections/${slides[current].slug}`} prefetch className="group relative px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-lg transition-all duration-300">
                        <span className="flex items-center gap-1">Shop Now</span>
                      </Link>
                      <Link href="/collections" prefetch className="group px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium text-sm rounded-lg hover:bg-white/30 transition-all duration-300">
                        <span className="flex items-center gap-1">View Collections</span>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </AnimatePresence>

      <motion.button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative p-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
          <ChevronLeft className="w-4 h-4 text-white relative z-10" />
        </div>
      </motion.button>

      <motion.button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 group" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <div className="relative p-2.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 rounded-full hover:from-purple-600/40 hover:to-pink-600/40 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
          <ChevronRight className="w-4 h-4 text-white relative z-10" />
        </div>
      </motion.button>
    </section>
  );
}


