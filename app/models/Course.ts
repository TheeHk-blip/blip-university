import mongoose, { Document } from "mongoose";

interface Unit extends Document {
  code: string;
  title: string;
}

interface CourseUnits extends Document {
  year: number;
  semester: number;
  units: Unit[];
}

interface Course extends Document {
  courseTitle: string;
  courseCode: string;
  courseFee: string;
  courseDuration: string;
  minRequirements: string;
  courseDetails: string;
  courseUnits: CourseUnits[];
}

const unitSchema = new mongoose.Schema(
  {
    code: {
      type: String
    },
    title: {
      type: String
    },
  },
  {_id: false}
);

const courseUnitBlockSchema = new mongoose.Schema(
  {
    year: {
      type: Number
    },
    semester: {
      type: Number
    },
    units: {
      type: [unitSchema]
    },
  },
  { _id: false}
)

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,    
  },
  courseCode: {
    type: String,    
  },
  courseFee: {
    type: String,    
  },
  courseDuration: {
    type: String,    
  },
  minRequirements: {
    type: String,  
  },
  courseDetails: {
    type: String,  
  },
  courseUnits: {
    type: [courseUnitBlockSchema]
  }
});

const Course = mongoose.models.Courses || mongoose.model("Courses", courseSchema);

export default Course;