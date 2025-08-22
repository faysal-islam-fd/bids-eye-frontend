

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package, Settings } from "lucide-react";
import OrdersList from "../order-list";
import WishlistTab from "./wishlist-tab";
import PaymentTab from "./payment-tab";
import ReviewsTab from "./reviews-tab";
import SettingsTab from "./settings-tab";


interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    // { id: "wishlist", label: "Wishlist", icon: Heart },
    // { id: "payments", label: "Payments", icon: CreditCard },
    // { id: "reviews", label: "Reviews", icon: Star },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-1 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] relative rounded-lg px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/5 rounded-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "orders" && <OrdersList />}
            {activeTab === "wishlist" && <WishlistTab />}
            {activeTab === "payments" && <PaymentTab />}
            {activeTab === "reviews" && <ReviewsTab />}
            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
