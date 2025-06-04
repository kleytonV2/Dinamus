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
    </div>
  )
}
  