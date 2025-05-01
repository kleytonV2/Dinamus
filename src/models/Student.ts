import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  lastName: string;
  birthday: Date;
  belt: string;
  email: string;
}

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  belt: { 
    type: String,
    enum: ["Branca", "Amarela", "Laranja", "Verde", "Azul", "Roxa", "Marrom", "Preta", "Coral", "Vermelha"],
    required: true 
  },
  email: { type: String, required: false },
});

export default mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);