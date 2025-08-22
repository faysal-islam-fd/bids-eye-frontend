"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Loader2 } from "lucide-react";
import authApiSlice from "@/redux/api/authApiSlice";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, isLoading, isError, isSuccess, error }] =
    authApiSlice.useLoginMutation();

  const handleLogin = () => {
    if (email && password) {
      login({ email: email, password: password });
    }
  };

  useEffect(() => {
    if (isError) {
      if (error) {
        // Check if error is FetchBaseQueryError
        if ("data" in error) {
          const errorData = error?.data;
          if (errorData) {
            if (errorData && (errorData as any)?.errors) {
              if ((errorData as any)?.errors?.email) {
                toast.error((errorData as any)?.errors?.email[0]);
              }

              if ((errorData as any)?.errors?.password) {
                toast.error((errorData as any)?.errors?.password[0]);
              }
            } else {
              toast.error((errorData as any)?.message);
              console.log("Error data does not have 'errors':", errorData);
            }
          }
        } else {
          // Handle SerializedError or other cases
          console.log("SerializedError:", error);
        }
      }
    }

    if (isSuccess) {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data?.data?.token);
        location.replace("/");
      }
      if (data?.message) {
        toast.success(data?.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <motion.form
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="text"
            placeholder="Enter your email"
            className="pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="pl-10"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </Label>
        </div>
        <Link
          href="/auth/reset-password"
          className="text-sm font-medium text-primary hover:text-primary/80"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        onClick={handleLogin}
        type="button"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">Or continue with</span>
        </div>
      </div>

      <SocialLogin />
    </motion.form>
  );
}
