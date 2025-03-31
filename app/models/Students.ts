import mongoose, {Document} from "mongoose";

interface Student extends Document {
  firstName: string,
  lastName: string,
  nationalId: number,
  phoneNo:  number,
  emailAddress: string,
  meanGrade: string,
}

const studentScheme = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  nationalId: {
    type: Number
  },
  phoneNo: {
    type: Number
  },
  emailAddress: {
    type: String
  },
  meanGrade: {
    type: String
  }
});

const Student = mongoose.models.Student || mongoose.model("Student", studentScheme)

export default Student;