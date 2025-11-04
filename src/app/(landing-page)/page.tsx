import Image from "next/image";
import { NavLanding } from "@/components/nav-landing";
import { HeroSection } from "@/components/hero-section";
import { ProductDescription } from "@/components/product-description";
import { FeaturesSection } from "@/components/features-section";
import { VideoSection } from "@/components/video-section";

export default function Home() {
  return (
    <div className="font-sans ">
        <HeroSection />
        <ProductDescription />
        <FeaturesSection />
        <VideoSection 
          videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Mirelo en Acción" 
          description="Mire nuestra demostración rápida para ver cómo nuestra plataforma puede transformar el aprendizaje de programación"
        />
    </div>
  );
}