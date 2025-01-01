import Image from 'next/image';
import logo from "@/app/assets/logo.png";

export default function HeroSection () {
  return (
    <div id="heroSection" className="flex flex-col items-center">
      <div className="flex justify-center items-center">
        <div className="flex justify-center w-1/4 h-auto">
          <Image className="w-full h-auto" src={logo} alt="logo" />
        </div>
      </div>
    </div>
  )
}
