"use client";

import { useMemo } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

const allProducts: Record<string, Product[]> = {
  shirts: [
    {
      id: 101,
      name: "Classic White Oxford Shirt",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=500&fit=crop",
      category: "shirts",
      isNew: true
    },
    {
      id: 102,
      name: "Blue Striped Business Shirt",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop",
      category: "shirts",
      discount: 15
    },
    {
      id: 103,
      name: "Slim Fit Cotton Shirt",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
      category: "shirts"
    },
    {
      id: 104,
      name: "Casual Linen Shirt",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=500&h=500&fit=crop",
      category: "shirts",
      discount: 20
    }
  ],
  tshirts: [
    {
      id: 201,
      name: "Premium Cotton T-Shirt",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      category: "tshirts",
      isNew: true
    },
    {
      id: 202,
      name: "Graphic Print T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
      category: "tshirts",
      discount: 10
    },
    {
      id: 203,
      name: "Urban Style T-Shirt",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
      category: "tshirts"
    },
    {
      id: 204,
      name: "Classic Black T-Shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
      category: "tshirts",
      discount: 15
    }
  ],
  hoodies: [
    {
      id: 301,
      name: "Classic Pullover Hoodie",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      category: "hoodies",
      isNew: true
    },
    {
      id: 302,
      name: "Zip-Up Hoodie",
      price: 64.99,
      image: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500&h=500&fit=crop",
      category: "hoodies",
      discount: 20
    },
    {
      id: 303,
      name: "Oversized Comfort Hoodie",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1556821840-5a6e18314819?w=500&h=500&fit=crop",
      category: "hoodies"
    },
    {
      id: 304,
      name: "Athletic Performance Hoodie",
      price: 74.99,
      image: "https://images.unsplash.com/photo-1578768079046-aa76e52ff62e?w=500&h=500&fit=crop",
      category: "hoodies",
      discount: 15
    }
  ],
  pants: [
    {
      id: 401,
      name: "Slim Fit Chinos",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
      category: "pants",
      isNew: true
    },
    {
      id: 402,
      name: "Classic Denim Jeans",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
      category: "pants",
      discount: 15
    },
    {
      id: 403,
      name: "Cargo Pants",
      price: 74.99,
      image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&h=500&fit=crop",
      category: "pants"
    },
    {
      id: 404,
      name: "Formal Trousers",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&h=500&fit=crop",
      category: "pants",
      discount: 20
    }
  ]
};

export function useProductsByCategory(category: string) {
  return useMemo(() => {
    return allProducts[category] || [];
  }, [category]);
}

export function useProductsByCategories(categories: string[]) {
  return useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = allProducts[category] || [];
      return acc;
    }, {} as Record<string, Product[]>);
  }, [categories]);
}