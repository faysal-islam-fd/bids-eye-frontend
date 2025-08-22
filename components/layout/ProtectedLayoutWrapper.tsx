"use client";
import { GetAuthContext } from "@/context/authContext";
import { Loader2 } from "lucide-react";
import React, { useContext } from "react";

const ProtectedLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authContext = useContext(GetAuthContext);

  if (authContext?.isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader2 className="w-20 h-20 animate-spin" />
      </div>
    );
  }
  if (authContext?.user === null) {
    location.replace("/auth");
  } else {
    return <div>{children}</div>;
  }
};

export default ProtectedLayoutWrapper;
