import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DigitalTransformSection from "@/components/DigitalTransformSection";
import IoTSection from "@/components/IoTSection";
import DroneSection from "@/components/DroneSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DigitalTransformSection />
      <IoTSection />
      <DroneSection />
      <AIAgentsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
