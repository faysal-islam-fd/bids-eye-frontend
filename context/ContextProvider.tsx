import React from "react";
import { AuthContext } from "./authContext";
import {  CartProvider } from "./CartContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthContext>

        <CartProvider>
        {children}
        </CartProvider>
      </AuthContext>
    </>
  );
};

export default ContextProvider;
