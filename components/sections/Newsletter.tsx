'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { Mail, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle newsletter subscription here
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="relative py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 relative">
        <motion.div
          variants={fadeIn('up', 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Clean Header */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-gray-600 mb-4 shadow-sm">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span className="text-xs font-medium">Newsletter</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              Join Our Newsletter
            </h2>
            
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Be the first to discover exclusive collections, insider fashion tips, and special offers
            </p>
          </div>

          {/* Clean Benefits */}
          <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: Sparkles,
                title: "VIP Access",
                description: "First look at new arrivals and limited editions"
              },
              {
                icon: Gift,
                title: "Exclusive Deals",
                description: "Member-only discounts up to 70% off"
              },
              {
                icon: Mail,
                title: "Style Secrets",
                description: "Weekly fashion insights from top designers"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg p-4 text-center transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
                  
                  {/* Icon */}
                  <div className="relative mb-3">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg mb-2 group-hover:bg-blue-100 transition-all duration-300">
                      <benefit.icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clean Newsletter Form */}
          <motion.div
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            {!isSubmitted ? (
              <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg p-6">
                
                <form onSubmit={handleSubmit} className="relative space-y-4">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl mb-3">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Get VIP Access</h3>
                    <p className="text-gray-600 text-sm">Join 50,000+ fashion lovers</p>
                  </div>

                  <div className="relative">
                    <Input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for exclusive access..."
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:bg-white transition-all duration-300"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="group relative w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!email}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Subscribe Now
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  
                  <p className="text-center text-gray-500 text-xs">
                    🔒 Your privacy is protected. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                    <Gift className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to the Elite! 🎉</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Check your email for your exclusive 30% welcome discount!
                  </p>
                  <div className="text-2xl">✨</div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}