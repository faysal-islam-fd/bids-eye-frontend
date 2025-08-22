"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ICombinationDetails,
  IProduct,
  IProductAttribute,
  IProductCombinations,
} from "@/types";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/redux/slice/cartSlice";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";

interface ISelectedAttribute {
  id: number;
  value_id: number;
}
export default function ProductInfo({ product }: { product: IProduct }) {
  const [selectedAttributes, setSelectedAttributes] = useState<
    ISelectedAttribute[]
  >([]);

  const discount = Math.round(
    Number(product.price) - Number(product?.discount_price)
  );
  const formatAttributes = (product: IProduct) => {
    if (product.combinations) {
      const formattedAttributes = product.combinations.flatMap(
        (combination: IProductCombinations) =>
          combination.combination_details.map(
            (detail: ICombinationDetails) => ({
              id: detail.product_attribute.id,
              name: detail.product_attribute.name,
              values: detail.product_attribute.values.map((value: any) => ({
                id: value.id,
                value: value.value,
              })),
            })
          )
      );

      const uniqueAttributes = formattedAttributes.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.name === value.name)
      );

      // Ensure `values` within each attribute are unique
      uniqueAttributes.forEach((attribute) => {
        attribute.values = attribute.values.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.value === value.value)
        );
      });

      return uniqueAttributes;
    }

    return []; // Return an empty array if no combinations exist
  };

  const findCombinationId = (
    selectedAttributes: { id: number; value_id: number }[],
    combinations: IProductCombinations[]
  ) => {
    for (const combination of combinations) {
      // Check if the combination details match all selected attributes
      const matchingCombination = combination.combination_details.every(
        (detail) => {
          return selectedAttributes.some(
            (selected) =>
              selected.id === detail.product_attribute_id &&
              selected.value_id === detail.product_attribute_value_id
          );
        }
      );

      if (matchingCombination) {
        return combination.id; // Return the product_combination_id when match is found
      }
    }
    return null; // Return null if no matching combination is found
  };

  const cartContext = useContext(CartContext);
  const toggleCart = cartContext?.toggleCart;
  const productCombinations = product?.combinations;
  const [selectedCombination, setSelectdCombination] = useState<number>(0);

  const attributes = formatAttributes(product);

  useEffect(() => {
    const id = findCombinationId(selectedAttributes, productCombinations ?? []);
    if (id) {
      const combinationIndex = productCombinations?.findIndex(
        (i) => i.id === id
      );
      if (combinationIndex !== -1) {
        setSelectdCombination(combinationIndex ?? 0);
      }
    }
  }, [selectedAttributes]);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (
      product.has_variations &&
      productCombinations &&
      productCombinations[selectedCombination].id
    ) {
      if (productCombinations[selectedCombination]?.id) {
        if (Number(productCombinations[selectedCombination].quantity) === 0) {
          toast.error("Product out of stock");
        } else {
          
          dispatch(
            addProductToCart({
              id: product.id,
              product: {
                id: product.id,
                description: product?.description,
                discount_price: 0,
                has_variations: true,
                name: product.name,
                image: product.image as string,
                price: 0,
                first_combination: {
                  id: productCombinations[selectedCombination].id,
                  discount_price:
                    productCombinations[selectedCombination].discount_price,
                  price: productCombinations[selectedCombination].price,
                  quantity: productCombinations[selectedCombination].quantity,
                  sku: productCombinations[selectedCombination].sku,
                  product_id: product.id,
                  combination_details: [],
                },
                quantity: 0,
              },
              quantity: 1,
              combination_id: productCombinations[selectedCombination].id,
            })
          );
          toggleCart?.()
        }
      }
    } else {
      if (Number(product.quantity) === 0) {
        toast.success("Product out of stock");
      } else {
        
        dispatch(
          addProductToCart({
            id: product.id,
            product: {
              id: product.id,
              description: product?.description,
              discount_price: Number(product.discount_price),
              has_variations: false,
              price: Number(product.price),
              quantity: Number(product.quantity),
              image: product.image as string,
              name: product.name,
            },
            quantity: 1,
          })
        );
        toggleCart?.()
      }
    }
  };

  const getVariationPrice = () => {
    if (productCombinations) {
      if (productCombinations[selectedCombination]) {
        if (productCombinations[selectedCombination]?.discount_price) {
          return Math.min(
            parseFloat(
              productCombinations[selectedCombination]?.price.toString() ?? 0
            ),
            parseFloat(
              productCombinations[
                selectedCombination
              ]?.discount_price.toString() ?? 0
            )
          );
        } else {
          return parseFloat(
            productCombinations[selectedCombination]?.price.toString() ?? 0
          );
        }
      }
    } else {
      return 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Product Header */}
      <div className="space-y-4">
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {product.category?.name}
          </span>
        </motion.div>
        
        {/* Product Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
        >
          {product.name}
        </motion.h1>
        
        {/* Rating & Reviews */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-600 ml-2">4.8 (124 reviews)</span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        </motion.div>
      </div>
        {/* <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div> */}


      {product?.has_variations ? (
        <div className="">
          <div className="flex items-baseline gap-4">
            <span className=" text-[18px] md:text-xl font-bold">৳ {getVariationPrice()}</span>
            <span className="text-sm text-gray-500 line-through">
              ৳
              {productCombinations && productCombinations[selectedCombination]
                ? parseFloat(
                    (productCombinations[selectedCombination].price as unknown as string) ?? "0"
                  )
                : 0}
            </span>
            <span className="text-sm text-green-600 font-semibold">
              {productCombinations &&
              productCombinations[selectedCombination].discount_price
                ? productCombinations &&
                  parseFloat(
                    productCombinations[selectedCombination].price.toString() ??
                      0
                  ) -
                    parseFloat(
                      productCombinations[
                        selectedCombination
                      ].discount_price.toString() ?? 0
                    )
                : "0"}
              {}৳ OFF
            </span>
          </div>

          {productCombinations && productCombinations[selectedCombination] && (
            <div className="">
              <p className="text-[15px] md:text-[18px]">
                {productCombinations[selectedCombination]?.quantity ?? 0} In
                Stock
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <div className="flex items-baseline gap-4">
            <span className=" text-[18px] md:text-xl font-bold">
              ৳ {Number(product.price) - discount}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ${product.price}
            </span>
            <span className="text-sm text-green-600 font-semibold">
              {discount}৳ OFF
            </span>
          </div>
          <span className="ext-[15px] md:text-[18px]">
            {Number(product.quantity)} In stock
          </span>
        </div>
      )}

      {product.has_variations
        ? attributes?.map((item) => (
            <VariationSelectItem
              item={item}
              selectedAttributes={selectedAttributes}
              setSelectedAttributes={setSelectedAttributes}
            />
          ))
        : ""}

      <div className="flex gap-4">
        <Button onClick={handleAddToCart} className="flex-1 gap-2" size="lg">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </Button>
        {/* <Button variant="outline" size="lg">
          <Heart className="w-4 h-4" />
        </Button> */}
      </div>

      <div className="prose prose-sm mt-6">
        <h3 className="font-semibold text-base">Description:</h3>
        <div
          className="text-gray-600  text-[14px] md:text-[15px]"
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
      </div>
    </motion.div>
  );
}

const VariationSelectItem = ({
  item,
  setSelectedAttributes,
  selectedAttributes,
}: {
  item: IProductAttribute;
  setSelectedAttributes: (value: ISelectedAttribute[]) => void;
  selectedAttributes: ISelectedAttribute[];
}) => {
  const [attribute, setAttribute] = useState(item.values[0].value);

  useEffect(() => {
    const selectedValue = item?.values.find((v) => v.value === attribute);
    if (selectedValue) {
      console.log({ id: item.id, value_id: selectedValue.id });
      const getIndex = selectedAttributes.findIndex((i) => i.id === item.id);
      if (getIndex !== -1) {
        let newData = [...selectedAttributes];
        newData[getIndex] = {
          id: item.id,
          value_id: selectedValue.id,
        };

        setSelectedAttributes(newData);
      } else {
        setSelectedAttributes([
          ...selectedAttributes,
          {
            id: item.id,
            value_id: selectedValue.id,
          },
        ]);
      }
    }
  }, [attribute]);
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">{item?.name}</label>
        <Select onValueChange={setAttribute} value={attribute}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder={`Select ${item?.name}`} />
          </SelectTrigger>
          <SelectContent>
            {item.values.map((value) => (
              <SelectItem key={value.id} value={value.value}>
                {value.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
