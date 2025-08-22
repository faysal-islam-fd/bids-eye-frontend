
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew?: boolean;
    discount?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <motion.div
            className="relative aspect-square overflow-hidden"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <OptimizedImage
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              quality={85}
              className="object-cover"
            />
          </motion.div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-500">New</Badge>
            )}
            {product.discount && (
              <Badge className="bg-red-500">-{product.discount}%</Badge>
            )}
          </div>

          {/* Quick actions */}
          <motion.div 
            className="absolute top-2 right-2 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          >
            <Button size="icon" variant="secondary" className="rounded-full">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold">৳ {product.price.toFixed(2)}</span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through">
                ৳ {(product.price * (1 + product.discount/100)).toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}