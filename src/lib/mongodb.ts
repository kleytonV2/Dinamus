import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    try {

        if (cached.conn) return cached.conn;

        if (!cached.promise) {
            cached.promise = mongoose.connect(MONGODB_URI, {
                dbName: "Dinamus", 
                bufferCommands: false
            });
        }
    
        console.log("Connecting to MongoDB...");
        
        cached.conn = await cached.promise;
        (global as any).mongoose = cached;

        console.log("MongoDB Connected!");
        return cached.conn;
    } catch (error) {
        console.error("MongoDB Connection Error", error);
        throw new Error("Failed to connect to MongoDB");
    }
};