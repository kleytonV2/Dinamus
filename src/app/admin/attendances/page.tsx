"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

interface IStudent {
  _id: string;
  name: string;
  lastName: string;
}

interface IClass {
  _id?: string;
  title: string;
  students: IStudent[];
}

interface IAttendance {
  _id?: string;
  class: {
    _id?: string;
    title?: string;
  };
  date: Date;
  absentStudents: string[];
}

export default function AttendancePage() {
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [classes, setClasses] = useState<IClass[]>([]); 
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [form, setForm] = useState<IAttendance>({
    class: {
      _id: "",
      title: ""
    },
    date: new Date(),
    absentStudents: [],
  });
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchAttendances();
    setTimeout(() => setFadeIn(true), 500); // Fade-in effect
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
  }

  async function fetchClasses() {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data);
  }

  async function fetchAttendances() {
    const res = await fetch("/api/attendances");
    const data = await res.json();
    setAttendances(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";

    const formData = {
      _id: form._id,
      date: form.date instanceof Date ? form.date : new Date(form.date),
      classId: form.class._id,
      absentStudents: form.absentStudents,
    };

    console.log("formData is ", formData);
  
    await fetch("/api/attendances", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    closeModal();
    fetchAttendances();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this attendance record?")) {
      await fetch("/api/attendances", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      fetchAttendances();
    }
  }

  function openModal(attendance?: IAttendance) {

    if (attendance) {

      var selectedClass = getClassFromClassId(attendance.class._id);
      updateFilteredStudentsFromSelectedClass(selectedClass);

      setForm({
        _id: attendance._id,
        class: attendance.class,
        date: attendance.date,
        absentStudents: attendance.absentStudents.map((s:any) => (typeof s === "string" ? s : s._id)),
      });
      setEditing(true);
    } else {
      setForm({ class: {_id: "",title: ""}, date: new Date(), absentStudents: [] });
      setEditing(false);
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm({ class: {_id: "",title: ""}, date: new Date(), absentStudents: [] });
    setEditing(false);
    setFilteredStudents([]);
  }

  function handleClassSelection(classId: string) {
    var selectedClass = getClassFromClassId(classId);
    setForm({ ...form,  class: { _id: selectedClass?._id, title: selectedClass?.title }});
    updateFilteredStudentsFromSelectedClass(selectedClass);
  }

  function getClassFromClassId(classId: string | undefined)
  {
    if(classId === undefined) 
      return null;

    return classes.find((cls) => cls._id === classId) || null;
  }

  function updateFilteredStudentsFromSelectedClass(selectedClass: IClass | null)
  {
    const studentsInClass = getStundentsFromSelectedClass(selectedClass);
    setFilteredStudents(studentsInClass);
  }

  function getStundentsFromSelectedClass(selectedClass: IClass | null)
  {
    const studentsIdFromSelectedClass = (selectedClass?.students || []).map((s: any) => s._id);

    return students.filter((student) =>
      studentsIdFromSelectedClass.includes(student._id)
    );
  }

  function handleStudentSelection(studentId: string) {
    const updatedAbsentStudents = [...form.absentStudents];

    if (updatedAbsentStudents.includes(studentId)) {
      const index = updatedAbsentStudents.indexOf(studentId);
      updatedAbsentStudents.splice(index, 1);
    } else {
      updatedAbsentStudents.push(studentId);
    }

    setForm({ ...form, absentStudents: updatedAbsentStudents });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Assistência</h1>

      {/* Fade-in effect */}
      <div className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <a href="/admin" className="text-blue-500 underline mb-2 sm:mb-0">Home</a>
          <button onClick={() => openModal()} className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">
            Adicionar assistência
          </button>
        </div>

        {/* Mobile-Friendly Attendance List */}
        <div className="space-y-4 sm:hidden">
          {attendances.length > 0 ? (
            attendances.map((attendance, index) => (
              <div key={attendance._id} className="p-4 border rounded bg-white shadow">
                <p className="text-lg font-semibold">{attendance.class?.title}</p>
                <p className="text-sm text-gray-600">{attendance.date
                                                                ? `${attendance.date instanceof Date 
                                                                    ? attendance.date.toLocaleDateString("pt-BR") 
                                                                    : new Date(attendance.date).toLocaleDateString("pt-BR")}`
                                                                : ""
                                                            }</p>
                <p className="text-sm text-gray-600">
                  {attendance.absentStudents.length} Alunos ausentes
                </p>
                <div className="flex justify-between mt-2">
                  <button onClick={() => openModal(attendance)} className="text-blue-500 mr-4">Editar</button>
                  <button onClick={() => handleDelete(attendance._id!)} className="text-red-500">Eliminar</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Ainda não existem registros de assistência.</p>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Classe</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Alunos Ausentes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {attendances.length > 0 ? (
                attendances.map((attendance, index) => (
                  <tr key={attendance._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-3 text-sm text-gray-700">{attendance.class?.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{attendance.date
                                                                        ? `${attendance.date instanceof Date 
                                                                            ? attendance.date.toLocaleDateString("pt-BR") 
                                                                            : new Date(attendance.date).toLocaleDateString("pt-BR")}`
                                                                        : ""
                                                                    }</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{attendance.absentStudents.length} Alunos ausentes</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <button onClick={() => openModal(attendance)} className="text-blue-500 mr-4">Editar</button>
                      <button onClick={() => handleDelete(attendance._id!)} className="text-red-500">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-center text-gray-500">
                    Ainda não existem registros de assistência.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Attendance */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{editing ? "Editar assistência" : "Adicionar assistência"}</h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <select
                value={form.class._id}
                onChange={(e) => handleClassSelection(e.target.value)}
                className="w-full p-2 border rounded"
                required
                disabled={editing}
              >
                <option value="">Selecione uma classe</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.title}
                  </option>
                ))}
              </select>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <DatePicker
                  selected={form.date ? new Date(form.date) : null}
                  onChange={(date) => setForm({ ...form, date: date ? date : new Date() })}
                  dateFormat="dd-MM-yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  maxDate={new Date()} 
                  locale={ptBR}
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>

              {/* Student Selection for Absent Students */}
              {form.class._id && filteredStudents.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-lg mb-2">Selecionar alunos ausentes:</p>

                  <div className="scrollable-container mb-2">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                          <th className="border border-gray-300 px-4 py-2 text-center">Ausente</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => {

                          const isAbsent = form.absentStudents.includes(student._id);
                          
                          return (
                            <tr key={student._id} className="border border-gray-300">
                              <td className="px-4 py-2">{student.lastName}, {student.name}</td>
                              <td className="px-4 py-2 text-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={isAbsent}
                                    onChange={() => handleStudentSelection(student._id)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer
                                          peer-checked:after:translate-x-full peer-checked:after:border-white
                                          after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
                                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                                          after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                {editing ? "Atualizar" : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}