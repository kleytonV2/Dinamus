import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto ppt-20 px-6">
        <HeroSection />
      </div>
    </>
  );
}
