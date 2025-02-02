import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document {
  title: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  students: Types.ObjectId[];
}

const ClassSchema = new Schema<IClass>({
  title: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
});

export default mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);