"use client";

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import Image from 'next/image';
import addIcon from "@/app/assets/icons/addIcon.svg";
import editIcon from "@/app/assets/icons/editIcon.svg";
import deleteIcon from "@/app/assets/icons/deleteIcon.svg";
import SearchInput from "@/app/admin/components/SearchInput";
import DatePickerInput from "@/app/admin/components/DatePickerInput";
import SelectInput from "@/app/admin/components/SelectInput";

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
  const [form, setForm] = useState<IAttendance>({
    class: {
      _id: "",
      title: ""
    },
    date: new Date(),
    absentStudents: [],
  });
  const [filteredStudents, setFilteredStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermStudent, setSearchTermStudent] = useState("");
  const [startDate, setStartDate] = useState<Date|null>(null);
  const [endDate, setEndDate] = useState<Date|null>(null);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchAttendances();
  }, []);

  async function fetchStudents() {
    try{
      const res = await fetch("/api/students");
      const data = await res.json();
      if(data)
        setStudents(data);

    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  }

  async function fetchClasses() {
    try{
      const res = await fetch("/api/classes");
      const data = await res.json();
      if(data)
        setClasses(data);

    } catch (error) {
      console.error("Failed to fetch classes:", error);
    }
  }

  async function fetchAttendances() {
    try{
      const res = await fetch("/api/attendances");
      const data = await res.json();
      if(data) 
        setAttendances(data);

    } catch (error) {
      console.error("Failed to fetch attendances:", error);
    } finally {
      setLoading(false); 
    }
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

      const selectedClass = getClassFromClassId(attendance.class._id);
      updateFilteredStudentsFromSelectedClass(selectedClass);

      setForm({
        _id: attendance._id,
        class: attendance.class,
        date: attendance.date,
        absentStudents: (attendance.absentStudents as unknown as IStudent[]).map((s) => s._id),
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
    const selectedClass = getClassFromClassId(classId);
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
    const studentsIdFromSelectedClass = (selectedClass?.students || []).map((s) => s._id);

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

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </>
    );
  }
  
  return (
    <>
      <AdminNavbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6 pt-24">
        
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-10">
          Assistências
        </h1>
        
        <div className="flex flex-col sm:flex-row mb-8">
          <div className="mb-2">
            <DatePickerInput
              id="startDate"
              label="Data começo"
              selectedDate={startDate ? new Date(startDate) : null}
              onChange={(date) => setStartDate(date ? date : null)}
            />
          </div>
          <div>
            <DatePickerInput
              id="endDate"
              label="Data fim"
              selectedDate={endDate ? new Date(endDate) : null}
              onChange={(date) => setEndDate(date ? date : null)}
            />
          </div>
          
        </div>

        <div className="flex flex-row justify-between mb-4">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar treinos..."
          />
          <button onClick={() => openModal()} className="px-1 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">
              <Image className="" src={addIcon} alt="icon" />
          </button>
        </div>

        {/* Mobile-Friendly Attendance List */}
        <div className="space-y-4 sm:hidden">
          {attendances.length > 0 ? (
            attendances.filter((at) =>
                at.class.title?.toLowerCase().includes(searchTerm.toLowerCase())
                && (startDate == null || at.date instanceof Date ? at.date : new Date(at.date) >= startDate)
                && (endDate == null || at.date instanceof Date ? at.date : new Date(at.date) <= endDate)
              ).map((attendance) => (
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
                <div className="flex justify-end mt-2">
                  <button onClick={() => openModal(attendance)} className="bg-blue-500 mr-4 rounded">
                    <Image className="" src={editIcon} alt="Editar" />
                  </button>
                  <button disabled={attendance.absentStudents.length > 0} onClick={() => handleDelete(attendance._id!)} className={`rounded ${attendance.absentStudents.length > 0 ? "bg-gray-500" : "bg-red-500 cursor-pointer" }`}>
                    <Image className="" src={deleteIcon} alt="Eliminar" />
                  </button>
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
                attendances.filter((at) =>
                  at.class.title?.toLowerCase().includes(searchTerm.toLowerCase())
                  && (startDate == null || at.date instanceof Date ? at.date : new Date(at.date) >= startDate)
                  && (endDate == null || at.date instanceof Date ? at.date : new Date(at.date) <= endDate)
                ).map((attendance, index) => (
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
                      <button onClick={() => openModal(attendance)} className="bg-blue-500 mr-4 rounded">
                        <Image className="" src={editIcon} alt="Editar" />
                      </button>
                      <button disabled={attendance.absentStudents.length > 0} onClick={() => handleDelete(attendance._id!)} className={`rounded ${attendance.absentStudents.length > 0 ? "bg-gray-500" : "bg-red-500 cursor-pointer" }`}>
                        <Image className="" src={deleteIcon} alt="Eliminar" />
                      </button>
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

        {/* Modal for Adding/Editing Attendance */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-4">{editing ? "Editar assistência" : "Adicionar assistência"}</h2>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                <SelectInput
                  id="class"
                  label="Treino"
                  value={form.class._id ? form.class._id : ""}
                  onChange={(e) => handleClassSelection(e.target.value)}
                  options={classes.map((cls) => ({
                    label: cls.title,
                    value: cls._id ?? ""
                  }))}
                  placeholder="Selecione um treino"
                  required
                  disabled={editing}
                />
                <DatePickerInput
                  id="date"
                  label="Data"
                  selectedDate={form.date ? new Date(form.date) : null}
                  onChange={(date) => setForm({ ...form, date: date ? date : new Date() })}
                />

                {/* Student Selection for Absent Students */}
                {form.class._id && filteredStudents.length > 0 && (
                  <div className="mt-4">
                    <SearchInput
                      value={searchTermStudent}
                      onChange={(e) => setSearchTermStudent(e.target.value)}
                      placeholder="Buscar alunos..."
                    />
                    <div className="scrollable-container my-2">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="border border-gray-300 px-2 py-1 text-left">Nome</th>
                            <th className="border border-gray-300 px-2 py-1 text-center">Ausente</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.filter((st) =>
                            (st.lastName.toLowerCase() + st.name.toLowerCase()).trim().includes(searchTermStudent.replace(",","").trim().toLowerCase())
                            ).map((student) => {

                            const isAbsent = form.absentStudents.includes(student._id);
                            
                            return (
                              <tr key={student._id} className="border border-gray-300">
                                <td className="px-2 py-1">{student.lastName}, {student.name}</td>
                                <td className="px-2 py-1 text-center">
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
    </>
  );
}