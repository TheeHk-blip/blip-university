import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = 0; // Track the connection state

export default async function dbConnect() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {          
      serverSelectionTimeoutMS: 30000, // Optional: Adjust timeout as needed
    });
    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Internal Server Error");
  }
}