"use client";
import authApiSlice from "@/redux/api/authApiSlice";
import { createContext, useEffect, useState, ReactNode } from "react";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  gender: string | null;
  profile_image: string | null;
  preferences: any | null;
  social_id: string | null;
  social_provider: string | null;
  created_at: string;
  last_login: string | null;
  status: string;
  is_verified: boolean | number;
  is_deleted: boolean | string;
}

interface IAuthUser {
  permissions: {}[];
  roles: {}[];
  user: {
    permissions: string[];
    roles: string[];
    user: IUser;
  };
}

interface IAuthContext {
  user: {
    permissions: string[];
    roles: string[];
    user: IUser;
  }; 
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateUser: (newUser: any) => void;
}

export const GetAuthContext = createContext<IAuthContext | undefined>(
  undefined
);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = ({ children }: AuthContextProps) => {
  const [user, setUser] = useState<any>(null); // Adjust type as necessary
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: authData,
    isSuccess: isAuthSuccess,
    isError: isAuthError,
    error: authError,
  } = authApiSlice.useGetAuthInfoQuery("");

  const updateUser = (newUser: {}) => {
    setUser((prevUser: IAuthUser) => ({
      ...prevUser,
      user: { ...newUser }, 
    }));
  };
  useEffect(() => {
    if (isAuthSuccess) {
      setUser(authData);
      setIsLoading(false);
    }
    if (isAuthError) {
      setIsLoading(false);
    }
  }, [isAuthSuccess, isAuthError, authData]);

  return (
    <GetAuthContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, updateUser }}
    >
      {children}
    </GetAuthContext.Provider>
  );
};
