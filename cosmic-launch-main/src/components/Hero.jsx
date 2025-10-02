import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Rocket, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-24 md:py-36 lg:py-44">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-blue-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div
            className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[-15deg] bg-gradient-to-tr from-blue-300 to-blue-500 opacity-15 sm:left-[calc(50%+20rem)] sm:w-[60rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
          />
        </div>
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm"
        >
          <Sparkles className="h-4 w-4" />
          <span>The future of startup discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl text-balance leading-[1.1]"
        >
          Where startups meet{" "}
          <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
            early adopters
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl text-xl text-gray-600 sm:text-2xl text-balance leading-relaxed font-normal"
        >
          Discover innovative startups before they go mainstream. Get exclusive early access and help shape the future of technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Link to="/signup">
            <Button className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Rocket className="h-5 w-5 group-hover:translate-y-[-2px] transition-transform duration-300" />
                Join as a Startup
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto bg-white">
              <span className="flex items-center justify-center gap-2">
                <TrendingUp className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                Join as an Early Adopter
              </span>
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <Zap className="h-4 w-4 text-green-600" />
            </div>
            <span className="font-medium">500+ Active Startups</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </div>
            <span className="font-medium">10k+ Early Adopters</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
              <Rocket className="h-4 w-4 text-orange-600" />
            </div>
            <span className="font-medium">100+ Matches Daily</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
