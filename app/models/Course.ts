import mongoose, { Document } from "mongoose";

interface Course extends Document {
  courseTitle: string;
  courseCode: string;
  courseFee: string;
  courseDuration: string;
  minRequirements: string;
  courseDetails: string;
}

const courseScheme = new mongoose.Schema({
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
});

const Course = mongoose.models.Courses || mongoose.model("Courses", courseScheme);

export default Course;