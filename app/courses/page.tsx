"use client"

import { title } from "../components/primitives";
import { siteConfig } from "../config/site";
import Course from "../models/Course";
import { useEffect, useState } from "react";
import Link from "next/link";


interface course extends Course{
  courseTitle: string,
  courseCode: string,
  courseFee: string,
  courseDuration: string,
  minRequirements: string
}

export default function Courses() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try{
        const response = await fetch(process.env.NODE_ENV == "development" ? "http://localhost:3000/api/course" : "https://blip-university.vercel.app/api/course", );
      const data = await response.json();
      setCourse(data);
      } catch (error) {
        console.log("Error fetching courses",error)
      } finally {
        setLoading(false);
      }      
    };
    fetchCourses();
  }, []);
  return(
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className={title({})}>Courses</h1>
      <div className="flex flex-col ml-1.5 items-center justify-center">
        <p>
          Are you looking to advance your studies in a good institution? At{" "}
          {siteConfig.name}, we offer a wide variety of courses, taught by some
          of the best lecturers in the country. Hurry up and register for a
          course now!
        </p>
      </div>
      <div className="flex mt-4 justify-center items-center w-full">
        {loading ? (
          <div className="text-center w-full">
            <p>Loading Courses...</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table-auto bg-white text-gray-800 border-collapse border border-gray-300 w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="Table">Course Title</th>                                      
                  <th className="Table">Course Code</th>                                                                                           
                  <th className="Table">Duration(years)</th>                                      
                  <th className="Table">Minimum Requirements</th>
                  <th className="Table">Fee(per academic year)</th>                                    
                </tr>
              </thead>
              <tbody className="text-center" >
                {course.length > 0 ? (
                  course.map((course: course) => (
                  <tr
                    key={course.courseTitle}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="Table">
                      <Link
                        href={"/courses/" + course.courseTitle}
                        className="hover:underline text-blue-800"
                      >
                        {course.courseTitle}
                      </Link>
                    </td>
                    <td className="Table"> {course.courseCode}</td>                                                                                                      
                    <td className="Table">{course.courseDuration}</td>                                          
                    <td className="Table">{course.minRequirements}</td>  
                    <td className="Table">{course.courseFee}</td>                                       
                  </tr>
                  ))
                ):(
                  <tr>
                    <td colSpan={5} className="border-b border-gray-300 px-4 py-2 text-center">
                      No courses found.
                    </td>
                  </tr>
                )}                
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
