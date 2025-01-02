import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PageContent from '@/app/components/PageContent';
import FooterSection from '@/app/components/FooterSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <section id='home' data-bg="dark" className="bg-fixed w-full h-screen top-0 left-0 bg-[url('@/app/assets/banner_overlay.png')] bg-cover bg-center">
        <HeroSection />
      </section>
      <div className="max-w-7xl mx-auto ppt-20 px-6 bg-white rounded-3xl">
        <PageContent />
        <FooterSection />
      </div>
      
    </>
  );
}
