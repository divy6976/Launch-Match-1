import { Rocket, Target, Handshake, Users, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ValuePropositions = () => {
  const features = [
    {
      icon: Rocket,
      title: "For Startups",
      description: "Submit your startup and get discovered by early adopters. Get valuable feedback and build your user base from day one.",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100/50",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "For Early Adopters",
      description: "Discover innovative products before they go mainstream. Get exclusive access, special offers, and shape the future.",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100/50",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      icon: Handshake,
      title: "Perfect Match",
      description: "Our smart platform connects the right startups with the right early adopters to create meaningful partnerships.",
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100/50",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 mb-6">
            <Zap className="h-4 w-4" />
            <span>Why choose us</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 text-balance">
            Built for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              innovation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're launching a startup or seeking the next big thing, we've got you covered
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative bg-white border border-gray-200/60 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative inline-flex h-16 w-16 items-center justify-center rounded-2xl ${feature.iconBg} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 mb-6`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all duration-300">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { icon: Users, label: "Active Users", value: "10,000+" },
            { icon: Rocket, label: "Startups Listed", value: "500+" },
            { icon: TrendingUp, label: "Successful Matches", value: "2,500+" },
            { icon: Zap, label: "Daily Connections", value: "100+" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 mb-3">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropositions;
