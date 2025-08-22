export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    description: string;
    features: string[];
    sizes: string[];
    colors: string[];
    images: string[];
    category: string;
    brand: string;
    rating: number;
    reviews: number;
  }
  
  export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
  }