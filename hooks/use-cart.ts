

"use client";

import { CartItemType } from "@/app/types/cart";
import { useState, useEffect } from "react";

const dummyItems: CartItemType[] = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "Clothing",
    color: "White",
    size: "L"
  },
  {
    id: 2,
    name: "Classic Leather Watch",
    price: 149.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    category: "Accessories",
    color: "Brown",
    size: "One Size"
  },
  {
    id: 3,
    name: "Slim Fit Denim Jeans",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    category: "Clothing",
    color: "Blue",
    size: "32"
  }
];

export function useCart() {
  const [items, setItems] = useState<CartItemType[]>(dummyItems);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    const fetchCart = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItems(dummyItems);
      setIsLoading(false);
    };

    fetchCart();
  }, []);

  

  return { items, isLoading };
}