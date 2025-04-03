
import { subtitle, title } from "@/app/components/primitives";
import Course from "@/app/models/Course";
import Register from "@/app/components/register"

interface courseInfo extends Course {
  courseDetails: string,
}


export default async function CourseInfo({ params }: { params: Promise<{ courseInfo: string }> }) {
 
  const data = (await params).courseInfo;
  const courseInfo = decodeURIComponent(data);
  const response = await fetch( process.env.NODE_ENV == "production" ? "https://blip-university.vercel.app/api/course" : "http://localhost:3000/api/course", );
  const courseDetails = await response.json();

  console.log("courseDetails", courseDetails);
  console.log("Selected course", courseInfo);

  // Filter the course details based on the selected course
  const selectedCourse = courseDetails.find(
    (course: courseInfo) => course.courseTitle === courseInfo
  );

  return (
    <div className="flex flex-col" >
      <h1 className={title({size: "sm"})}>{courseInfo} ({selectedCourse?.courseCode})</h1>
      <div className="flex flex-col ml-2.5">     
        {selectedCourse ? selectedCourse.courseDetails: ""}
        <div className="flex flex-col mt-1.5 justify-center items-center " >
          <p className={subtitle({})}>
            Fill in the form below to register.
          </p>
          {selectedCourse && (
            <Register
              courseTitle={selectedCourse.courseTitle}
              minRequirements={selectedCourse.minRequirements}
            />
          )}
        </div>      
      </div>
    </div>
  )
}