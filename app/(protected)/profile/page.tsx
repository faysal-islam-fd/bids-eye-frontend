
"use client";

import { motion } from "framer-motion";
import ProfileTabs from "@/components/profile/tab/profile-tabs";
import { useState } from "react";
import ProfileHeader from "@/components/profile/profile-header";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <ProfileHeader />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>
    </div>
  );
}