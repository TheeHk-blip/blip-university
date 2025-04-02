// This route handles the registration of a new student
// It receives a POST request with form data, creates a new Student instance, and saves it to the database
import Student from "@/app/models/Students";
import { NextResponse } from "next/server";
import Course from "@/app/models/Course";

export const POST = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const courseTitle = url.searchParams.get("courseTitle");

    //Validate courseTitle
    if (!courseTitle) {
      return NextResponse.json({ error: "Course title is required" }, { status: 400 });
    }

    const formData = await request.formData();

    //Extract form Data    
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const nationalId = formData.get("nationalId") as string;
    const phoneNo = formData.get("phoneNo") as string;
    const emailAddress = formData.get("emailAddress") as string;
    const meanGrade = formData.get("meanGrade") as string;



    //Fetch the courseCode from the database
    const course = await Course.findOne({ courseTitle }).exec();
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const courseCode = course.courseCode;

    //Get current year
    const year = new Date().getFullYear();

    //Count existing students for the same year
    const studentCount = await Student.countDocuments({ year });

    //Generate student ID
    const index = studentCount + 1;
    const studentId = `${courseCode}/${year}/${index}`;

    //Create new Student Instance
    const student = new Student({
      firstName,
      lastName,
      nationalId,
      phoneNo,
      emailAddress,
      meanGrade,
      courseCode,
      year, 
      studentId,
    });
    
    //Save the student to the database
    await student.save();

    return NextResponse.json({ message: "Application successful", studentId });
  } catch (error) {
    console.error("Failed to register student", error);
    return NextResponse.json({ error: "Failed to register student" }, { status: 500 });
  }
}