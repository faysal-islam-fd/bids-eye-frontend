"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import categoryApiSlice from "@/redux/api/categoryApiSlice";
import { ICategoryWithCount } from "@/types";
import { Config } from "@/config/Config";
import NextImage from "next/image";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategorySkeleton from "../skeleton/CategorySkeleton";

export default function Categories() {
  const { data, isSuccess, isLoading } =
    categoryApiSlice.useGetByProductCountQuery("");

  const [filtered, setFiltered] = useState<ICategoryWithCount[]>([]);

  useEffect(() => {
    if (data?.categories) {
      const categories: ICategoryWithCount[] = data?.categories ?? [];

      setFiltered(categories.filter((item) => item.image !== null));
    }
  }, [isSuccess]);
  return (
    <section className="py-16 ">
      <div className="container  mx-auto px-4">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-2">Shop by Category</h2>
        </motion.div>

        {isLoading ? (
          <CategorySkeleton />
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 h- md:grid-cols-2 lg:grid-cols-4 gap-px"
          >
            {filtered.map((category, index) => (
              <Link key={category.name} href={"/shop/" + category?.slug}>
                <motion.div
                  // variants={fadeIn("up", index * 0.1)}
                  className="group cursor-pointer"
                >
                  <div className="relative  overflow-hidden  aspect-[3/4]">
                    <OptimizedImage
                      src={`${
                        Config.BACKEND_STORASE_URL + "/" + category.image
                      }`}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      quality={85}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="  absolute inset-0 group  bg-black/20 flex flex-col items-start justify-end text-white">
                      <div className=" group-hover:block group-hover:translate-y-[-15px] transition-all pl-5 pb-2 ">
                        <h3 className="text-[16px] md:text-xl uppercase  mb-1">
                          {category.name}
                        </h3>
                        <p className="text-[12px]  md:text-[14px] opacity-80">
                          {category.products_count}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
