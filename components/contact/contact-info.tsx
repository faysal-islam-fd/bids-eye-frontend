

"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Shahbag Road, Dhaka, Bangladesh"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["01770-586664"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["birdseyeoffice22@gmail.com"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8am - 6pm", "Saturday: 9am - 4pm", "Sunday: Closed"]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-8">
      <div className="space-y-8">
        {contactDetails.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 p-3 rounded-xl">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}