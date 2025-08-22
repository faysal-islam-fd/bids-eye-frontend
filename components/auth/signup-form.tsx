"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Loader2, Phone, Code } from "lucide-react";
import authApiSlice from "@/redux/api/authApiSlice";
import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phone, setPhone] = useState("");
  const [varificationCode, setVarificationCode] = useState("");
  const [checked, setChecked] = useState(true);

  const [signup, { data, isLoading, isError, isSuccess, error }] =
    authApiSlice.useSignupMutation();

  const handleSubmit = () => {
    if (
      firstName &&
      email &&
      password &&
      passwordConfirmation &&
      phone &&
      varificationCode &&
      checked
    ) {
      if (password !== passwordConfirmation) {
        toast.error("Password not matched.");
      } else {
        signup({
          firstName: firstName,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation,
          phone: phone,
          varificationCode: varificationCode,
        });
      }
    } else {
      toast.error("All fields are required.");
    }
  };

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
              if ((errorData as any)?.errors?.firstName) {
                toast.error((errorData as any)?.errors?.firstName[0]);
              }
              if ((errorData as any)?.errors?.password) {
                toast.error((errorData as any)?.errors?.password[0]);
              }
              if ((errorData as any)?.errors?.verificationCode) {
                toast.error((errorData as any)?.errors?.verificationCode[0]);
              }
              if ((errorData as any)?.errors?.phone) {
                toast.error((errorData as any)?.errors?.phone[0]);
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
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="pl-10"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <div className="flex items-center gap-x-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <VarificationCodeSendButton email={email} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="Vaeification">Varification code</Label>
        <div className="relative">
          <Code className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="Vaeification"
            type="text"
            placeholder="Varification code"
            className="pl-10"
            value={varificationCode}
            onChange={(e) => setVarificationCode(e.target.value)}
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
            placeholder="Create a password"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            className="pl-10"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-number">Phone number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="phone-number"
            type="text"
            placeholder="Confirm your password"
            className="pl-10"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          checked={checked}
          onChange={() => setChecked(!checked)}
          type="checkbox"
          id="terms"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button
        onClick={handleSubmit}
        type="button"
        className="w-full"
        disabled={
          firstName &&
          email &&
          password &&
          passwordConfirmation &&
          phone &&
          varificationCode &&
          checked
            ? false
            : true
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </>
        ) : (
          "Create Account"
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

const VarificationCodeSendButton = ({ email }: { email: string }) => {
  const [send, { data, isLoading, isSuccess, isError, error }] =
    authApiSlice.useSendSignupOtpMutation();
  const handleSend = () => {
    if (!email) {
      toast.error("Please provide email");
    } else {
      send(email);
    }
  };

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
      console.log(data);
      if (data?.message) {
        toast.success(data?.message);
      }
    }
  }, [isSuccess, isError]);

  return (
    <Button onClick={handleSend}>
      {isLoading ? (
        <>
          {" "}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </>
      ) : (
        "Send"
      )}
    </Button>
  );
};
