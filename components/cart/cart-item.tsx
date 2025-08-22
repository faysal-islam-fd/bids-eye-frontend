"use client";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ICartProduct,
  removeFromCart,
  setQuantity,
} from "@/redux/slice/cartSlice";
import { Config } from "@/config/Config";
import { useDispatch } from "react-redux";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default function CartItem({ item }: { item: ICartProduct }) {
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
    <motion.div layout className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-6">
        <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
          <OptimizedImage
            src={Config.BACKEND_STORASE_URL + "/" + item.product.image}
            alt={item.product.name}
            fill
            sizes="96px"
            quality={80}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg truncate">
              {item.product.name}
            </h3>
            <div className="font-medium text-lg truncate flex gap-x-3">
              {item.product?.has_variations ? (
                <h3>
                  {item.product.first_combination?.discount_price}
                  <span className="line-through text-base">
                    {item.product.first_combination?.price}
                  </span>
                </h3>
              ) : (
                <h3>
                  {item.product?.discount_price}
                  <span className="line-through text-base">
                    {item.product?.price}
                  </span>
                </h3>
              )}
            </div>
          </div>
          {item.product.has_variations ? (
            <p className="text-sm text-gray-500 mb-2">
              {/* {item.color} · Size {item.size} */}
              {item.product.first_combination?.sku}
            </p>
          ) : (
            ""
          )}

          {item.product.has_variations ? (
            <p className="text-sm text-gray-500 mb-2">
              Available {item.product.first_combination?.quantity}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-2">
              Available {item.product.quantity}
            </p>
          )}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={() => remove()}
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* <div className="text-right">
          <p className="font-semibold text-lg">${item.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">
            ${(item.price * quantity).toFixed(2)}
          </p>
        </div> */}
      </div>
    </motion.div>
  );
}
