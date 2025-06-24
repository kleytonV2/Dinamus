import Image from 'next/image';
import imgAboutUs from "@/app/assets/aboutUs.webp";

export default function AboutSection () {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className='flex mx-10 lg:w-2/4'>
            <p className='text-neutral-900 lg:text-3xl'>&quot;A <span className='text-yellow-500'>luta livre</span> é mais do que uma arte marcial, é um estilo de vida que promove benefícios com saúde, confiança, honra, disciplina e equilíbrio&quot;</p>
          </div>
          <div className='flex pl-10 lg:p-0 lg:w-2/4'>
            <Image className="w-full h-full rounded-3xl" src={imgAboutUs} alt="about us" />
          </div>
        </div>
    )
  }
  