import Image from 'next/image';
import phone from "@/app/assets/icon_phone.svg";
import mail from "@/app/assets/icon_mail.svg";
import pin_drop from "@/app/assets/icon_pin_drop.svg";

export default function ContactSection () {

  return (
    <div className="w-full flex flex-col items-center justify-between pt-12 px-6">
      <div className="w-full h-auto flex flex-col lg:flex-row items-center justify-center mb-20 text-neutral-50">
        <div className="contactCard flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2 my-2 lg:mx-2">
          <div className="w-1/4 mb-2">
            <Image className="w-full h-auto" src={phone} alt="phone" />
          </div>
          <p>+34 633 33 44 55</p>
        </div>
        <div className="contactCard flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2 my-2 lg:mx-2">
          <div className="w-1/4 mb-2">
            <Image className="w-full h-auto" src={mail} alt="mail" />
          </div>
          <p>vandermarcio70@gmail.com</p>
        </div>
        <div className="contactCard flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2 my-2 lg:mx-2">
          <div className="w-1/4 mb-2">
            <Image className="w-full h-auto" src={pin_drop} alt="pin drop" />
          </div>
          <p>Cerá, Fortaleza</p>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-screen h-auto flex flex-row items-center justify-center">
        <div className="w-full mx-auto">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156754.95460508644!2d-38.60201632320997!3d-3.793139245749286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74c3f464c783f%3A0x4661c60a0c6b37ca!2sFortaleza%20-%20CE%2C%20Brasil!5e1!3m2!1spt-BR!2ses!4v1736189344712!5m2!1spt-BR!2ses" 
          width="100%" 
          height="200"
          allowFullScreen
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"/>
        </div>
      </div>
    </div>
  )
}
  