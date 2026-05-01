import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DigitalTransformSection from "@/components/DigitalTransformSection";
import TelecomSection from "@/components/TelecomSection";
import IoTSection from "@/components/IoTSection";
import DroneSection from "@/components/DroneSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen page-with-bg">
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
  );
};

export default Index;
