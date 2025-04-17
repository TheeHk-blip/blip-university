import Course from "@/app/models/Course";
import Student from "@/app/models/Students";
import dbConnect from "@/db/courseConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";


export const GET = async () => {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = session.user.userId;
    const student = await Student.findOne({ studentId }).exec();

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const course = await Course.findOne({ courseCode: student.courseCode}).exec();

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ courseFee: course.courseFee, courseTitle: course.courseTitle });

  } catch (error) {
    console.error("Error fetching fees:", error);
    return NextResponse.json({ error: "Failed to fetch fees" }, { status: 500 });
  }
}