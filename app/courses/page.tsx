"use client"

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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

export  function GetCourse(){
  return (
    fetch("/api/course")
    .then(response => response.json())
    .catch(error => console.log("Error fetching courses", error))
  )
} 

export default function Courses() {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    GetCourse().then((data) => setCourse(data))
  }, [])

  return (
    <div>
      <h1 className={title({})}>Courses</h1>
      <div className="flex flex-col ml-1.5">
        <p>
          Are you looking to advance your studies in a good institution? At {siteConfig.name} we offer a wide variety of courses, taught by some of the best lectures in the country. 
          Hurry up and register for a course now! 
        </p>
      </div>
        <div className="flex mt-2" >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="flex" >
                  <TableCell>Course</TableCell>
                  <TableCell>Course Code</TableCell>                  
                  <TableCell>Duration(Years)</TableCell>
                  <TableCell>Min.Requirements</TableCell>
                  <TableCell>Fee(Per Academic Year)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.map((course: course) => (
                  <TableRow key={course.courseTitle}>
                    <TableCell>
                      <Link href={`/courses/${course.courseTitle}`} className="text-blue-700 hover:underline" >
                        {course.courseTitle}
                      </Link>
                    </TableCell>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.courseDuration}</TableCell>
                    <TableCell>{course.minRequirements}</TableCell>
                    <TableCell>{course.courseFee}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>      
    </div>
  )
}