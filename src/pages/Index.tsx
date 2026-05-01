import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DigitalTransformSection from "@/components/DigitalTransformSection";
import TelecomSection from "@/components/TelecomSection";
import IoTSection from "@/components/IoTSection";
import DroneSection from "@/components/DroneSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import pageBg from "@/assets/page-bg.jpg";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Fixed background image with dark overlay for readability */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pageBg})` }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.45) 50%, hsl(var(--background) / 0.70) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <DigitalTransformSection />
        <TelecomSection />
        <IoTSection />
        <DroneSection />
        <AIAgentsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
