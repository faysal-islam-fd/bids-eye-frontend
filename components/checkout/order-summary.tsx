"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Config } from "@/config/Config";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface ProductCombination {
  id: number;
  discount_price: string;
  price: string;
  quantity: number;
  sku: string;
  product_id: number;
  combination_details: any[];
}

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    image: string;
    has_variations: boolean;
    price: string | number;
    discount_price: string | number;
    first_combination: ProductCombination;
  };
  quantity: number;
  combination_id: number;
}

interface CartData {
  products: CartItem[];
}

export default function OrderSummary() {
  const [cartData, setCartData] = useState<CartData>({ products: [] });
  const [subtotal, setSubtotal] = useState(0);

  const getItemPrice = (item: CartItem) => {
    if (item.product.has_variations) {
      // For variable products, get price from first_combination
      return parseFloat(
        item.product.first_combination.discount_price ||
          item.product.first_combination.price
      );
    }
    // For simple products, get price directly from product
    return parseFloat(
      item.product.discount_price?.toString() ||
        item.product.price?.toString() ||
        "0"
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          setCartData(parsedCart);

          // Calculate subtotal
          const total = parsedCart.products.reduce(
            (sum: number, item: CartItem) =>
              sum + getItemPrice(item) * item.quantity,
            0
          );
          setSubtotal(total);
        } catch (error) {
          console.error("Error parsing cart data:", error);
        }
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-700 mb-4 uppercase">
        Your Order
      </h2>
      <div className="border rounded-md overflow-hidden">
        <div className="bg-gray-100 p-4 grid grid-cols-2 font-medium">
          <div>PRODUCT</div>
          <div className="text-right">SUBTOTAL</div>
        </div>

        {cartData.products.map((item) => (
          <div key={item.id} className="p-4 border-b">
            <div className="flex mb-2">
              <div className="w-16 h-20 mr-3 relative overflow-hidden rounded">
                <OptimizedImage
                  src={
                    Config.BACKEND_STORASE_URL + "/" + item.product.image ||
                    "/placeholder.svg"
                  }
                  alt={item.product.name}
                  fill
                  sizes="80px"
                  quality={80}
                />
              </div>
              <div>
                <p className="text-sm">{item.product.name}</p>
                <p className="text-sm text-gray-500">× {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              {formatPrice(getItemPrice(item) * item.quantity)}
            </div>
          </div>
        ))}

        <div className="p-4 border-b grid grid-cols-2">
          <div className="font-medium">SUBTOTAL</div>
          <div className="text-right">{formatPrice(subtotal)}</div>
        </div>

        <div className="p-4 border-b grid grid-cols-2">
          <div className="font-medium">SHIPPING</div>
          <div className="text-right text-sm">Inside Dhaka | Free Delivery</div>
        </div>

        <div className="p-4 border-b grid grid-cols-2">
          <div className="font-medium">TOTAL</div>
          <div className="text-right font-bold">{formatPrice(subtotal)}</div>
        </div>
      </div>
    </div>
  );
}
