import Image from 'next/image';
import img_1 from "@/app/assets/img_1.jpg";
import img_2 from "@/app/assets/img_2.jpg";

export default function HeroSection () {
  return (
    <div id="heroSection" className="flex flex-col items-center">
      <h1 className="text-4xl sm:text-6cl lg:text-7xl text-center text-white tracking-wide">
        Dinamus
        <br/>
        <span className="bg-gradient-to-b from-red-400 to-red-800 text-transparent bg-clip-text">
          Luta livre esportiva
        </span>
      </h1>
      <p className="mt-10 text-lg text-center max-w-4xl text-white">
        Nossa missão é fortalecer a luta livre no Brasil, conectando atletas, fãs e entusiastas em um espaço dedicado a tudo que envolve esse esporte.
      </p>
      {/* <div className="flex justify-center items-center">
        <div className="flex justify-center w-auto h-auto">
          <Image className="w-2/4 h-auto" src={img_1} alt="logo" />
        </div>
        <div className="flex justify-center w-auto h-auto">
          <Image className="w-2/4 h-auto" src={img_2} alt="logo" />
        </div>
      </div> */}
    </div>
  )
}
