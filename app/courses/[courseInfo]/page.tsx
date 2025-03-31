
import { subtitle, title } from "@/app/components/primitives";
import Course from "@/app/models/Course";
import Register from "@/app/components/register"

interface courseInfo extends Course {
  courseDetails: string
}


export default async function CourseInfo({ params }: { params: Promise<{ courseInfo: string }> }) {
  const data = (await params).courseInfo;
  const courseInfo = decodeURIComponent(data);
  const response = await fetch("http://localhost:3000/api/course");
  const courseDetails = await response.json();

  return (
    <div className="flex flex-col" >
      <h1 className={title({size: "sm"})}>{courseInfo}</h1>
      <div className="flex flex-col ml-2.5">     
        {courseDetails.map((course: courseInfo) => (course.courseTitle === courseInfo ? course.courseDetails : ""))}        
        <div className="flex flex-col mt-1.5 justify-center items-center " >
          <p className={subtitle({})} >
            Go ahead and apply for this Course.
          </p>    
          <Register/>                
        </div>        
      </div>
    </div>
  )
}