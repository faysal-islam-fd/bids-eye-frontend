"use client";

import CartCategories from "@/components/cart/cart-categories";
import CartHeader from "@/components/cart/cart-header";
import CartSummary from "@/components/cart/cart-summary";
import Header from "@/components/layout/Header";
import { useCart } from "@/hooks/use-cart";
import { RootState } from "@/types";
import { log } from "console";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function CartPage() {
  const { items, isLoading } = useCart();

  const cartItems = useSelector((state: RootState) => state.cart.products);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <CartHeader itemCount={items.length} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartCategories items={cartItems} isLoading={isLoading} />
              </div>
              <div className="lg:col-span-1">
                <CartSummary items={cartItems} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
