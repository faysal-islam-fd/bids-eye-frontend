"use client";
import { Loader2Icon, LoaderPinwheelIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const ProcessToken: React.FC = () => {
  const { token } = useParams();
  const decodedToken = decodeURIComponent(token as string);
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      if (token) {
        localStorage.setItem("accessToken", decodedToken);
        location.replace("/");
      }
    }
  }, []);
  
  return (
    <div>
      <div className="flex justify-center items-center h-[600px]">
        <Loader2Icon className="mr-2 h-20 w-20 animate-spin" />
      </div>
    </div>
  );
};

export default ProcessToken;
