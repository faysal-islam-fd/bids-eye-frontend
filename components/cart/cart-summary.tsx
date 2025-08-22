"use client";

import { motion } from "framer-motion";
import { Gift, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ICartProduct } from "@/redux/slice/cartSlice";

interface CartSummaryProps {
  items: ICartProduct[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce((acc, item) => {
    if (item.product.has_variations && item.product.first_combination) {
      // Variation product price calculation
      return (
        acc +
        Number(item.product.first_combination.price) * Number(item.quantity)
      );
    } else {
      // Simple product price calculation
      return acc + Number(item.product.price) * Number(item.quantity);
    }
  }, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = items.reduce((acc, item) => {
    if (item.product.has_variations && item.product.first_combination) {
      // Variation product price calculation
      return (
        acc +
        Number(
          item.product.first_combination.price -
            item.product.first_combination.discount_price
        ) *
          Number(item.quantity)
      );
    } else {
      // Simple product price calculation
      return (
        acc +
        Number(item.product.price - item.product.discount_price) *
          Number(item.quantity)
      );
    }
  }, 0);
  const total = subtotal + shipping - discount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 sticky top-8"
    >
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span className="flex items-center">
            <Gift className="w-4 h-4 mr-1.5" />
            Discount
          </span>
          <span>${discount.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mb-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input placeholder="Enter promo code" className="pr-24" />
            <Button
              variant="ghost"
              className="absolute right-0 top-0 h-full px-4 text-primary hover:text-primary/80"
            >
              Apply
            </Button>
          </div>

          <Link href="/checkout" className="block">
            <Button className="w-full h-12">
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex items-center text-gray-600">
          <Truck className="w-4 h-4 mr-2" />
          Free shipping on orders over $100
        </div>
        <div className="flex items-center text-gray-600">
          <Gift className="w-4 h-4 mr-2" />
          Special discount applied
        </div>
      </div>
    </motion.div>
  );
}
