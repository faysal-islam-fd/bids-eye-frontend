"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import orderApiSlice from "@/redux/api/orderApiSlice";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { emptyCart } from "@/redux/slice/cartSlice"; // Import the emptyCart action
import { IOrder } from "@/types";

interface ProductCombination {
  id: number;
  discount_price: string;
  price: string;
  quantity: number;
  sku: string;
  product_id: number;
  combination_details: any[];
}

interface Product {
  id: number;
  description: string;
  discount_price: number;
  has_variations: boolean;
  name: string;
  image: string;
  price: number;
  first_combination: ProductCombination;
  quantity: number;
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  combination_id: number;
}

interface CartData {
  products: CartItem[];
}

interface OrderSummaryProps {
  onPlaceOrder: () => void;
  setOrderSuccessData: (data: IOrder) => void;
}

export default function BillingForm({
  onPlaceOrder,
  setOrderSuccessData,
}: OrderSummaryProps) {
  const [order, { data, isSuccess, isError }] =
    orderApiSlice.usePaymentMutation();
  const [cartData, setCartData] = useState<string | null>(null);
  const dispatch = useDispatch(); // Initialize useDispatch

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      setCartData(storedCart);
    }
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    full_address: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let cartItems: CartData = { products: [] };

      if (cartData) {
        try {
          cartItems = JSON.parse(cartData) as CartData;
        } catch (error) {
          console.error("Error parsing cart data:", error);
          return;
        }
      }

      if (cartItems.products.length === 0) {
        console.error("Cart is empty");
        return;
      }

      const orderData = {
        full_address: formData.full_address,
        first_name: formData.first_name,
        last_name: formData.last_name || null,
        phone: formData.phone,
        products: cartItems.products.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
          combination_id: item.combination_id || null,
        })),
      };

      await order(orderData);
    } catch (error) {
      console.error("Order placement failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify({ products: [] }));
      }
      onPlaceOrder();

      if (data?.order) {
        setOrderSuccessData(data.order);
      }

      // Dispatch the emptyCart action
      dispatch(emptyCart());
    }
  }, [isSuccess, data, onPlaceOrder, setOrderSuccessData, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="lg:col-span-2">
      <h2 className="text-lg font-medium text-gray-700 mb-4 uppercase">
        Billing Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="first_name" className="text-sm">
            FIRST NAME <span className="text-red-500">*</span>
          </Label>
          <Input
            id="first_name"
            className="mt-1"
            required
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="last_name" className="text-sm">
            LAST NAME
          </Label>
          <Input
            id="last_name"
            className="mt-1"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <Label htmlFor="full_address" className="text-sm">
          Full ADDRESS <span className="text-red-500">*</span>
        </Label>
        <Input
          id="full_address"
          className="mt-1"
          placeholder="House number and street name"
          required
          value={formData.full_address}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="phone" className="text-sm">
          BILLING MOBILE NUMBER <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          className="mt-1"
          required
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white"
      >
        PLACE ORDER
      </Button>
    </form>
  );
}