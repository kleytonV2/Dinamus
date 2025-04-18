import { NextResponse } from "next/server";
import Attendance from "@/models/Attendance";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  await connectToDatabase();
  const attendances = await Attendance.find()
                                      .populate("class")
                                      .populate("absentStudents"); 
  return NextResponse.json(attendances);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { date, classId, absentStudents } = await req.json();

  const newAttendance = await Attendance.create({
    date,
    class: classId,
    absentStudents: absentStudents.map((id: string) => new mongoose.Types.ObjectId(id)),
  });

  return NextResponse.json({ message: "Attendance created", attendance: newAttendance });
}

export async function PUT(req: Request) {
  await connectToDatabase();
  const { _id, ...updateData } = await req.json();
  await Attendance.findByIdAndUpdate(_id, updateData);
  return NextResponse.json({ message: "Attendance updated successfully" });
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  const { _id } = await req.json();

  await Attendance.findByIdAndDelete(_id);
  return NextResponse.json({ message: "Attendance deleted successfully" });
}