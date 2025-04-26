import mongoose, {Document} from "mongoose";

interface Lecturer extends Document {
  lecturerId: string;
  name: string;
  email: string;
  password: string;
  course: string;
}

const lecturerScheme = new mongoose.Schema({
  lecturerId: {
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
  course: {
    type: String,
    required: true,
  },
});

const Lecturer = mongoose.models.Lecturers || mongoose.model("Lecturers", lecturerScheme);

export default Lecturer;