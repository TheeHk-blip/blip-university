import Course from "@/app/models/Course";
import Student from "@/app/models/Students";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const student = new Student({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    nationalId: formData.get("nationalId"),
    phoneNo: formData.get("phoneNo"),
    emailAddress: formData.get("emailAddress"),
    meanGrade: formData.get("meanGrade"),
  });

  const courseId = formData.get("phoneNo");
  const course = await Course.findById(courseId);
  if (!course) {
    return NextResponse.error();
  }
  const courseCode = course.courseCode;

  const year = new Date().getFullYear();
  const index = await Student.countDocuments({
    studentId: {$regex: `^${courseCode}/${year}/`}
  }) + 1;
  const studentId = `${courseCode}/${year}/${index}`;
  student.studentId = studentId;
  await student.save();
  return NextResponse.json("Application successful",student);
}