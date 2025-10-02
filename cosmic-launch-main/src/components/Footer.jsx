import { Rocket, Twitter, Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 mb-12">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block">
              <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  LaunchMatch
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed text-base">
              Connecting innovative startups with passionate early adopters. Join our community and be part of the next big thing.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Mail, href: "/contact", label: "Email" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "Explore Startups", href: "#startups" },
                { label: "Submit Startup", href: "/submit-startup" },
                { label: "For Adopters", href: "/signup" },
                { label: "Success Stories", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: "Help Center", href: "#" },
                { label: "FAQ", href: "#faq" },
                { label: "Community", href: "#" },
                { label: "Blog", href: "#" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Get the latest startups and early adopter opportunities delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
              <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:scale-105">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center md:text-left flex items-center gap-2">
              © 2024 LaunchMatch. Made with{" "}
              <Heart className="h-3.5 w-3.5 text-red-500 fill-current inline-block" /> for innovators
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" }
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
