import Image from 'next/image';
import phone from "@/app/assets/icons/icon_phone.svg";
import mail from "@/app/assets/icons/icon_mail.svg";
import pin_drop from "@/app/assets/icons/icon_pin_drop.svg";

export default function ContactSection () {

  return (
    <div className="w-full flex flex-col items-center justify-between pt-12 px-6">
      <div className="w-full h-auto flex flex-col lg:flex-row items-center justify-center mb-20 text-neutral-50">
        <div className="contactCard flex flex-col items-center bg-white hover:shadow-xl transition-shadow duration-200 rounded-lg p-8 max-w-lg w-full lg:w-1/2 my-2 lg:mx-2">
          <div className="w-1/4 mb-2">
            <Image className="w-full h-auto" src={phone} alt="phone" />
          </div>
          <p>(21) 99258-5420</p>
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
          <p>Rua Azevedo Lima, 40</p>
        </div>
      </div>
      {/* Map Section */}
      <div className="w-screen h-auto flex flex-row items-center justify-center">
        <div className="w-full mx-auto">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598.412731337436!2d-43.205671060572776!3d-22.924045568010246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fa57e351f35%3A0x2ce348c0125fe4fb!2sR.%20Azevedo%20Lima%2C%2040%20-%20Rio%20Comprido%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2020250-500%2C%20Brasil!5e0!3m2!1ses!2ses!4v1748030826331!5m2!1ses!2ses" 
            width="100%" 
            height="330"
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"/>
        </div>
      </div>
    </div>
  )
}
  