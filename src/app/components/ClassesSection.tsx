import { classes } from "@/app/constants";

export default function ClassesSection () {
    return (
      <div className="flex justify-center items-center">
        {classes.map((item, index) => {
          return (
            <div
              key={index}
              className="group relative flex justify-center w-2/6 mx-10 h-96 border my-2 rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.bgImageUrl.src})` }}
              ></div>

              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              <div className="relative z-10 px-4 py-4">
                <h4>{item.name}</h4>
              </div>
            </div>
          )
        }
        )}
      </div>
    )
  }
