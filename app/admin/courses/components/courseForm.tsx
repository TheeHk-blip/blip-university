"use client"

import Course from "@/app/models/Course"
import { useRouter } from "next/navigation";
import { useState } from "react"


export default function CourseForm({course}:{course: Course}) {
  const [courseCode, setCourseCode] = useState(course?.courseCode || "");
  const [courseTitle, setCourseTitle] = useState(course?.courseTitle || "");
  const [courseDuration, setCourseDuration] = useState(course?.courseDuration || "");
  const [courseFee, setCourseFee] = useState(course?.courseFee || "");
  const [courseDetails, setCourseDetails] = useState(course?.courseDetails || "");
  const [courseUnits, setCourseUnits] = useState(course?.courseUnits || "");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const method = course ? "PUT" : "POST";
    const url = course 
    ? `http://localhost:3000/api/admin/courses/${course._id}` 
    : "http://localhost:3000/api/admin/courses"

    try {
      const response = await fetch (url, {
        method,
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          courseCode,
          courseTitle,
          courseDuration,
          courseFee,
          courseDetails,
          courseUnits
        }),
      });

      if (response.ok) {
        setMessage(course ? "Course updated successfully" : "Course created successfully");
        setTimeout(() => {
          router.push("/admin/courses")
        }, 2000);        
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to save course")
      }
    } catch (error) {
      console.error("Error saving course:", error);
      setMessage("An error occurred")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center" >
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex flex-row" >
            <input 
              type="text" 
              placeholder="Course Code" 
              value={courseCode} 
              onChange={(e) => setCourseCode(e.target.value)} 
              className="elegant-input"
            />
            <input
              type="text"
              placeholder="Course Title"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="elegant-input"
            />
          </div>
          <div className="flex flex-row" >
            <div>             
              <input
                type="text"   
                placeholder="Course Duration"          
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                className="elegant-input"
              />
            </div>      
            <div>
              <input
              type="text"     
              placeholder="Course Fee"       
              value={courseFee}
              onChange={(e) => setCourseFee(e.target.value)}
              className="elegant-input"
              />           
            </div> 
          </div>          
          <div>
            <label htmlFor="Course Details" className="absolute ml-2.5 mt-1 text-black" >Course Details:</label>
            <textarea             
              value={courseDetails}
              onChange={(e) => setCourseDetails(e.target.value)}
              required
              className=""
            />
          </div>
          <div>
            <label htmlFor="Course Units" className="absolute ml-2.5 mt-1 text-black" >Course Units:</label>
            <textarea              
              value={courseUnits}
              onChange={(e) => setCourseUnits(e.target.value)}
              required              
            />
          </div>
          <div className="flex justify-center items-center" >
            <button className="new-button">
              {course ? "Update Course" : "Create Course"}
            </button>
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  )
}