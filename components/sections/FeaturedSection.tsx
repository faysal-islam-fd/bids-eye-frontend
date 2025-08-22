

"use client";

import { motion } from "framer-motion";
import { Truck, Zap, Shield, Headphones, RotateCcw, Award } from "lucide-react";
import { fadeIn } from "@/lib/animations";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over ৳ 5000",
    color: "text-blue-600"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Within 24-48 hours in Dhaka",
    color: "text-yellow-600"
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "100% authentic products",
    color: "text-green-600"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
    color: "text-purple-600"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "text-red-600"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Curated fashion collections",
    color: "text-accent"
  }
];

export function FeaturedSection() {
  return (
    <section className="relative py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 relative">
        {/* Clean Header */}
        <motion.div
          variants={fadeIn("up", 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-600 mb-4 shadow-sm">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-medium">Why Choose Us</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
            Premium Experience
          </h2>
          
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Discover why customers trust Birds Eye Fashion for their premium fashion needs
          </p>
        </motion.div>

        {/* Clean Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Feature Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg p-6 text-center h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3 group-hover:bg-blue-100 transition-all duration-300">
                    <feature.icon className={`w-6 h-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        
                 {/* Clean Bottom Section */}
         <motion.div
           variants={fadeIn("up", 0.5)}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           className="text-center mt-12"
         >
           <div className="inline-flex flex-col sm:flex-row gap-3">
             <button className="group px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
               <span className="flex items-center gap-1">
                 Start Shopping
                 <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                 </svg>
               </span>
             </button>
             
             <button className="group px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 hover:scale-105">
               <span className="flex items-center gap-1">
                 Learn More
                 <svg className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </span>
             </button>
           </div>
         </motion.div>
      </div>


    </section>
  );
}