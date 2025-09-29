import { Rocket, Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">LaunchMatch</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md text-balance leading-relaxed">
              Connecting innovative startups with early adopters to create the future together. 
              Join our community and be part of the next big thing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Explore Startups</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Submit Startup</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Early Adopter Program</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors block py-1">Community</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2024 LaunchMatch. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
