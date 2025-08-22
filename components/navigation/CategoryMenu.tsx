"use client";

import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import categoryApiSlice from "@/redux/api/categoryApiSlice";
import { useEffect, useState } from "react";
import { ICategory } from "@/types";
import Link from "next/link";

interface CategoryMenuProps {
  isOpen: boolean;
}


export default function CategoryMenu({ isOpen }: CategoryMenuProps) {
  const { data, isLoading, isSuccess, isError } =
    categoryApiSlice.useGetWithSubcategoriesQuery("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    if (isSuccess) {
      if (data?.categories) {
        setCategories(data?.categories);
      }
    }
  }, [isSuccess, isError]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-4 gap-6 p-8">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={fadeIn("up", index * 0.1)}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  <Link
                    href={"/shop/" + category.slug}
                    className="font-semibold text-base text-gray-900 border-b pb-2 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                  <ul className="space-y-1.5">
                    {category.children.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={"/shop/" + category.slug + "?sub_id=" + item.id}
                          className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
