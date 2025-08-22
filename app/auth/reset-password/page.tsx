"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SocialLogin from "@/components/auth/SocialLogin";
import authApiSlice from "@/redux/api/authApiSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function AuthPage() {
  const [email, setEmail] = useState("");

  const [sendLink, { data, isLoading, isSuccess, isError, error }] =
    authApiSlice.useSendResetPasswordLinkMutation();

  const handleSendResetLink = () => {
    if (email) {
      sendLink({
        email: email,
        frontendURL: location.origin + "/auth/reset-password",
      });
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      if (error) {
        // Check if error is FetchBaseQueryError
        console.log(error);
        if ("data" in error) {
          const errorData = error?.data;
          if (errorData) {
            if (errorData && (errorData as any)?.errors) {
              if ((errorData as any)?.errors?.email) {
                toast.error((errorData as any)?.errors?.email[0]);
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
      if (data?.message) {
        toast.success(data?.message);
        router.replace("/auth");
      }
    }
  }, [isSuccess, isError]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Right Side - Form Section */}
          <div className="w-full p-12">
            <div className="">
              <h1 className="text-3xl font-bold mb-4">Reset your password</h1>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  disabled={isLoading ? true : false}
                  type="button"
                  className="w-full"
                  onClick={handleSendResetLink}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>

                <div className="flex items-center justify-between">
                  <Link
                    href="/auth"
                    className="text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Remembered password?
                  </Link>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialLogin />
              </motion.form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
