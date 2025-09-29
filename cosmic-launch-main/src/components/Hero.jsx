import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 md:py-24 lg:py-28">
      {/* Dotted panel background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[96%] md:w-[92%] lg:w-[86%] rounded-[28px] border border-gray-200 bg-[radial-gradient(circle,_rgba(0,0,0,0.06)_1px,_transparent_1px)] [background-size:14px_14px] bg-white" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }} />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        {/* Central floating icon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-medium ring-1 ring-gray-200"
        >
          <div className="grid grid-cols-2 gap-1">
            <span className="h-3 w-3 rounded bg-blue-500 inline-block" />
            <span className="h-3 w-3 rounded bg-gray-800 inline-block" />
            <span className="h-3 w-3 rounded bg-gray-800 inline-block" />
            <span className="h-3 w-3 rounded bg-gray-800 inline-block" />
          </div>
        </motion.div>

        {/* Two-line heading (bold + muted) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[34px] sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-tight text-gray-900 text-balance"
        >
          Think, plan, and track
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-2 text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight leading-tight text-gray-400 text-balance"
        >
          all in one place
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-gray-600"
        >
          Efficiently manage your startup discovery and boost product feedback.
        </motion.p>

        {/* Single primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-8 flex justify-center"
        >
          <Button className="px-7 py-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-medium hover:shadow-strong">
            Get free demo
          </Button>
        </motion.div>

        {/* Floating decorative cards */}
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="pointer-events-none hidden md:block">
            <div className="absolute left-6 md:left-12 top-32 rotate-[-6deg]">
              <div className="w-56 rounded-2xl bg-white shadow-medium ring-1 ring-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-800 mb-1">Today’s tasks</div>
                <div className="h-2 bg-gray-100 rounded mb-2 overflow-hidden"><div className="h-full w-3/5 bg-blue-500" /></div>
                <div className="h-2 bg-gray-100 rounded overflow-hidden"><div className="h-full w-4/5 bg-green-500" /></div>
              </div>
            </div>
            <div className="absolute right-6 md:right-12 top-24 rotate-[8deg]">
              <div className="w-56 rounded-2xl bg-white shadow-medium ring-1 ring-gray-200 p-4">
                <div className="text-sm font-semibold text-gray-800 mb-1">Reminders</div>
                <div className="text-xs text-gray-500">Meeting at 13:00</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
