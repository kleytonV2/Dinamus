"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import { faixas } from "@/app/constants";
import { ptBR } from "date-fns/locale";

interface IStudent {
  _id?: string;
  name: string;
  lastName: string;
  birthday: Date;
  belt: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [form, setForm] = useState<IStudent>({ name: "", lastName: "", birthday: new Date(), belt: "Branca", email: "" });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    await fetch("/api/students", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    closeModal();
    fetchStudents();
  }

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this student?")) {
      await fetch("/api/students", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      fetchStudents();
    }
  }

  function openModal(student?: IStudent) {
    if (student) {
      setForm(student);
      setEditing(true);
    } else {
      setForm({ name: "", lastName: "", birthday: new Date(), belt: "Branca", email: "" });
      setEditing(false);
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm({ name: "", lastName: "", birthday: new Date(), belt: "Branca", email: "" });
    setEditing(false);
  }

  function calculateAge(birthday: Date): number {
    if (!birthday) return 0;
  
    // If it's a string, parse it as an ISO date
    const birthDate = birthday instanceof Date ? birthday : parseISO(birthday);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Alunos</h1>

      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <a href="/admin" className="text-blue-500 underline mb-2 sm:mb-0">Home</a>
            <button onClick={() => openModal()} className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">
                Adicionar Aluno
            </button>
        </div>

        {/* Mobile-Friendly Student List */}
        <div className="space-y-4 sm:hidden">
            {students.length > 0 ? (
            students.map((student) => (
                <div key={student._id} className="p-4 border rounded bg-white shadow">
                <p className="text-lg font-semibold">{student.lastName}, {student.name}</p>
                <p className="text-sm text-gray-600">Nascimento: {
                                                                    student.birthday
                                                                      ? `${student.birthday instanceof Date 
                                                                          ? student.birthday.toLocaleDateString("pt-BR") 
                                                                          : new Date(student.birthday).toLocaleDateString("pt-BR")} 
                                                                          (${calculateAge(student.birthday)} anos)`
                                                                      : ""
                                                                  }</p>
                <p className="text-sm text-gray-600">Faixa: {student.belt}</p>
                <p className="text-sm text-gray-600">Email: {student.email}</p>
                <div className="flex justify-between mt-2">
                    <button onClick={() => openModal(student)} className="text-blue-500">Editar</button>
                    <button onClick={() => handleDelete(student._id!)} className="text-red-500">Eliminar</button>
                </div>
                </div>
            ))
            ) : (
            <p className="text-gray-500 text-center">Ainda não existem alunos.</p>
            )}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nome</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Edade</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Faixa</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                </tr>
            </thead>
            <tbody>
                {students.length > 0 ? (
                students.map((student, index) => (
                    <tr key={student._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.lastName}, {student.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{
                                                                      student.birthday
                                                                        ? `${student.birthday instanceof Date 
                                                                            ? student.birthday.toLocaleDateString("pt-BR") 
                                                                            : new Date(student.birthday).toLocaleDateString("pt-BR")} 
                                                                            (${calculateAge(student.birthday)} anos)`
                                                                        : ""
                                                                    }</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.belt}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                        <button onClick={() => openModal(student)} className="text-blue-500 mr-4">Editar</button>
                        <button onClick={() => handleDelete(student._id!)} className="text-red-500">Eliminar</button>
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                    Ainda não existem alunos.
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl">
                &times;
                </button>

                <h2 className="text-2xl font-bold mb-4">{editing ? "Editar Aluno" : "Adicionar Aluno"}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                  <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded" required />
                  <input type="text" placeholder="Apelhido" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full p-2 border rounded" required />
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Data de nascimento</label>
                    <DatePicker
                      selected={form.birthday ? new Date(form.birthday) : null}
                      onChange={(date) => setForm({ ...form, birthday: date ? date : new Date() })}
                      dateFormat="dd-MM-yyyy"
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      maxDate={new Date()} 
                      locale={ptBR}
                      className="w-full p-2 mt-1 border rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Faixa</label>
                    <select
                      value={form.belt}
                      onChange={(e) => setForm({ ...form, belt: e.target.value })}
                      className="w-full p-2 mt-1 border rounded-md"
                      >
                      {faixas.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                      ))}
                    </select>
                  </div>
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded" required />

                  <div className="flex justify-between mt-4">
                      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{editing ? "Atualizar" : "Guardar"}</button>
                      <button onClick={closeModal} type="button" className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                  </div>
                </form>
            </div>
            </div>
        )}
      </div>
    </div>
  );
}