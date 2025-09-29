import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  ExternalLink, 
  Zap, 
  Smartphone, 
  Globe, 
  Brain,
  Shield,
  Palette,
  ChevronRight,
  Heart,
  Gift,
  Rocket,
  ShoppingCart
} from "lucide-react";

const StartupDiscovery = () => {
  const [upvotedStartups, setUpvotedStartups] = useState(new Set());

  const toggleUpvote = (startupId) => {
    setUpvotedStartups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(startupId)) {
        newSet.delete(startupId);
      } else {
        newSet.add(startupId);
      }
      return newSet;
    });
  };

  const getUpvoteCount = (startup) => {
    const baseUpvotes = startup.upvotes;
    const isUpvoted = upvotedStartups.has(startup.id);
    return isUpvoted ? baseUpvotes + 1 : baseUpvotes;
  };

  const mockStartups = [
    {
      id: 1,
      name: "EzyDocs",
      description: "Streamline your document management with our AI-powered platform that makes organizing and finding files effortless.",
      category: "Productivity",
      type: "B2B",
      tags: ["SaaS", "FinTech", "Productivity"],
      views: 2,
      upvotes: 0,
      hasSpecialOffer: true,
      specialOfferText: "Special Offer for Early Adopters. This startup has a special discount available for early adopters!",
      specialOfferCode: null,
      founder: "Emma Rodriguez",
      industry: "Technology",
      icon: Globe
    },
    {
      id: 2,
      name: "QuillSocial",
      description: "Revolutionary social media management platform that helps businesses create engaging content and grow their online presence.",
      category: "Social Media",
      type: "B2B",
      tags: ["SaaS", "Social Media", "AI/ML"],
      views: 8,
      upvotes: 1,
      hasSpecialOffer: true,
      specialOfferText: "Special Offer for Early Adopters. This startup has a special discount available for early adopters!",
      specialOfferCode: null,
      founder: "Sarah Johnson",
      industry: "Technology",
      icon: Brain
    },
    {
      id: 3,
      name: "Shaflex",
      description: "Advanced automation platform that helps businesses streamline their workflows and increase productivity through intelligent process management.",
      category: "Automation",
      type: "B2C",
      tags: ["SaaS", "Social Media", "Automation"],
      views: 14,
      upvotes: 4,
      hasSpecialOffer: false,
      specialOfferText: "This startup doesn't have a special offer right now.",
      specialOfferCode: null,
      founder: "David Kim",
      industry: "Technology",
      icon: Rocket
    }
  ];

  return (
    <section id="startups" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl mb-4 text-balance">
            Discover Our <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Startups</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-balance leading-relaxed">
            Explore innovative startups looking for early adopters. Be the first to try 
            products that match your needs.
          </p>
        </motion.div>

        {/* Startup Grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {mockStartups.map((startup, index) => (
            <motion.div 
              key={startup.id} 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="startup-card"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all duration-300 shadow-sm">
                      <span className="text-lg font-bold text-blue-600">
                        {startup.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 mb-1">
                      {startup.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">{startup.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <button
                    onClick={() => toggleUpvote(startup.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                      upvotedStartups.has(startup.id)
                        ? 'bg-red-50 text-red-500 hover:bg-red-100'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-red-500'
                    }`}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        upvotedStartups.has(startup.id) 
                          ? 'fill-current' 
                          : ''
                      }`} 
                    />
                    <span className="text-sm font-semibold">
                      {getUpvoteCount(startup)}
                    </span>
                  </button>
                  <Badge 
                    variant={startup.type === 'B2B' ? 'default' : 'secondary'} 
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      startup.type === 'B2B' 
                        ? 'bg-blue-100 text-blue-700 border-blue-200' 
                        : 'bg-green-100 text-green-700 border-green-200'
                    }`}
                  >
                    {startup.type}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div className="relative z-10 mb-4 flex-1">
                <h4 className="font-semibold text-gray-900 text-base mb-2">
                  {startup.description.split('.')[0]}.
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {startup.description.split('.').slice(1).join('.').trim()}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {startup.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs font-medium px-2 py-1 rounded-full border-purple-200 bg-purple-50 text-purple-600 hover:border-purple-300 hover:bg-purple-100 transition-all duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Special Offer */}
              <div className="mb-4 p-4 rounded-xl bg-green-50 border border-green-200 relative z-10">
                <div className="flex items-start space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 shadow-sm flex-shrink-0 mt-0.5">
                    <Gift className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-bold text-green-800 text-sm">Special Offer</span>
                    </div>
                    <p className="text-xs text-green-700 leading-relaxed font-medium mb-2">
                      {startup.specialOfferText}
                    </p>
                    {startup.hasSpecialOffer && (
                      <div className="inline-block">
                        <div className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-sm">
                          Log in to see the discount
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 relative z-10 mt-auto">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{startup.founder}</span>
                  <span className="mx-1">•</span>
                  <span>{startup.industry}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white bg-purple-600 hover:bg-purple-700 group/btn font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  View Details
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold border-2 border-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            Login to see more startups
            <Globe className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default StartupDiscovery;