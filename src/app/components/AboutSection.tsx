import Image from 'next/image';
import img_12 from "@/app/assets/img_12.jpg";

export default function AboutSection () {
    return (
      <div className="flex flex-col items-center justify-between border">
        <div className="flex flex-row items-center justify-between border">
          <div className='flex w-1/4 p-4'>
            <p className='contactCard text-neutral-50 p-4 rounded-3xl'>"A luta livre e mais do que uma arte marcial, é um estilo de vida que promove benefícios com saúde, confiança, honra, disciiplina e equilíbrio"</p>
          </div>
          <div className='flex w-2/4 p-4'>
            <Image className="w-full h-full rounded-3xl" src={img_12} alt="img_12" />
          </div>
          <div className='flex w-1/4 p-4'>
            <p className='contactCard text-neutral-50 p-4 rounded-3xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in nisi elit. Morbi ac volutpat augue. Duis quis justo sed ante hendrerit suscipit. Aliquam bibendum ullamcorper tortor, quis porta nisl sagittis vitae. Vivamus mollis diam non lorem hendrerit, vel tempor mi vulputate. Phasellus vulputate ultricies viverra. Nunc convallis nunc non metus rutrum, a euismod massa commodo. Quisque eget dolor faucibus, aliquam arcu sed, tempus est.</p>
          </div>
        </div>
        <div className='flex flex-row items-center'>
          <div className='flex w-full p-4'>
            <p className='contactCard text-neutral-50 p-4 rounded-3xl'>Fusce ultricies felis tellus, in bibendum enim commodo auctor. Nulla facilisis magna eros, vitae aliquam purus suscipit nec. Pellentesque mattis tincidunt tristique. Ut placerat elit quam, vel dignissim arcu luctus at. Vestibulum tristique ullamcorper tortor. Sed tincidunt fringilla elit. Sed luctus commodo risus, nec aliquet turpis vehicula at. Nulla ac tortor ut tellus scelerisque vestibulum. In consequat molestie facilisis. Vestibulum non sollicitudin ligula, sit amet ullamcorper metus. Phasellus vulputate porta nulla, in auctor magna molestie venenatis. Pellentesque non luctus sapien.</p>
          </div>
        </div>
      </div>
    )
  }
  