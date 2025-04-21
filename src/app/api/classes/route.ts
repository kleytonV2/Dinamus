import { connectToDatabase } from "@/lib/mongodb";
import Class from "@/models/Class";
import "@/models/Student";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const classes = await Class.find().populate("students");
  return NextResponse.json(classes);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { title, dayOfWeek, startTime, endTime, students } = await req.json();

  const studentObjectIds = students.map((id: string) => new mongoose.Types.ObjectId(id)); 

  const newClass = new Class({
    title,
    dayOfWeek,
    startTime,
    endTime,
    students: studentObjectIds,
  });

  await newClass.save();
  return NextResponse.json({ message: "Class created", class: newClass });
}

export async function PUT(req: Request) {
    await connectToDatabase();
    const { _id, ...updateData } = await req.json();
    await Class.findByIdAndUpdate(_id, updateData);
    return NextResponse.json({ message: "Class updated successfully" });
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { _id } = await req.json();

  await Class.findByIdAndDelete(_id);
  return NextResponse.json({ message: "Class deleted successfully" });
}