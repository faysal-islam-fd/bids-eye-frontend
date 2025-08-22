"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartPopup from "./cart-popup";

export default function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        Cart
        <span className="absolute -top-2 -right-2 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
          3
        </span>
      </Button>

      <CartPopup
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}