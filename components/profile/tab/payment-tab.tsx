"use client";

import { motion } from "framer-motion";
import { CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/24",
    isDefault: true
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/25",
    isDefault: false
  }
];

export default function PaymentTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 rounded-xl p-6 relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-medium">
                    {method.type} ending in {method.last4}
                  </div>
                  <div className="text-sm text-gray-600">
                    Expires {method.expiry}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {method.isDefault && (
                  <span className="text-sm text-primary font-medium">
                    Default
                  </span>
                )}
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}