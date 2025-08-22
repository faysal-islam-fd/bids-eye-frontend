'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Truck, 
  Clock, 
  Shield,
  ArrowUpRight,
  Heart
} from 'lucide-react';
import { fadeIn } from '@/lib/animations';
import categoryApiSlice from '@/redux/api/categoryApiSlice';
import { ICategory } from '@/types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NextImage from 'next/image';

export default function Footer() {
  const { data, isSuccess, isLoading,isError } =
    categoryApiSlice.useGetWithSubcategoriesQuery("");
 
    const [categories, setCategories] = useState<ICategory[]>([]);
    useEffect(() => {
      if (isSuccess) {
        if (data?.categories) {
          setCategories(data?.categories);
        }
      }
    }, [isSuccess, isError]);
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Stunning Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
      </div>
      
      {/* Trust Badges Section */}
      <div className="border-b border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated customer service" },
              { icon: CreditCard, title: "Easy Returns", desc: "30-day return policy" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeIn('up', index * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg mb-3 group-hover:bg-blue-500/20 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1">{item.title}</h3>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            variants={fadeIn('up', 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <Link href="/" className="inline-block group">
              <div className="relative h-8 w-[140px] group-hover:scale-105 transition-transform duration-300">
                <NextImage
                  src="/logo-big.png"
                  alt="Birds Eye Fashion"
                  fill
                  sizes="140px"
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            
            <p className="text-white/70 leading-relaxed max-w-md text-sm">
              Premium fashion retailer in Bangladesh, offering high-quality contemporary clothing for the modern wardrobe.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm text-white/80">Shahbag Road, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm text-white/80">01770-586664</span>
              </div>
              <div className="flex items-center gap-3 group hover:text-blue-400 transition-colors duration-300">
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm text-white/80">birdseyeoffice22@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/shop/${item.slug}`}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-blue-400 transition-all duration-200"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/collections", label: "Collections" },
                { href: "/contact", label: "Contact Us" },
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-blue-400 transition-all duration-200"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social - removed per request */}
        </div>
      </div>

      {/* Stunning Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>© 2025 Birds Eye Fashion. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="w-3 h-3 text-blue-400 hidden md:inline animate-pulse" />
              <span className="hidden md:inline">in Bangladesh</span>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 mr-2">We accept:</span>
              <div className="flex gap-1">
                {[
                  { name: "Visa", color: "bg-blue-600" },
                  { name: "MC", color: "bg-red-600" },
                  { name: "PP", color: "bg-blue-500" },
                  { name: "AE", color: "bg-green-600" }
                ].map((payment, index) => (
                  <div
                    key={payment.name}
                    className={`${payment.color} text-white text-xs font-bold px-2 py-1 rounded transition-all duration-300 hover:scale-110`}
                  >
                    {payment.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}