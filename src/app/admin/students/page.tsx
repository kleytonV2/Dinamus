"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO } from "date-fns";
import { Belts } from "@/types/types";
import { ptBR } from "date-fns/locale";
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import Image from 'next/image';
import addIcon from "@/app/assets/icons/addIcon.svg";
import SearchInput from "@/app/admin/components/SearchInput";

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
  const [form, setForm] = useState<IStudent>({ name: "", lastName: "", birthday: new Date(), belt: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
    setLoading(false); 
  }, []);

  async function fetchStudents() {
    try{
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } 
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
      setForm({ name: "", lastName: "", birthday: new Date(), belt: "", email: "" });
      setEditing(false);
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setForm({ name: "", lastName: "", birthday: new Date(), belt: "", email: "" });
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

  if (loading || students.length === 0) {
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
      <AdminNavbar/>
      <div className="max-w-6xl mx-auto px-4 py-6 pt-24">
        
        <div className={`transition-opacity duration-500`}>

          <div className="flex flex-row justify-between mb-4">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar alunos..."
            />
            <button onClick={() => openModal()} className="px-1 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600 transition">
                <Image className="" src={addIcon} alt="icon" />
            </button>
          </div>

          {/* Mobile-Friendly Student List */}
          <div className="space-y-4 sm:hidden">
              {students.length > 0 ? (
              students.filter((st) =>
                (st.lastName.toLowerCase() + st.name.toLowerCase()).trim().includes(searchTerm.replace(",","").trim().toLowerCase())
                ).map((student) => (
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
                  students.filter((st) =>
                    (st.lastName.toLowerCase() + st.name.toLowerCase()).trim().includes(searchTerm.replace(",","").trim().toLowerCase())
                  ).map((student, index) => (
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
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="name"
                        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                        placeholder="Nome"
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        required 
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Nome
                      </label>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="lastname"
                        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                        placeholder="Apelhido"
                        value={form.lastName} 
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                        required
                      />
                      <label
                        htmlFor="lastname"
                        className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Apelhido
                      </label>
                    </div>
                    <div className="relative w-full">
                      <DatePicker
                        id="date"
                        selected={form.birthday ? new Date(form.birthday) : null}
                        onChange={(date) => setForm({ ...form, birthday: date ? date : new Date() })}
                        dateFormat="dd-MM-yyyy"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={new Date()} 
                        locale={ptBR}
                        placeholderText="Data de nascimento"
                        className="mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                      />
                      <label
                        htmlFor="date"
                        className="absolute left-0 -top-1 text-sm text-gray-600 transition-all"
                      >
                        Data de nascimento
                      </label>
                    </div>
                    
                    <div className="relative w-full">
                      <select
                        id="belt"
                        value={form.belt}
                        onChange={(e) => setForm({ ...form, belt: e.target.value })}
                        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent appearance-none 
                          focus:outline-none focus:border-blue-500"
                        >
                        <option value="">Selecione uma faixa</option>
                        {Object.values(Belts).map((value, index) => (
                          <option key={index} value={value}>{value}</option>
                        ))}
                      </select>

                      <label
                        htmlFor="belt"
                        className="absolute left-0 -top-1 text-sm text-gray-600 transition-all 
                          peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                          peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Faixa
                      </label>
                    </div>
                    <div className="relative w-full">
                      <input
                        type="email"
                        id="email"
                        className="peer mt-4 p-2 h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                        placeholder="Email"
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-1 peer-focus:text-sm peer-focus:text-gray-600"
                      >
                        Email
                      </label>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                      {editing ? "Atualizar" : "Guardar"}
                    </button>
                  
                  </form>
              </div>
              </div>
          )}
        </div>
      </div>
    </>
  );
}