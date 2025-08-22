import { configureStore } from "@reduxjs/toolkit";
import authApiSlice from "../api/authApiSlice";
import categoryApiSlice from "../api/categoryApiSlice";
import productApiSlice from "../api/productsApiSlice";
import cartSlice from "../slice/cartSlice";
import shippingApiSlice from "../api/shippingApiSlice";
import userApiSlice from "../api/userApiSlice";
import orderApiSlice from "../api/orderApiSlice";
import collectionApiSlice from "../api/collectionApiSlice";
const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [shippingApiSlice.reducerPath]: shippingApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [collectionApiSlice.reducerPath]: collectionApiSlice.reducer,
    cart: cartSlice,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApiSlice.middleware,
      categoryApiSlice.middleware,
      productApiSlice.middleware,
      shippingApiSlice.middleware,
      userApiSlice.middleware,
      orderApiSlice.middleware,
      collectionApiSlice.middleware
    );
  },
  // devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
