
"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/Birdseyefashionbd",
    color: "hover:bg-blue-500"
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/birdseyefashio1",
    color: "hover:bg-sky-500"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/birdseyefashionbd",
    color: "hover:bg-pink-500"
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@birdseyefashionhouse",
    color: "hover:bg-red-500"
  }
];

export default function ContactSocial() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8 text-center"
    >
      <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Follow us on social media to stay updated with our latest products,
        promotions, and company news.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.url}
             
              className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 
                ${social.color} hover:text-white transition-all duration-300 group`}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}