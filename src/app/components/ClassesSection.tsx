import { classes } from "@/app/constants";

export default function ClassesSection () {
    return (
      <div className="w-full flex flex-col lg:flex-row justify-center items-center">
        {classes.map((item, index) => {
          return (
            <div
              key={index}
              className="group relative flex justify-center lg:w-1/2 w-5/6 lg:h-96 mx-10 border mb-12 lg:my-2  rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.bgImageUrl.src})` }}
              ></div>

              <div className="absolute inset-0 bg-black bg-opacity-80"></div>

              <div className="relative z-10 px-10 py-14 text-white text-center">
                <p className="text-3xl uppercase mb-10">{item.day}</p>
                <div>
                  <p className="text-lg">Crianças</p>
                  <p className="text-lg">de {item.kidsStart} a {item.kidsEnd}</p>
                  <hr className="my-2"/>
                  <p className="text-lg">Jóvems / Adultos</p>
                  <p className="text-lg">de {item.adultsStart} a {item.adultsEnd}</p>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
    )
  }
