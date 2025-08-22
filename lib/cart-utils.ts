import { CartItemType } from "@/app/types/cart";


export function groupByCategory(items: CartItemType[]): Record<string, CartItemType[]> {
  return items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, CartItemType[]>);
}