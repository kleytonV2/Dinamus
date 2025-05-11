import { PolarArea } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Student and Attendance Interfaces
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

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const AbsencePolarChart = () => {
  const [attendances, setAttendances] = useState<IAttendance[]>([]);

  useEffect(() => {
    fetchAttendances();
  }, []);

  // Fetch attendance data from API
  async function fetchAttendances() {
    try {
      const res = await fetch("/api/attendances");
      const data = await res.json();
      setAttendances(data);
    } catch (error) {
      console.error("Failed to fetch attendances:", error);
    }
  }

  // Get current month and year
  const currentMonth = new Date().getMonth(); // Month is zero-based (0 = January, 1 = February, ...)
  const currentYear = new Date().getFullYear();

  // Prepare the data for the chart by filtering for the current month
  const chartData = useMemo(() => {
    const map = new Map<string, { title: string; students: Set<string> }>();

    attendances.forEach((attendance) => {
      const attendanceDate = new Date(attendance.date);
      const classId = attendance.class._id || "";
      const classTitle = attendance.class.title || "";
      const absentStudents = attendance.absentStudents;

      // Check if the attendance is in the current month and year
      if (attendanceDate.getMonth() === currentMonth && attendanceDate.getFullYear() === currentYear) {
        if (!map.has(classId)) {
          map.set(classId, { title: classTitle, students: new Set() });
        }

        // Add students to the set of absent students
        absentStudents.forEach((student) => {
          const fullName = `${student.lastName}, ${student.name}`;
          map.get(classId)?.students.add(fullName);
        });
      }
    });

    // Convert map to array format
    return Array.from(map.values()).map((entry) => ({
      className: entry.title,
      absents: Array.from(entry.students), // Convert Set to array of strings
    }));
  }, [attendances, currentMonth, currentYear]);

  const data = {
    labels: chartData.map((cls) => cls.className),
    datasets: [
      {
        label: "Faltas por turma",
        data: chartData.map((cls) => cls.absents.length),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Corrected chart options for PolarArea chart
  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        angleLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.2)",
        },
      },
    },
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const index = context.dataIndex;
            const classInfo = chartData[index];
            const absentList = classInfo.absents;

            if (!absentList.length) {
              return [`${classInfo.className}: Nenhum aluno ausente`];
            }

            // Return class name and the absent students' names
            return [
              `${classInfo.className}: ${absentList.length} ausentes`,
              ...absentList.map((student) => `• ${student}`),
            ];
          },
        },
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default AbsencePolarChart;