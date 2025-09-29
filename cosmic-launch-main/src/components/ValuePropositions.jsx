import { Rocket, Target, Handshake } from "lucide-react";
import { motion } from "framer-motion";

const ValuePropositions = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
          }}
        >
          {/* For Startups */}
          <motion.div 
            className="feature-card text-center group"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-all duration-300">
              <Rocket className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">For Startups</h3>
            <p className="text-gray-600 leading-relaxed text-lg text-balance">
              Submit your startup and get discovered by early adopters. Get valuable 
              feedback and build your user base.
            </p>
          </motion.div>

          {/* For Early Adopters */}
          <motion.div 
            className="feature-card text-center group"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-all duration-300">
              <Target className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">For Early Adopters</h3>
            <p className="text-gray-600 leading-relaxed text-lg text-balance">
              Discover innovative products before they go mainstream. Get exclusive 
              access and special offers.
            </p>
          </motion.div>

          {/* Perfect Match */}
          <motion.div 
            className="feature-card text-center group"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-100 group-hover:bg-blue-200 transition-all duration-300">
              <Handshake className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Perfect Match</h3>
            <p className="text-gray-600 leading-relaxed text-lg text-balance">
              Our platform connects the right startups with the right early adopters 
              to bring real value.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositions;
