import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import PageContent from '@/app/components/PageContent';

export default function Home() {
  return (
    <>
      <section id='home'/>
      <Navbar />
      <div className="max-w-7xl mx-auto ppt-20 px-6">
        <HeroSection />
        <PageContent />
      </div>
    </>
  );
}
