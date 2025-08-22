import authApiSlice from "@/redux/api/authApiSlice";
import React, { useEffect } from "react";

export const LogoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [logout, { isSuccess }] = authApiSlice.useLogoutMutation();
  const handleLogout = () => {
    logout("");
  };

  useEffect(() => {
    if (isSuccess) {
      location.replace("/");
    }
  }, [isSuccess]);

  return <button onClick={handleLogout}>{children}</button>;
};
