import Image from 'next/image';
import logo from "@/app/assets/logo.png";

export default function HeroSection () {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center lg:w-1/4 w-1/2 h-auto">
          <Image className="w-full h-auto" src={logo} alt="logo" priority />
        </div>
      </div>
    </div>
  )
}
