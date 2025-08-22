"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { GetAuthContext } from "@/context/authContext";
import { Config } from "@/config/Config";
import userApiSlice from "@/redux/api/userApiSlice";
import toast from "react-hot-toast";
import NextImage from "next/image";

export default function ProfileHeader() {
  const authContext = useContext(GetAuthContext);
  const [image, setImage] = useState<File | null>(null);
  const getProfilePhoto = (url: string) => {
    const array = url.split("https://");
    console.log(url, array);
    if (image) {
      return URL.createObjectURL(image);
    } else {
      if (array.length === 2) {
        return url;
      } else {
        return Config.BACKEND_STORASE_URL + "/" + url;
      }
    }
  };

  const getYear = (time: string) => {
    const date = new Date(time);
    return date.getFullYear();

    // return "";
  };

  const [updateProfile, { isSuccess, isError, data }] =
    userApiSlice.useEditUserMutation();
  const handleSave = () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      updateProfile(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      authContext?.updateUser(data?.user);
      toast.success("Profile photo updated.");
    }
  }, [isSuccess]);
  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8">
      <div className="flex flex-col md:flex-row h-full items-center space-y-6 md:space-y-0 md:space-x-8">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-primary/5 overflow-hidden relative bg-white">
            <NextImage
              src={getProfilePhoto(
                authContext?.user?.user?.profile_image ?? ""
              )}
              alt="Profile"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="absolute bottom-2 right-2 bg-white rounded-full w-8 h-8 shadow-lg hover:shadow-xl transition-shadow"
          >
            <label htmlFor="photoEdit">
              <Edit className="w-4 h-4 cursor-pointer" />
              <input
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                type="file"
                name=""
                id="photoEdit"
                hidden
              />
            </label>
          </Button>
        </motion.div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-1"
            >
              {authContext?.user?.user?.firstName}{" "}
              {authContext?.user?.user?.lastName ?? ""}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500"
            >
              Premium Member since{" "}
              {authContext?.user &&
                getYear(authContext?.user?.user?.created_at ?? "")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 text-sm"
          >
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <span>{authContext?.user?.user?.address ?? "Bangladesh"}</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              <span>{authContext?.user?.user?.email}</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-full">
              <Phone className="w-4 h-4 mr-2 text-primary" />
              <span>{authContext?.user?.user?.phone ?? "Not provied"}</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        {/* <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-8 bg-gray-50 p-6 rounded-xl"
        >
          {[
            { label: "Orders", value: "24" },
            { label: "Reviews", value: "12" },
            { label: "Points", value: "2.4k" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div> */}

        <div className="h-full flex items-start">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}
