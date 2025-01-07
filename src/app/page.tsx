import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PageContent from '@/app/components/PageContent';
import FooterSection from '@/app/components/FooterSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <section id='home' data-bg="dark" className="bg-fixed w-full h-screen top-0 left-0 bg-cover bg-center">
        <HeroSection />
      </section>
      <PageContent />
      <FooterSection />
    </>
  );
}
