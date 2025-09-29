import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValuePropositions from "@/components/ValuePropositions";
import StartupDiscovery from "@/components/StartupDiscovery";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0 bg-white"
        style={{
          background: "#ffffff",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <ValuePropositions />
          <StartupDiscovery />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
