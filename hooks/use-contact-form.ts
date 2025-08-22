"use client";

import { useState } from "react";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Here you would typically:
    // 1. Validate the form data
    // 2. Send the data to your API
    // 3. Handle success/error states
    // 4. Show appropriate notifications

    setIsSubmitting(false);
  };

  return {
    isSubmitting,
    handleSubmit
  };
}