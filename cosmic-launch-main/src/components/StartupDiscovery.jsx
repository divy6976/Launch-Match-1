import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section id="startups" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="container relative mx-auto px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Trending this week
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 text-balance">
            Most Upvoted{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Startups
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the hottest startups that early adopters are loving right now
          </p>
        </motion.div>

        {/* Startup Grid (Top 3 ranked) */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {(() => {
            const top = [...mockStartups].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0)).slice(0, 3);
            const ordered = [top[1] || top[0], top[0], top[2] || top[0]]; // left:#2, center:#1, right:#3
            return ordered.map((startup, index) => {
              const absoluteRank = startup ? top.indexOf(startup) : index; // 0,1,2 in original ranking
              const rankNum = absoluteRank + 1;
              const isCenter = index === 1;
              return (
                <div key={startup?.id || index} className="relative pt-6">
                  <div className={`absolute -left-3 -top-3 z-20 flex h-14 w-14 items-center justify-center rounded-full shadow-xl ${rankNum===1?'bg-gradient-to-br from-yellow-400 to-yellow-600': rankNum===2?'bg-gradient-to-br from-gray-400 to-gray-600':'bg-gradient-to-br from-orange-400 to-orange-600'}`}>
                    <div className="text-lg font-bold text-white">#{rankNum}</div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className={`group relative flex flex-col h-full bg-white rounded-2xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${isCenter ? 'lg:scale-[1.06] lg:-translate-y-2 border-blue-300' : 'border-gray-200 hover:border-blue-200'} ${rankNum===1?'ring-2 ring-yellow-400 ring-opacity-50': ''}`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${rankNum===1?'bg-gradient-to-r from-yellow-400 to-yellow-600': rankNum===2?'bg-gradient-to-r from-gray-400 to-gray-600':'bg-gradient-to-r from-orange-400 to-orange-600'}`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-start justify-between mb-5">
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

              <div className="mb-5 flex-1">
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

              <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-300 transition-all duration-300 min-h-[112px] hover:shadow-md">
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

              <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{startup.founder}</span>
                  <span className="mx-1">•</span>
                  <span>{startup.industry}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group/btn font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
                </Button>
              </div>
                    </div>
                  </motion.div>
                </div>
              );
            });
          })()}
        </div>

        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/login">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Login to see more startups
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StartupDiscovery;