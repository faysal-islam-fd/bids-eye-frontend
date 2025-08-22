"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";
import NextImage from "next/image";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const dummyCartItems: CartItem[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
  },
  {
    id: 3,
    name: "Classic Leather Watch",
    price: 149.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
  }
];

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const subtotal = dummyCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <span className="bg-primary text-white px-2 py-1 rounded-full text-sm">
                  {dummyCartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {dummyCartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <NextImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" >
  <button className="bg-black w-full py-2 hover:bg-stone-800 transition-all cursor-pointer text-white">
    <span>Proceed to Checkout</span>
  </button>
</Link>

              <Button
                variant="outline"
                className="w-full"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}