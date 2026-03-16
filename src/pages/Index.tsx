import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DigitalTransformSection from "@/components/DigitalTransformSection";
import IoTSection from "@/components/IoTSection";
import DroneSection from "@/components/DroneSection";
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
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
