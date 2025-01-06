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
      <PageContent />
      {/* Map Section */}
      <div className="w-full">
        <div className="w-full mx-auto">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156754.95460508644!2d-38.60201632320997!3d-3.793139245749286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74c3f464c783f%3A0x4661c60a0c6b37ca!2sFortaleza%20-%20CE%2C%20Brasil!5e1!3m2!1spt-BR!2ses!4v1736189344712!5m2!1spt-BR!2ses" 
          width="100%" 
          height="450"
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"/>
        </div>
      </div>
      <FooterSection />
    </>
  );
}
