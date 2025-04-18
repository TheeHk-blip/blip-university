import mongoose, { Document } from "mongoose";

interface User extends Document {
  userId: string;
  email: string;
  name: string;
  password: string;
  role: "admin" | "student" | "lecturer";
  studentRef?: mongoose.Schema.Types.ObjectId; // Optional reference to Student model
}

const userScheme = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student", "lecturer"],
    required: true,
  },
  studentRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students", // Reference to the Student model
  },
});

const User = mongoose.models.Users || mongoose.model("Users", userScheme);

export default User;