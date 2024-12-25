export default function HeroSection () {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6cl lg:text-7xl text-center tracking-wide">
        Dinamus
        <br/>
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Luta livre esportiva
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Nossa missão é fortalecer a luta livre no Brasil, conectando atletas, fãs e entusiastas em um espaço dedicado a tudo que envolve esse esporte.
      </p>
    </div>
  )
}
