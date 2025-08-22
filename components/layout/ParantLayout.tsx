"use client";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import ContextProvider from "@/context/ContextProvider";
import { GetAuthContext } from "@/context/authContext";
const ParantLayout = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(GetAuthContext);
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');
  if (authContext?.isLoading) {
    return "Loading";
  } else {
    return (
      <div>
        <Toaster />
        <ContextProvider>
          {!isAuthPage && <Header />}
          {children}
          {!isAuthPage && <Footer />}
        </ContextProvider>
      </div>
    );
  }
};

export default ParantLayout;
