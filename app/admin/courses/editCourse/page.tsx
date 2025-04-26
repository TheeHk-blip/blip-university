import { title } from "@/app/components/primitives";
import CourseForm from "../components/courseForm";
import Course from "@/app/models/Course";
import dbConnect from "@/db/courseConnect";

export default async function EditCourse({params}: {params: {id:string}}) {
  await dbConnect();

  const course= await Course.findById(params.id);
  console.log("Course id:", params.id)
  if(!course) {
    return(
      <div>Course not found</div>
    )
  }  
  return (
    <div className="flex flex-col justify-center text-center" >
      <span className={title({size: "sm"})}>Edit Course</span>
      <div>
        <CourseForm course={course} />
      </div>
    </div>
  )
}