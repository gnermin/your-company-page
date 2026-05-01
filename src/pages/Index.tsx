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
    <div className="min-h-screen bg-background relative">
      {/* Fixed background image with dark overlay for readability */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pageBg})` }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.65) 50%, hsl(var(--background) / 0.80) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-0">
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
