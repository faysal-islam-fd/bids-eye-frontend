"use client";

import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import productApiSlice from "@/redux/api/productsApiSlice";
import { useEffect, useState } from "react";
import { ICategory, IFilterAttributeOptions, IFilterOptions } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";

export function ShopFilters({ setQStr, subCategories }: { setQStr?: (value: string) => void; subCategories?: ICategory }) {
  const { data, isLoading, isSuccess } =
    productApiSlice.useFilterOptionsQuery("");

  const [filterOptions, setFilterOption] = useState<IFilterOptions>();
  const [attributeOptions, setAttributeOptions] = useState<
    IFilterAttributeOptions[]
  >([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<
    IFilterAttributeOptions[]
  >([]);

  const params = useSearchParams();
  const q = params.get("q");
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        setFilterOption(data);

        const processedItems = data?.attributeOptions?.map(
          (item: IFilterAttributeOptions) => {
            const processedValues = Array.isArray(item.values)
              ? item.values // যদি ইতিমধ্যে অ্যারে হয়
              : Object.values(item.values); // যদি এটি একটি অবজেক্ট হয়, তবে Object.values() ব্যবহার করা হবে

            return {
              name: item.name,
              values: processedValues,
            };
          }
        );

        setAttributeOptions(processedItems);

        setPriceRange([Number(data.minPrice), Number(data.maxPrice)]);
      }
    }
  }, [isSuccess]);

  const handleCheckBox = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories([...selectedCategories.filter((i) => i !== id)]);
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleValueChange = (newValue: number[]) => {
    setPriceRange(newValue); // Update state with new slider values
  };

  const handleSetVariation = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    // Step 1: Check if the attribute already exists in the selectedAttributes array
    const existingAttribute = selectedAttributes.find(
      (attribute) => attribute.name === name
    );

    if (existingAttribute) {
      // If the attribute exists, check if the value is already selected
      if (existingAttribute.values.includes(value)) {
        // If the value is already selected, remove it
        const updatedAttributes = selectedAttributes.map((attribute) =>
          attribute.name === name
            ? {
                ...attribute,
                values: attribute.values.filter((val) => val !== value), // Remove value
              }
            : attribute
        );

        setSelectedAttributes(updatedAttributes); // Update the state with new attributes
      } else {
        // If the value is not selected, add it to the values
        const updatedAttributes = selectedAttributes.map((attribute) =>
          attribute.name === name
            ? {
                ...attribute,
                values: [...attribute.values, value], // Add new value to the existing values array
              }
            : attribute
        );

        setSelectedAttributes(updatedAttributes); // Update the state with new attributes
      }
    } else {
      // If the attribute doesn't exist, create a new entry
      setSelectedAttributes([
        ...selectedAttributes,
        { name, values: [value] }, // New attribute with its value
      ]);
    }
  };
  const router = useRouter();

  const handleApplyFilter = () => {
    // Step 1: Get params (for example, query parameters)
    const searchParam = new URLSearchParams(window.location.search);
    const q = searchParam.get("q"); // Get the "q" property from URL params

    // Step 2: Construct the query string based on the data
    let qString = "";

    // Add the search parameter if it exists
    if (q) {
      qString += `?q=${q}`;
    }

    // Add price range filter
    const [minPrice, maxPrice] = priceRange;
    if (minPrice || maxPrice) {
      qString += `${qString ? "&" : "?"}min=${minPrice}&max=${maxPrice + 10}`;
    }

    // Add selected categories with indexes
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((categoryId, index) => {
        qString += `${qString ? "&" : "?"}categoryIds[${index}]=${categoryId}`;
      });
    }

    if (selectedAttributes.length > 0) {
      selectedAttributes.forEach((attribute, index) => {
        const { name, values } = attribute;
        if (name && values.length > 0) {
          // First, set the name as attributes[<index>].name
          qString += `${qString ? "&" : "?"}attributes[${index}][name]=${name}`;

          // Then, loop through values to set attributes[<index>].values[<value_index>]
          values.forEach((value, valueIndex) => {
            qString += `&attributes[${index}][values][${valueIndex}]=${value}`;
          });
        }
      });
    }

    console.log("Generated Query String: ", qString);
    // Call API or perform further actions with the generated query string

    router.push("/search" + qString);
    setQStr?.(qString);
  };

  if (filterOptions?.categories) {
    console.log("categories", Object.values(filterOptions?.categories));
  }

  const getFormatedCategories = (payload: unknown) => {
    if (payload) {
      if (Array.isArray(payload)) {
        return payload; // If it's already an array, return as is
      } else if (typeof payload === "object" && payload !== null) {
        return Object.values(payload); // If it's an object, convert it to an array
      } else {
        return []; // Return an empty array if the payload is not an array or object
      }
    } else {
      return [];
    }
  };
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-72 space-y-6 bg-card p-6 rounded-lg border"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <SlidersHorizontal className="h-5 w-5" />
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="hover:no-underline">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <p>Min Price: {priceRange[0]}</p>
              <p>Max Price: {priceRange[1]}</p>
            </div>
            <div className="px-2 mt-2">
              <Slider
                defaultValue={[
                  Number(filterOptions?.minPrice),
                  Number(filterOptions?.maxPrice),
                ]}
                max={filterOptions?.maxPrice}
                step={10}
                className="mt-6"
                value={priceRange} // Set the value of the slider from state
                onValueChange={handleValueChange}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            {filterOptions?.categories && (
              <div className="space-y-2">
                {filterOptions?.categories &&
                  getFormatedCategories(filterOptions?.categories).map(
                    (category) => (
                      <div
                        key={category.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          onClick={() => {
                            handleCheckBox(category.id);
                          }}
                          checked={
                            selectedCategories.includes(category.id)
                              ? true
                              : false
                          }
                          id={category.id.toString()}
                        />
                        <label
                          htmlFor={category.id.toString()}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                    )
                  )}
              </div>
            )}
            {/* <div className="space-y-2">
              {filterOptions?.categories &&
                filterOptions?.categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      onClick={() => {
                        handleCheckBox(category.id);
                      }}
                      checked={
                        selectedCategories.includes(category.id) ? true : false
                      }
                      id={category.id.toString()}
                    />
                    <label
                      htmlFor={category.id.toString()}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
            </div> */}
          </AccordionContent>
        </AccordionItem>

        {filterOptions && (
          <>
            {attributeOptions.map((item) => (
              <AccordionItem value={item?.name} className="border-none">
                <AccordionTrigger className="hover:no-underline">
                  {item?.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-3 gap-2">
                    <>
                      {item.values.map((value) => (
                        <Button
                          onClick={() =>
                            handleSetVariation({
                              name: item?.name,
                              value: value,
                            })
                          }
                          key={value}
                          variant="outline"
                          className={`w-full hover:bg-primary hover:text-primary-foreground ${
                            selectedAttributes
                              .find((attribute) => attribute.name === item.name)
                              ?.values.includes(value)
                              ? "bg-black text-white"
                              : ""
                          }`}
                        >
                          {value}
                        </Button>
                      ))}
                    </>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </>
        )}
      </Accordion>

      <div className="pt-4">
        <Button onClick={handleApplyFilter} className="w-full">
          Apply Filters
        </Button>
      </div>
    </motion.aside>
  );
}
