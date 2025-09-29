import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-blue-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
          />
        </div>
      </div>
      <div className="container relative mx-auto px-4 text-center">
        {/* Main headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-tight"
        >
          Where startups find early adopters and vice versa
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 24 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-8 max-w-3xl text-lg text-gray-600 sm:text-xl md:text-2xl text-balance leading-relaxed"
        >
          Discover innovative startups before they launch. Get exclusive offers from the 
          next generation of startups that are looking for their first users.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 28 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
        >
          <Button className="btn-hero-primary w-full sm:w-auto">
            Join as a Startup
          </Button>
          <Button className="btn-hero-secondary w-full sm:w-auto">
            Join as an Early Adopter
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
