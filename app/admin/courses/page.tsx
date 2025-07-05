/*import { title } from "@/app/components/primitives";
import Course from "@/app/models/Course";
import dbConnect from "@/db/courseConnect";
import { Create, EditAttributesTwoTone } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import Link from "next/link";
import { NextResponse } from "next/server";


export default async function Courses() {
  let courses = []
  try {
    await dbConnect();
    courses =  await Course.find({});
  } catch (error) {
    console.error("No courses found:", error)
    return NextResponse.json("No courses found")
  }

  return (
    <div className="flex flex-col justify-center flex-shrink sm:flex-wrap">
      <div className="text-center" >
        <span className={title({size: "sm"})}>Courses</span>
      </div>        
      <div className="flex">
        <div className="overflow-x-auto justify-center" >
        <table className="table-auto bg-white text-gray-800 border-collapse border border-gray-300 max-w-screen text-center text-sm md:text-base">
          <thead>
            <tr className="bg-gray-50 text-gray-700">              
              <th className="Table" >Course Code</th>
              <th className="Table" >Course Title</th>
              <th className="Table" >CourseDuration</th>
              <th className="Table" >CourseFee</th>
              <th className="Table" >CourseDetails</th>
              <th className="Table" >CourseUnits</th>
              <th className="Table" >Action</th>
            </tr>
          </thead>
          <tbody className="cursor-default" >
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id}>                                    
                    <td className="Table" >{course.courseCode}</td>                 
                  <Tooltip title={course.courseTitle} placement={"top"} >
                    <td className="Table" >{course.courseTitle}</td>
                  </Tooltip>                                                   
                    <td className="Table" >{course.courseDuration}</td>                 
                    <td className="Table" >{course.courseFee}</td>                 
                  <Tooltip title={course.courseDetails} placement={"right"} >
                    <td className="Table" >{course.courseDetails}</td>  
                  </Tooltip>                
                  <Tooltip title={course.courseUnits} placement={"left"} >
                    <td className="Table" >{course.courseUnits}</td>
                  </Tooltip>                                   
                  <td className="Table" >
                    <Link href={"/admin/courses/editCourse"} className="text-blue-500 hover:underline" >
                      <EditAttributesTwoTone/>
                      Edit
                    </Link>
                    <Link href={"/admin/courses/createCourse"} className="text-blue-500 hover:underline">
                      <Create/>
                      Create
                    </Link>
                  </td>
                </tr>
              ))
            ):(
              <div>
                <span>No courses found</span>
              </div>
            )}                          
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )  
}*/