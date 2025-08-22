'use client'

import * as Dialog from '@radix-ui/react-dialog'
import NextImage from 'next/image'
import { X, Plus, Minus, Star, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/hooks/use-products'

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  closeModal: () => void
}

export default function QuickView({ product, isOpen, closeModal }: QuickViewProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')

  if (!product) return null

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
}

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root 
          open={isOpen} 
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="fixed inset-0 flex items-center justify-center p-4 z-50"
              >
                <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <div className="flex flex-col md:flex-row">
                    <motion.div 
                      className="md:w-1/2 md:pr-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <NextImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                    <motion.div 
                      className="md:w-1/2 mt-6 md:mt-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <Dialog.Title className="text-3xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </Dialog.Title>
                      <motion.div 
                        className="flex items-center mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        {/* <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div> */}
                        {/* <span className="ml-2 text-sm text-gray-600">
                          ({product.reviews} reviews)
                        </span> */}
                      </motion.div>
                      <motion.p 
                        className="text-4xl font-semibold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        ${product.price.toFixed(2)}
                      </motion.p>
                      {/* <motion.p 
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        {product.description}
                      </motion.p> */}
                      
                      <motion.div 
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                      >
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                        {/* <div className="flex space-x-2">
                          {product.colors.map((color) => (
                            <motion.button
                              key={color}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                selectedColor === color ? 'ring-2 ring-indigo-500' : ''
                              }`}
                              style={{ backgroundColor: color.toLowerCase() }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedColor(color);
                              }}
                            />
                          ))}
                        </div> */}
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.3 }}
                      >
                        <span className="mr-3 text-gray-700">Quantity:</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            decrementQuantity();
                          }}
                          className="text-gray-500 focus:outline-none focus:text-gray-600"
                        >
                          <Minus className="h-5 w-5" />
                        </motion.button>
                        <span className="mx-2 text-gray-700">{quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            incrementQuantity();
                          }}
                          className="text-gray-500 focus:outline-none focus:text-gray-600"
                        >
                          <Plus className="h-5 w-5" />
                        </motion.button>
                      </motion.div>
                      
                      {/* <motion.p 
                        className="text-sm text-gray-500 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                      >
                        {product.stock} items in stock
                      </motion.p> */}

                      <motion.button
                        whileHover={{ scale: 0.95 }}
                        whileTap={{ scale:1 }}
                        type="button"
                        className="w-full bg-gradient-to-r from-stone-800 to-stone-900 text-white py-3 px-4 rounded-md   transition duration-300 flex items-center justify-center"
                        onClick={closeModal}
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </motion.button>
                    </motion.div>
                  </div>
                  <Dialog.Close asChild>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-2 right-2 text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      aria-label="Close"
                    >
                      <X className="h-6 w-6" />
                    </motion.button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}

