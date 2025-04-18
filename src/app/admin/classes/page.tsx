"use client";

import { useEffect, useState } from "react";

interface IStudent {
  _id: string;
  name: string;
  lastName: string;
}

interface IClass {
  _id?: string;
  title: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  students: string[];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [form, setForm] = useState<IClass>({
    title: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    students: [],
  });

  useEffect(() => {
    fetchStudents();
    fetchClasses();
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    await fetch("/api/classes", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    closeModal();
    fetchClasses();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this class?")) {
      await fetch("/api/classes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      fetchClasses();
    }
  }

  function openModal(cls?: IClass) {
    if (cls) {
      setForm({
        _id: cls._id,
        title: cls.title,
        dayOfWeek: cls.dayOfWeek,
        startTime: cls.startTime,
        endTime: cls.endTime,
        students: cls.students.map((s:any) => (typeof s === "string" ? s : s._id)),
      });
      setEditing(true);
    } else {
      setForm({ title: "", dayOfWeek: "", startTime: "", endTime: "", students: [] });
      setEditing(false);
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm({ title: "", dayOfWeek: "", startTime: "", endTime: "", students: [] });
    setEditing(false);
  }

  function handleStudentSelection(studentId: string) {
    const updatedStudents = [...form.students];
  
    if (updatedStudents.includes(studentId)) {
      const index = updatedStudents.indexOf(studentId);
      updatedStudents.splice(index, 1);
    } else {
      updatedStudents.push(studentId);
    }
  
    setForm({ ...form, students: updatedStudents });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Treinos</h1>

      {/* Fade-in effect */}
      <div className={`transition-opacity duration-500 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <a href="/admin" className="text-blue-500 underline mb-2 sm:mb-0">Home</a>
          <button onClick={() => openModal()} className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">
            Adicionar Treino
          </button>
        </div>

        {/* Mobile-Friendly Student List */}
        <div className="space-y-4 sm:hidden">
            <div className="space-y-4 sm:hidden">
                {classes.length > 0 ? (
                    classes.map((cls, index) => (
                        <div key={cls._id} className="p-4 border rounded bg-white shadow">
                            <p className="text-lg font-semibold">{cls.title}</p>
                            <p className="text-sm text-gray-600">{cls.dayOfWeek}</p>
                            <p className="text-sm text-gray-600">{cls.startTime} - {cls.endTime}</p>
                            <p className="text-sm text-gray-600">{cls.students.length} Alunos</p>
                            <div className="flex justify-between mt-2">
                                <button onClick={() => openModal(cls)} className="text-blue-500 mr-4">Editar</button>
                                <button disabled={cls.students.length > 0} onClick={() => handleDelete(cls._id!)} className="text-red-500">Eliminar</button>
                            </div>
                        </div>
                    ))
                    ) : (
                        <p className="text-gray-500 text-center">Ainda não existem treinos.</p>
                    )}
            </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Título</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Día</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Horário</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Alunos</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {classes.length > 0 ? (
                classes.map((cls, index) => (
                  <tr key={cls._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-3 text-sm text-gray-700">{cls.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{cls.dayOfWeek}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{cls.startTime} - {cls.endTime}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{cls.students.length} Alunos</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <button onClick={() => openModal(cls)} className="text-blue-500 mr-4">Editar</button>
                      <button onClick={() => handleDelete(cls._id!)} className="text-red-500">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                    Ainda não existem treinos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing a Class */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{editing ? "Editar Treino" : "Adicionar Treino"}</h2>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input type="text" placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Día da semana" value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })} className="w-full p-2 border rounded" required />
              <input type="time" placeholder="Hora início" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} className="w-full p-2 border rounded" required />
              <input type="time" placeholder="Hora fim" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} className="w-full p-2 border rounded" required />

                {/* Student Selection */}
                <div className="mt-4">
                    <p className="font-semibold text-lg mb-2">Atribuir alunos:</p>

                    <div className="scrollable-container mb-2">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                                    <th className="border border-gray-300 px-4 py-2 text-center">Atribuído</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => {
                                    const isAssigned = form.students.includes(student._id);

                                    return (
                                    <tr key={student._id} className="border border-gray-300">
                                        <td className="px-4 py-2">{student.lastName}, {student.name}</td>
                                        <td className="px-4 py-2 text-center">
                                            {/* Toggle Switch */}
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                type="checkbox"
                                                checked={isAssigned}
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