import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PageContent from '@/app/components/PageContent';
import FooterSection from '@/app/components/FooterSection';

export default function Home() {
  return (
    <>
      <section id='home' />
      <Navbar />
      <div className="bg-fixed w-full h-screen top-0 left-0 bg-[url('@/app/assets/banner_gradient.png')] bg-cover bg-center">
        <HeroSection />
      </div>
      <div className="max-w-7xl mx-auto ppt-20 px-6 bg-white rounded-3xl">
        <PageContent />
        <FooterSection />
      </div>
      
    </>
  );
}
