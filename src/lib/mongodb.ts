import mongoose from "mongoose";
 
 const MONGODB_URI = process.env.MONGODB_URI as string;
 
 if (!MONGODB_URI) {
   throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
 }
 
 let cachedConnection: typeof mongoose | null = null;
 
 export const connectToDatabase = async () => {
     if (cachedConnection) {
         console.log("Using cached MongoDB connection");
         return cachedConnection;
     }
 
     try {
         console.log("Connecting to MongoDB...");
         cachedConnection = await mongoose.connect(MONGODB_URI, {
             dbName: "Dinamus", 
         });
 
         console.log("MongoDB Connected ✅");
         return cachedConnection;
     } catch (error) {
         console.error("MongoDB Connection Error ❌", error);
         throw new Error("Failed to connect to MongoDB");
     }
}