import mongoose, {Document} from "mongoose";

export interface IStudent {
  studentId: string;
  registeredUnits: string[];
}

interface Student extends Document {
  firstName: string,
  lastName: string,
  nationalId: number,
  phoneNo:  number,
  emailAddress: string,
  meanGrade: string,
  courseCode: string,
  year: number,
  currentYear: number,
  currentSemester: number,
  registeredUnits: string[],
  studentId: string,
  createdAt?: Date; // Automatically added by timestamps
  updatedAt?: Date; // Automatically added by timestamps
}

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  nationalId: {
    type: Number,
    required: true,
    unique: true
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true
  },
  meanGrade: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  currentYear: {
    type: Number,
    required: true,
    default: 1
  },
  currentSemester: {
    type: Number,
    required: true,
    default: 1
  },
  registeredUnits: {
    type: [String],
    default: []
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
}, {timestamps: true});

const Student = mongoose.models.Students || mongoose.model("Students", studentSchema)

export default Student;