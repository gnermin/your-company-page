import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AIAgentsSection from "@/components/AIAgentsSection";
import IoTSection from "@/components/IoTSection";
import DroneSection from "@/components/DroneSection";
import DigitalTransformSection from "@/components/DigitalTransformSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AIAgentsSection />
      <IoTSection />
      <DroneSection />
      <DigitalTransformSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
