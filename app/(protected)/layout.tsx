import ProtectedLayoutWrapper from "@/components/layout/ProtectedLayoutWrapper";
import React from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayoutWrapper>{children}</ProtectedLayoutWrapper>;
}
