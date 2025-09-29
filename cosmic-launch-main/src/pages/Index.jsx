import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValuePropositions from "@/components/ValuePropositions";
import StartupDiscovery from "@/components/StartupDiscovery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative rb-bg-dots rb-mask-soft">
      {/* ReactBits dotted ambient background */}
      {/* Your Content/Components */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
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
