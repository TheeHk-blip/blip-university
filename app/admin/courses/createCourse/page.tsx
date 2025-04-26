import { title } from "@/app/components/primitives";
import CourseForm from "../components/courseForm";
import Course from "@/app/models/Course";

export default function EditCourse({course}:{course:Course}) {

  return (
    <div className="flex flex-col justify-center text-center" >
      <span className={title({size: "sm"})}>Create Course</span>
      <div>
        <CourseForm course={course} />
      </div>
    </div>
  )
}