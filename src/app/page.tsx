import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PageContent from '@/app/components/PageContent';
import FooterSection from '@/app/components/FooterSection';
import MapSection from '@/app/components/MapSection';
import bannerOverlay from "@/app/assets/banner_overlay.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <section id='home' data-bg="dark" className="bg-sticky w-full h-screen top-0 left-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerOverlay.src})` }}>
        <HeroSection />
      </section>
      <PageContent />
      <MapSection />
      <FooterSection />
    </>
  );
}
