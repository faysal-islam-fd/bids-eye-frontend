import {   useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import {  RootState } from "@/types";
import { Config } from "@/config/Config";
import {
  ICartProduct,
  ICartProductItem,
  removeFromCart,
  setQuantity,
} from "@/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GetAuthContext } from "@/context/authContext";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const cartProducts = useSelector((state: RootState) => state.cart.products);
  const getProductPrice = (product: ICartProductItem) => {
    if (product.has_variations && product.first_combination) {
      return (
        product.first_combination.discount_price ??
        product.first_combination.price
      );
    }
    return product.discount_price ?? product.price;
  };
  const calculateSubTotal = (cartProducts: ICartProduct[]) => {
    return cartProducts.reduce((subTotal, item) => {
      const price = getProductPrice(item.product);
      const quantity = item.quantity || 1; // Default quantity is 1
      return subTotal + price * quantity;
    }, 0);
  };
  const subtotal = calculateSubTotal(cartProducts);
  const authContext = useContext(GetAuthContext);
  const router = useRouter();
  const effectiveSubtotal = subtotal;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Stunning Header */}
            <div className="relative p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">Shopping Cart</h2>
                    <p className="text-blue-100 text-xs">{cartProducts.length} items</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
            </div>
            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto py-2">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-base font-medium mb-2">Your cart is empty</p>
                  <p className="text-xs text-center">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-3 px-4">
                  <AnimatePresence>
                    {cartProducts.map((item, index) => (
                      <CartItemArea key={index} item={item} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
            {/* Stunning Footer */}
            <div className="border-t border-gray-200 bg-white/70 backdrop-blur p-6">
              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Subtotal</span>
                  <span className="font-semibold text-sm">৳{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Shipping</span>
                  <span className="text-green-600 font-medium text-sm">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">৳{effectiveSubtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => { onClose(); router.push("/checkout-v2"); }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 rounded-lg font-semibold text-sm shadow hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

const CartItemArea = ({ item }: { item: ICartProduct }) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      if (item.product.has_variations) {
        if (Number(item.product.first_combination?.quantity) >= newQuantity) {
          dispatch(
            setQuantity({
              id: item.product.id,
              combination_id: item?.combination_id,
              quantity: newQuantity,
            })
          );
        }
      } else {
        if (Number(item.product.quantity) >= newQuantity) {
          dispatch(
            setQuantity({
              id: item.product.id,
              combination_id: item?.combination_id,
              quantity: newQuantity,
            })
          );
        }
      }

      // Here you would typically update the cart state/backend
    }
  };

  const remove = () => {
    if (item.product.has_variations) {
      dispatch(
        removeFromCart({ id: item.id, combination_id: item.combination_id })
      );
    } else {
      dispatch(removeFromCart({ id: item.id }));
    }
  };

  return (
    <>
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex items-center p-4 border-b"
      >
        <div className="rounded-md h-[80px] w-[80px] mr-4 relative overflow-hidden">
          <OptimizedImage
            src={Config.BACKEND_STORASE_URL + "/" + item.product.image}
            alt={item.product?.name}
            fill
            sizes="80px"
            quality={80}
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold">{item.product.name}</h3>
          <div className="font-medium text-lg truncate flex gap-x-3">
            {item.product?.has_variations ? (
              <h3>
                {item.product.first_combination?.discount_price ??
                  item.product.first_combination?.price}
              </h3>
            ) : (
              <h3>{item.product?.discount_price ?? item.product?.price}</h3>
            )}
          </div>
          <div className="flex  gap-x-2 mt-2 items-center ">
            <div className="flex items-center ">
              <button
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                className="px-2 py-1 border rounded-l-md hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                className="px-2 py-1 border rounded-r-md hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {item.product.has_variations ? (
              <p className="text-sm text-gray-500 ">
                {/* {item.color} · Size {item.size} */}
                {item.product.first_combination?.sku}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          onClick={remove}
          className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
          aria-label={`Remove ${item.product.name} from cart`}
        >
          <Trash2 size={20} />
        </button>
      </motion.div>
    </>
  );
};
