import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAttendance extends Document {
  date: Date;
  class: Types.ObjectId;
  absentStudents: Types.ObjectId[];
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    date: { type: Date, required: true },
    class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    absentStudents: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model<IAttendance>("Attendance", AttendanceSchema);