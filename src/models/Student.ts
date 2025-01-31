import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  age: number;
  belt: string;
  email: string;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  belt: { type: String, required: true }, // Example: White, Blue, Black Belt
  email: { type: String, required: true, unique: true },
});

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);