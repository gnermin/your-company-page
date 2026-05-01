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
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${pageBg})`, zIndex: -2 }}
        aria-hidden="true"
      />
      {/* Dark gradient overlay for readability */}
      <div
        className="fixed inset-0 bg-gradient-to-b from-background/85 via-background/80 to-background/90"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />
      <div className="relative">
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
