import { CartState } from "@/redux/slice/cartSlice";

export interface RootState {
  // category: CategoryState;
  cart: CartState;
}

export interface ICategoryWithCount {
  id: number;
  name: string;
  image: string;
  products_count: number;
  slug: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: string;
  image: string | null; // Since image can be null
  added_by: number;
  parent_id: number | null; // Since parent_id can be null
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  deleted_at: string | null; // Can be null
  created_at: string;
  updated_at: string;
  children: ICategory[] | [];
  products?: IProduct[];
  // Assuming children are also of type Category
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  has_variations: boolean;
  is_featured: boolean;
  is_drafted: boolean;
  price: string;
  description: string;
  discount_price: string;
  status: string;
  image: string | null; // Since image can be null
  added_by: number;
  parent_id: number | null; // Since parent_id can be null
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  deleted_at: string | null; // Can be null
  created_at: string;
  updated_at: string;
  quantity?: string;
  category?: ICategory;
  sub_category?: ICategory;
  combinations?: IProductCombinations[];
  product_images: IProductImage[];
  first_combination?: IProductCombinations;
}
export interface IProductImage {
  id: number;
  image: string;
  product_id: number;
}

export interface IProductCombinations {
  id: number;
  product_id: number;
  price: number;
  discount_price: number;
  sku: string;
  quantity: string;
  combination_details: ICombinationDetails[];
}

export interface ICombinationDetails {
  id: number;
  product_attribute_id: number;
  product_attribute_value_id: number;
  product_combination_id: number;
  product_attribute: IProductAttribute;
}

export interface IProductAttribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export interface AttributeValue {
  id: number;
  value: string;
}

export interface IOrderProducts {
  id: number;
  order_id: number;
  product_id: number;
  product_combination_id: number;
  user_id: number | null;
  price: string;
  quantity: number;
  discount: string;
  tax: string | null;
  total: string;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    image: string;
    sku: string;
  };
  combination?: {
    sku: string;
  };
}

export interface IOrder {
  id: number;
  tran_id: string;
  shipping_address: string;
  billing_address: string;
  first_name: string;
  last_name: string;
  total_price: number;
  shipping_amount: number;
  payment_method: string;
  currency: string;
  phone: string;
  created_at: string;
  updated_at: string;
  order_products: IOrderProducts[];
  order_products_count: number;
  confirmed: boolean;
  confirmed_at: string | null;
  packed: boolean;
  packed_at: string | null;
  in_transit: boolean;
  in_transit_at: string | null;
  delivered: boolean;
  delivered_at: string | null;
  estimated_delivery_date: string | null;
}

export interface IFilterOptions {
  attributeOptions: IFilterAttributeOptions[];
  categories: ICategory[];
  maxPrice: number;
  minPrice: number;
}

export interface IFilterAttributeOptions {
  name: string;
  values: string[];
}

export interface ICollection {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string; // Since image can be null
  products_count?: number;
  products?: ICollectionProduct[] | IProduct[];
}

export interface ICollectionProduct {
  id: number;
  collection_id: number;
  product_id: number;
  product: IProduct;
}
