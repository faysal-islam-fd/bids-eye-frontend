import { IProduct, IProductCombinations } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface ICartProductItem {
  id: number;
  has_variations: boolean;
  price: number;
  description: string;
  discount_price: number;
  quantity: number;
  image: string;
  name: string;
  first_combination?: IProductCombinations;
}
export interface ICartProduct {
  id: number;
  quantity: number;
  combination_id?: number;
  product: ICartProductItem;
  combination_data?: IProductCombinations;
}

export interface CartState {
  products: ICartProduct[];
}

// Load cart from localStorage or use default initial state
const loadCartFromLocalStorage = (): CartState => {
  if (typeof localStorage !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { products: [] };
  } else {
    return { products: [] };
  }
};

const initialState: CartState = loadCartFromLocalStorage();

const saveCartToLocalStorage = (cart: CartState) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<ICartProduct>) => {
      const existingProduct = state.products.find(
        (p) =>
          p.id === action.payload.id &&
          p.combination_id === action.payload.combination_id
      );

      if (existingProduct) {
        // existingProduct.quantity += action.payload.quantity;
        toast.error("Product already added in cart");
      } else {
        state.products = [action.payload, ...state.products];
        toast.success("Product added to cart.");
      }
      saveCartToLocalStorage(state);
    },

    quantityIncrease: (
      state,
      action: PayloadAction<{ id: number; combination_id?: number }>
    ) => {
      const product = state.products.find(
        (p) =>
          p.id === action.payload.id &&
          p.combination_id === action.payload.combination_id
      );
      if (product) {
        product.quantity += 1;
      } else {
        const newProduct: ICartProduct = {
          id: action.payload.id,
          quantity: 1,
          combination_id: action.payload.combination_id,
          product: {
            /* Add default or fetched product details here */
          } as ICartProductItem,
        };
        state.products = [newProduct, ...state.products];
      }
      saveCartToLocalStorage(state);
    },

    quantityDecrease: (
      state,
      action: PayloadAction<{ id: number; combination_id?: number }>
    ) => {
      const product = state.products.find(
        (p) =>
          p.id === action.payload.id &&
          p.combination_id === action.payload.combination_id
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      saveCartToLocalStorage(state);
    },

    setQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        combination_id?: number;
        quantity: number;
      }>
    ) => {
      if (action.payload.combination_id) {
        const product = state.products.find(
          (p) =>
            p.id === action.payload.id &&
            p.combination_id === action.payload.combination_id
        );

        if (product) {
          product.quantity = action.payload.quantity;
        }
        saveCartToLocalStorage(state);
      } else {
        const product = state.products.find((p) => p.id === action.payload.id);
        if (product) {
          product.quantity = action.payload.quantity;
        }

        saveCartToLocalStorage(state);
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; combination_id?: number }>
    ) => {
      state.products = state.products.filter(
        (p) =>
          !(
            p.id === action.payload.id &&
            (!action.payload.combination_id ||
              p.combination_id === action.payload.combination_id)
          )
      );
      saveCartToLocalStorage(state);
    },

    emptyCart: (state) => {
      state.products = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const {
  addProductToCart,
  quantityIncrease,
  quantityDecrease,
  removeFromCart,
  emptyCart,
  setQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
