import React, { createContext, useContext, useState, ReactNode } from "react";

// Create the context with default value `undefined`
export const CartContext = createContext<{
  isCartOpen: boolean;
  toggleCart: () => void;
  setIsCartOpen?: React.Dispatch<React.SetStateAction<boolean>>;
} | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toggle function
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider value={{ isCartOpen, toggleCart, setIsCartOpen}}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
// export const useCartContext = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
