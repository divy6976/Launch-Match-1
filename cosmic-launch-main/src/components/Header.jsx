import { Button } from "@/components/ui/button";
import { Rocket, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg"
          : "backdrop-blur-sm bg-white/60 border-b border-gray-100/50"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer group"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              LaunchMatch
            </span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-2 rounded-full border border-gray-200/60 bg-white/80 backdrop-blur-sm px-2 py-2 shadow-sm">
            <a
              href="#startups"
              className="group relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full transition-all duration-200 hover:bg-blue-50"
            >
              Explore Startups
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-200" />
            </a>
            <div className="group relative">
              <button className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full transition-all duration-200 hover:bg-blue-50">
                Resources
                <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
            <a
              href="#faq"
              className="group relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full transition-all duration-200 hover:bg-blue-50"
            >
              FAQ
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-200" />
            </a>
            <Link to="/contact">
              <button className="group relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-full transition-all duration-200 hover:bg-blue-50">
                Contact
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4 transition-all duration-200" />
              </button>
            </Link>
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="ghost"
              className="text-sm font-semibold text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Log In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2.5 hover:bg-blue-50 rounded-xl transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    LaunchMatch
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <div className="flex flex-col space-y-2">
                    <a
                      href="#startups"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-base font-medium py-3.5 px-4 transition-all rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Explore Startups
                    </a>
                    <button className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-base font-medium py-3.5 px-4 transition-all rounded-xl flex items-center justify-between">
                      <span>Resources</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <a
                      href="#faq"
                      className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-base font-medium py-3.5 px-4 transition-all rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      FAQ
                    </a>
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-base font-medium py-3.5 px-4 transition-all rounded-xl">
                        Contact
                      </button>
                    </Link>
                  </div>
                </nav>

                <div className="p-6 border-t border-gray-100 space-y-3">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button
                      variant="ghost"
                      className="w-full text-base font-semibold text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 rounded-xl py-3"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold shadow-md hover:shadow-xl rounded-xl py-3">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
