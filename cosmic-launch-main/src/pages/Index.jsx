import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValuePropositions from "@/components/ValuePropositions";
import StartupDiscovery from "@/components/StartupDiscovery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Premium gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-400 to-blue-600 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
          />
        </div>
      </div>
      {/* Your Content/Components */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          {/* Metrics Section */}
          <section className="py-10 md:py-14">
            <div className="container">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 bg-white/70 backdrop-blur rounded-2xl border border-gray-100 p-4 md:p-6 shadow-soft">
                {[
                  { label: "Startups", value: "120+" },
                  { label: "Early Adopters", value: "3,500+" },
                  { label: "Feedback Shared", value: "8,900+" },
                  { label: "Matches", value: "2,100+" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-gray-900">{stat.value}</div>
                    <div className="mt-1 text-xs md:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <ValuePropositions />
          <StartupDiscovery />
          {/* Strong CTA Band */}
          <section className="py-14 md:py-20">
            <div className="container">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12 shadow-strong">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Launch faster with real user feedback</h3>
                  <p className="mt-2 md:mt-3 text-white/90 text-sm md:text-base max-w-2xl">
                    Join founders and early adopters collaborating to shape better products. It’s free to get started.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a href="/signup" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-blue-700 font-semibold shadow-soft hover:shadow-medium transition">
                      Get Started
                    </a>
                    <a href="#startups" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-white/30 text-white font-semibold/90 hover:bg-white/10 transition">
                      Explore Startups
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
