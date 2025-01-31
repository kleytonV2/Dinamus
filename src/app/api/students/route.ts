import { connectToDatabase } from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextResponse } from "next/server";

// Fetch all students
export async function GET() {
  await connectToDatabase();
  const students = await Student.find();
  return NextResponse.json(students);
}

// Create a new student
export async function POST(req: Request) {
  await connectToDatabase();
  const data = await req.json();
  const newStudent = new Student(data);
  await newStudent.save();
  return NextResponse.json({ message: "Student added successfully!" }, { status: 201 });
}

// Update a student
export async function PUT(req: Request) {
  await connectToDatabase();
  const { _id, ...updateData } = await req.json();
  await Student.findByIdAndUpdate(_id, updateData);
  return NextResponse.json({ message: "Student updated successfully!" });
}

// Delete a student
export async function DELETE(req: Request) {
  await connectToDatabase();
  const { _id } = await req.json();
  await Student.findByIdAndDelete(_id);
  return NextResponse.json({ message: "Student deleted successfully!" });
}