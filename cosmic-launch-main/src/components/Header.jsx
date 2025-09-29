import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-strong">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900 gradient-text">FirstUsers</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <a href="#startups" className="nav-item">
            Explore Startups
          </a>
          <a href="#guides" className="nav-item flex items-center">
            Guides
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="#faq" className="nav-item">
            FAQ
          </a>
          <a href="#contact" className="nav-item">
            Contact us
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
          <Link to="/login">
            <Button variant="ghost" className="text-base font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 px-6 py-2 transition-transform duration-200 hover:-translate-y-0.5">
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-2 shadow-medium hover:shadow-strong transition-all duration-200 hover:-translate-y-0.5">
              Join Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mobile-nav md:hidden"
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col space-y-4 p-6 pt-20"
          >
            <nav className="flex flex-col space-y-4">
              <a 
                href="#startups" 
                className="text-gray-700 hover:text-blue-600 text-lg font-medium py-3 transition-colors rounded-lg hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Explore Startups
              </a>
              <a 
                href="#guides" 
                className="text-gray-700 hover:text-blue-600 text-lg font-medium py-3 transition-colors flex items-center rounded-lg hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Guides
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <a 
                href="#faq" 
                className="text-gray-700 hover:text-blue-600 text-lg font-medium py-3 transition-colors rounded-lg hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-blue-600 text-lg font-medium py-3 transition-colors rounded-lg hover:bg-blue-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </a>
            </nav>
            <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="text-lg font-medium justify-start text-blue-600 border border-blue-200 hover:bg-blue-50 w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium w-full shadow-medium hover:shadow-strong">
                  Join Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
