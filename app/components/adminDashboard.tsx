

import { authOptions } from "@/authOptions";
import { title } from "../components/primitives";
import { getServerSession } from "next-auth";
import dbConnect from "@/db/courseConnect";
import Student from "../models/Students";
import Course from "../models/Course";
import { ArrowRight } from "@mui/icons-material";
import Link from "next/link";
import Lecturer from "../models/Lecturers";

export async function NewStudents() {
  await dbConnect();

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Calculate date 7 days ago
  //console.log("oneWeekAgo:",oneWeekAgo);

  try {
  const newStudents = await Student.find({ createdAt: { $gte: oneWeekAgo } }).exec();
  //console.log("newStudents",newStudents);
  return newStudents;
  } catch (error) {
    console.error("Error fetching new students:", error);
  }
}


export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex flex-col justify-center items-center">        
        <p className={title({})}>You are not authorized to view this page!</p>
      </div>
    );
  }

  // Fetch total number of students from database
  let totalStudents = 0;
  let newStudents: unknown[] = [];
  try {
    await dbConnect();
    totalStudents = await Student.countDocuments().exec();
    newStudents = (await NewStudents()) ?? [];
  } catch (error) {
    console.error("Error fetching students:", error);
  }

  // Fetch total number of courses from database
  let totalCourses = 0;
  try {
    await dbConnect();
    totalCourses = await Course.countDocuments().exec();
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  // Fetch total number of lecturers from database
  let totalLecturers = 0;
  try {
    await dbConnect();
    totalLecturers = await Lecturer.countDocuments().exec();
  } catch (error) {
    console.error("Error fetching lecturers:", error);
  }

  return (
    <div className="flex flex-row  sm:flex-col justify-evenly " >
      <div className="flex justify-center text-center" >
        <p className={title({})} >Welcome {session.user.name}</p>
      </div>
      <div className="flex flex-row justify-evenly mt-2.5 " >      
        <div className="flex-col text-black card" >
          <span className={title({size: "sm"})} >Students</span>
          <div className="flex-col" >            
            <div className="flex-row" >
              <span className="text-sm ml-2.5 text-black">Total Students:</span>
              <span>{totalStudents}</span>
            </div>
            <div className="flex-row" >
              <span className="text-sm ml-2.5 text-black">New Students:</span>
              <span>{newStudents.length}</span>
              <div className="m-1" >
                <button className="neu-button">
                  <Link href="/admin/students" > View More</Link>
                  <ArrowRight/>
                </button>
              </div>
            </div>
          </div>
        </div>  
        <div className="flex-col text-black card" >
          <span className={title({size: "sm"})} >Lecturers</span>
          <div>
            <div className="flex-row" >
              <span className="text-sm ml-2.5 text-black">Total Lecturers:</span>
              <span>{totalLecturers}</span>
              <div className="m-1" >
                <button className="neu-button">
                  <Link href="/admin/lecturers" > View More</Link>
                  <ArrowRight/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col text-black card" >
          <span className={title({size: "sm"})} >Courses</span>
          <div>
            <div className="flex-row" >
              <span className="text-sm ml-2.5 text-black">Total Courses:</span>
              <span>{totalCourses}</span>
              <div className="m-1" >
                <button className="neu-button">
                  <Link href="/admin/courses" > View More</Link>
                  <ArrowRight/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}