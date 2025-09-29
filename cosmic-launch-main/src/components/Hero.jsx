import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-20 md:py-32 lg:py-40">
      <div className="container relative mx-auto px-4 text-center">
        {/* Main headline */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up text-balance leading-tight">
          Where startups find early adopters and vice versa
        </h1>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-600 sm:text-xl md:text-2xl animate-fade-in-up [animation-delay:200ms] text-balance leading-relaxed">
          Discover innovative startups before they launch. Get exclusive offers from the 
          next generation of startups that are looking for their first users.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 animate-fade-in-up [animation-delay:400ms]">
          <Button className="btn-hero-primary w-full sm:w-auto">
            Join as a Startup
          </Button>
          <Button className="btn-hero-secondary w-full sm:w-auto">
            Join as an Early Adopter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
