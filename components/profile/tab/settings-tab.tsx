"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useEffect, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import userApiSlice from "@/redux/api/userApiSlice";
import { GetAuthContext } from "@/context/authContext";

export default function SettingsTab() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [updateUser, { data, isSuccess }] = userApiSlice.useEditUserMutation();
  const handleSaveChange = () => {
    const formData = new FormData();

    if (firstName) {
      formData.append("firstName", firstName);
    }

    if (lastName) {
      formData.append("lastName", lastName);
    }

    if (phone) {
      formData.append("phone", phone);
    }

    if (address) {
      formData.append("address", address);
    }
    updateUser(formData);
  };

  const authContext = useContext(GetAuthContext);
  useEffect(() => {
    if (data?.user) {
      authContext?.updateUser(data.user);

      console.log(data?.user);
    }
  }, [isSuccess]);
  return (
    <div className=" mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            Personal Information
          </h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  defaultValue="John"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  defaultValue="Doe"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                id="location"
                type="text"
                defaultValue="Dhaka"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                type="tel"
                defaultValue="+1 234 567 890"
              />
            </div>
          </div>
        </div>

        {/* Password Reset */}
        {/* <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary" />
            Change Password
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="flex space-x-4">
          <Button className="flex-1" variant="outline">
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
