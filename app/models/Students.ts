import mongoose, {Document} from "mongoose";

interface Student extends Document {
  firstName: string,
  lastName: string,
  nationalId: number,
  phoneNo:  number,
  emailAddress: string,
  meanGrade: string,
  courseCode: string,
  year: number,
  studentId: string
}

const studentScheme = new mongoose.Schema({
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
  studentId: {
    type: String,
    required: true,
    unique: true
  }
});

const Student = mongoose.models.Students || mongoose.model("Students", studentScheme)

export default Student;