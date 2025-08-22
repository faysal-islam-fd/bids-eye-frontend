import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encode = (input: string) => {
  const utf8String = unescape(encodeURIComponent(input)); // UTF-8 এনকোড
  return btoa(utf8String); // Base64 এনকোড
};

// ডিকোড করা
export const decode = (encoded: string) => {
  const decodedString = atob(encoded); // Base64 ডিকোড
  return decodeURIComponent(escape(decodedString)); // UTF-8 ডিকোড
};

export const formatDate = (date: string | null): string => {
  if (!date) return "Pending";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
