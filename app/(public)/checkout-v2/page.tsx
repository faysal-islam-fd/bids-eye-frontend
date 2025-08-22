"use client";

import { useState } from "react";
import CheckoutSteps from "@/components/checkout/checkout-step";
import BillingForm from "@/components/checkout/billing-form";
import OrderSummary from "@/components/checkout/order-summary";
import OrderConfirmation from "@/components/checkout/order-confirmation";
import { IOrder } from "@/types";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1 = Shipping & Checkout, 2 = Confirmation

  const handlePlaceOrder = () => {
    // In a real app, you would validate the form and process the order here
    setCurrentStep(2); // Move to confirmation step
    window.scrollTo(0, 0); // Scroll to top
  };

  const [orderSuccessData, setOrderSuccessData] = useState<IOrder>();
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-medium text-gray-700 mb-8">Checkout</h1>

      <CheckoutSteps currentStep={currentStep} />

      {currentStep === 1 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BillingForm
              onPlaceOrder={handlePlaceOrder}
              setOrderSuccessData={setOrderSuccessData}
            />
            <OrderSummary />
          </div>
        </>
      ) : (
        orderSuccessData && <OrderConfirmation order={orderSuccessData} />
      )}
    </div>
  );
}
