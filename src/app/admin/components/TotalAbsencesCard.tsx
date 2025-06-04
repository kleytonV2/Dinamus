import { useEffect, useState, useMemo } from "react";
import CountUp from "react-countup";
import AbsencePolarChart from "./AbsencePolarChart"; // Adjust path

interface IStudent {
  _id: string;
  name: string;
  lastName: string;
}

interface IAttendance {
  _id?: string;
  class: {
    _id?: string;
    title?: string;
  };
  date: Date;
  absentStudents: IStudent[];
}

const TotalAbsencesCard = () => {
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [showModal, setShowModal] = useState(false);

  const now = useMemo(() => new Date(), []);

  const monthName = useMemo(() => {
    return now.toLocaleDateString("pt-BR", { month: "long" });
  }, [now]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  async function fetchAttendances() {
    try {
      const res = await fetch("/api/attendances");
      const data = await res.json();
      setAttendances(data);
    } catch (error) {
      console.error("Failed to fetch attendances:", error);
    } 
  }

  const totalAbsences = useMemo(() => {
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return attendances.reduce((count, att) => {
      const date = new Date(att.date);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        count += att.absentStudents.length;
      }
      return count;
    }, 0);
  }, [attendances, now]);

  return (
    <>
      
      <div
        onClick={() => setShowModal(totalAbsences > 0)}
        className="cursor-pointer w-full lg:h-56 group bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center justify-center text-center"
      >
        <div className="mb-2 flex items-center justify-center">
          <CountUp
            end={totalAbsences}
            duration={1.5}
            separator="."
            className={`flex items-center justify-center w-16 h-16 lg:w-32 lg:h-32 text-6xl lg:text-8xl font-bold transition-all duration-300 ${totalAbsences > 0 ? "text-red-500" : "text-green-500" }`}
          />
        </div>
        <p className="text-sm font-medium text-neutral-600 group-hover:text-neutral-950">
          Ausências em {monthName}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 w-full h-dvh bg-black bg-opacity-50 z-50 flex justify-center items-center px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full lg:w-1/3 h-auto m-10 rounded-xl shadow-xl relative p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Ausências em {monthName}</h2>
            <AbsencePolarChart/>
          </div>
        </div>
      )}
    </>
  );
};

export default TotalAbsencesCard;