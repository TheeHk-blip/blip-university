import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;
const URI = MONGO_URI

if (!URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
} 

export default async function dbConnect() {
  if(mongoose.connection.readyState !== 1) {
    try{
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
      });
      console.log("Connected to DB");
    } catch (error){
      console.log("Connection failed",error)
    }
  } else {
    console.log("Already connected to DB")
  }
}