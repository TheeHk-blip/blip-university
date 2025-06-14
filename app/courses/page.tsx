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

  function getUnitsApiUrl(){
    if (process.env.NODE_ENV === "development") {
      // Use localhost if running locally, otherwise use devtunnel
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return "http://localhost:3000/api/course";
      }
      return `https://4hb0xq12-3000.euw.devtunnels.ms/api/course`;
    }
    // Production
    return `https://blip-university.vercel.app/api/course`;
  }


  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try{
        const response = await fetch(getUnitsApiUrl());
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
    <div className="flex flex-col items-center justify-center ">
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
        <div className="loader">
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
        </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <div className="card">
              {course.length > 0 ? (
                <div>
                  {course.map((course: course) => (
                    <div key={course.courseCode} >
                      <Link href={"/courses/" + course.courseTitle} className="block p-4 mb-4 bg-[#F7F7F7] rounded-2xl shadow-[0_2px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-shadow">
                        <h2 className=" text-blue-600 hover:text-[17px] sm:text-black sm:hover:text-blue-600">{course.courseTitle}</h2>                        
                      </Link>
                    </div>
                  ))}
                </div>
              ):(
                <p className="text-center">No courses available at the moment.</p>
              )}
            </div>            
          </div>
        )}
      </div>
    </div>
  );
}
