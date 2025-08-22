'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import CategoryMenu from '@/components/navigation/CategoryMenu';

interface NavigationMenuProps {
  isCategoryOpen: boolean;
  onCategoryEnter: () => void;
  onCategoryLeave: () => void;
}

export default function NavigationMenu({ isCategoryOpen, onCategoryEnter, onCategoryLeave }: NavigationMenuProps) {
  return (
    <motion.nav
      variants={fadeIn('up')}
      initial="hidden"
      animate="show"
      className="hidden lg:flex items-center space-x-8"
    >
      <a href="/" className="hover:text-primary transition-colors">Home</a>
      <div
        onMouseEnter={onCategoryEnter}
        onMouseLeave={onCategoryLeave}
        className="relative group"
      >
        <button className="hover:text-primary transition-colors py-4">
          Categories
        </button>
        {isCategoryOpen && <CategoryMenu isOpen={isCategoryOpen} />}
      </div>
      <a href="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</a>
      <a href="/sale" className="hover:text-primary transition-colors">Sale</a>
      <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
    </motion.nav>
  );
}