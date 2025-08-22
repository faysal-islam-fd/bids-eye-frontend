"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Heart,
  UserCircle,
  LogOut,
  Package,
  Sparkles,
  Crown,
  Zap
} from "lucide-react";
import { fadeIn } from "@/lib/animations";
import CategoryMenu from "@/components/navigation/CategoryMenu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartDrawer from "../cart/cart-drawer";
import useIsMobile from "@/hooks/use-is-mobile";
import categoryApiSlice from "@/redux/api/categoryApiSlice";
import { ICategory } from "@/types";
import { LogoutWrapper } from "@/lib/logout";
import { GetAuthContext } from "@/context/authContext";
import { CartContext } from "@/context/CartContext";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/app/store";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const authContext = useContext(GetAuthContext);
  const isMobile = useIsMobile();
  const router = useRouter();
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const profilePopupRef = useRef<HTMLDivElement>(null);

  const cartContext = useContext(CartContext);
  const isCartOpen = cartContext?.isCartOpen;
  const setIsCartOpen = cartContext?.setIsCartOpen;
  const toggleCart = cartContext?.toggleCart;
  
  const cartItems = useSelector((state: RootState) => state.cart.products);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  const handleSearch = () => {
    if (searchValue) {
      router.push(`/search?q=${searchValue}`);
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside the search navigation area
      const navElement = document.querySelector('[data-search-nav]');
      const searchButton = document.querySelector('[data-search-button]');
      
      if (
        isSearchOpen &&
        navElement &&
        !navElement.contains(event.target as Node) &&
        searchButton &&
        !searchButton.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sleek Announcement Bar */}
      <motion.div 
        className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center text-[11px] font-semibold  tracking-wide">
          FREE SHIPPING ON ORDERS OVER ৳5000 • PREMIUM FASHION • WORLDWIDE DELIVERY
        </div>
      </motion.div>

      {/* Revolutionary Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-xl" 
            : "bg-white/90 backdrop-blur-xl border-b border-gray-100"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-3">
            
            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative z-50 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Simple Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center"
            >
              <Link href="/" className="group relative">
                <div className="relative h-5 md:h-6 w-[80px] md:w-[100px]">
                  <NextImage
                    src="/logo-big.png"
                    alt="Birds Eye Fashion"
                    fill
                    sizes="100px"
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

            {/* Dynamic Navigation with Search */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center flex-1 justify-center"
              data-search-nav
            >
              <AnimatePresence mode="wait">
                {!isSearchOpen ? (
                  <motion.div
                    key="navigation"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-4"
                  >
                    {[
                      { href: "/", label: "Home" },
                      { href: "/shop", label: "Shop" },
                      { href: "/collections", label: "Collections" },
                      { href: "/contact", label: "Contact" }
                    ].map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="relative group text-gray-900 font-medium text-sm transition-all duration-300 hover:text-blue-600"
                      >
                        <span className="relative">
                          {item.label}
                        </span>
                        
                        {/* Animated underline */}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                        
                        {/* Subtle background on hover */}
                        <div className="absolute -inset-x-2 -inset-y-1 bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                      </Link>
                    ))}
                    
                    {/* Categories Dropdown */}
                    <div
                      onMouseEnter={() => setIsCategoryOpen(true)}
                      onMouseLeave={() => setIsCategoryOpen(false)}
                      className="relative"
                    >
                      <button className="relative group text-gray-900 font-medium text-sm transition-all duration-300 hover:text-blue-600 flex items-center gap-1">
                        <span className="relative">
                          Categories
                          <motion.div
                            animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="inline-block ml-1"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </motion.div>
                        </span>
                        
                        {/* Animated underline */}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
                        
                        {/* Subtle background on hover */}
                        <div className="absolute -inset-x-2 -inset-y-1 bg-blue-50 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                      </button>
                      <CategoryMenu isOpen={isCategoryOpen} />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ opacity: 0, scale: 0.8, width: 0 }}
                    animate={{ opacity: 1, scale: 1, width: "400px" }}
                    exit={{ opacity: 0, scale: 0.8, width: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                        setIsSearchOpen(false);
                      }}
                      className="relative"
                    >
                      <input
                        ref={searchInputRef}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text"
                        placeholder="Search for amazing products..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 text-base"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
                      >
                        <Search className="w-3 h-3" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>

            {/* Clean Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-2"
            >
              {/* Search Toggle Button */}
              <motion.button
                onClick={toggleSearch}
                className="relative p-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                data-search-button
              >
                <motion.div
                  animate={{ rotate: isSearchOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSearchOpen ? (
                    <X className="w-3.5 h-3.5" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                </motion.div>
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                className="relative p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-3.5 h-3.5" />
              </motion.button>

              {/* Cart Button */}
              <motion.button
                onClick={toggleCart}
                className="relative p-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                
                {/* Cart Badge */}
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    <motion.span
                      // Avoid dynamic keys that change between SSR and CSR
                      key="cart-badge"
                      initial={{ scale: 1.5 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {cartItemCount}
                    </motion.span>
                  </motion.div>
                )}
              </motion.button>

              {/* Profile Button */}
              {authContext?.user ? (
                <div
                  onMouseEnter={() => setIsProfilePopupOpen(true)}
                  onMouseLeave={() => setIsProfilePopupOpen(false)}
                  className="relative"
                >
                  <motion.button
                    className="relative p-1.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <UserCircle className="w-3.5 h-3.5" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {isProfilePopupOpen && (
                      <motion.div
                        ref={profilePopupRef}
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute right-0 top-16 w-56 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-50"
                      >
                        <div className="space-y-2">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                          >
                            <UserCircle className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/orders"
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                          >
                            <Package className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            <span>Orders</span>
                          </Link>
                          <div className="border-t border-gray-200 my-2" />
                          <LogoutWrapper>
                            <button className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-300 w-full text-left group">
                              <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                              <span>Logout</span>
                            </button>
                          </LogoutWrapper>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/auth">
                  <motion.button
                    className="relative px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-300 font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-background border-r border-border shadow-premium-xl overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Close Button */}
                <div className="flex justify-between items-center">
                  <div className="relative h-8 w-[120px]">
                    <NextImage
                      src="/logo-big.png"
                      alt="Birds Eye Fashion"
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-10 w-10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Menu Items */}
                <div className="space-y-2">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/shop", label: "Shop" },
                    { href: "/collections", label: "Collections" },
                    { href: "/contact", label: "Contact" }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Categories with Expandable Menu */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                    >
                      Categories
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isCategoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-1 card-premium p-3">
                            <CategoryMenuMobile setIsMobileMenuOpen={setIsMobileMenuOpen} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* User Section */}
                <div className="pt-4 border-t border-border space-y-2">
                  {authContext?.user ? (
                    <>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                      >
                        <UserCircle className="w-5 h-5" />
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                      >
                        <Package className="w-5 h-5" />
                        Orders
                      </Link>
                      <LogoutWrapper>
                        <button className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 w-full text-left">
                          <LogOut className="w-5 h-5" />
                          Logout
                        </button>
                      </LogoutWrapper>
                    </>
                  ) : (
                    <Link
                      href="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                    >
                      <User className="w-5 h-5" />
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      {isCartOpen !== undefined && setIsCartOpen !== undefined && (
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </>
  );
}

const CategoryMenuItem = ({
  item,
  setIsMobileMenuOpen,
}: {
  item: ICategory;
  setIsMobileMenuOpen: (value: boolean) => void;
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Link
          href={"/shop/" + item?.slug}
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/30 rounded-md transition-all duration-200"
        >
          {item?.name}
        </Link>
        {item?.children && item.children.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSubOpen(!isSubOpen)}
            className="h-8 w-8 ml-2"
          >
            <ChevronDown 
              className={`w-3 h-3 transition-transform duration-300 ${
                isSubOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        )}
      </div>
      
      <AnimatePresence>
        {isSubOpen && item?.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-4 space-y-1"
          >
            {item.children.map((sub) => (
              <Link
                key={sub.id}
                href={`/shop/${item?.slug}?sub_id=${sub.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-accent/20 rounded-md transition-all duration-200"
              >
                {sub?.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryMenuMobile = ({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: (value: boolean) => void;
}) => {
  const { data, isSuccess, isError } =
    categoryApiSlice.useGetWithSubcategoriesQuery("");

  const [categories, setCategories] = useState<ICategory[]>([]);
  
  useEffect(() => {
    if (isSuccess && data?.categories) {
      setCategories(data.categories);
    }
  }, [isSuccess, data]);

  if (isError) {
    return (
      <div className="text-sm text-muted-foreground p-2">
        Failed to load categories
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.map((item) => (
        <CategoryMenuItem
          key={item.id}
          item={item}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      ))}
    </div>
  );
};