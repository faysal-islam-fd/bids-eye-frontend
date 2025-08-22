"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ShoppingBag, CreditCard, Package } from "lucide-react";
// import CheckoutSteps from "@/components/checkout/checkout-step";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/redux/slice/cartSlice";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const params = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (params.get("order_id")) {
      if (params.get("status") === "success") {
        setCurrentStep(3);
        dispatch(emptyCart());
      }
    }
  }, [params]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <ShoppingBag className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Checkout
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Complete your purchase securely with our streamlined checkout
            process
          </p>
        </div>

        <div className=" gap-8 items-center">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: Package,
                  title: "Free Shipping",
                  description: "On orders over ৳ 5000",
                },
                {
                  icon: CreditCard,
                  title: "Secure Payment",
                  description: "256-bit encryption",
                },
                {
                  icon: ShoppingBag,
                  title: "Easy Returns",
                  description: "There's no risk with our easy returns",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            {/* <CheckoutSteps
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            /> */}
          </div>
          {/* <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary currentStep={currentStep} />
            </div>
          </div> */}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}
