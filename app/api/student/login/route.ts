import Student from "@/app/models/Students";
import { NextResponse } from "next/server";
import dbConnect from "@/db/courseConnect";

export const POST = async (request: Request) => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const { studentId, phoneNo } = await request.json();

    // validate the input data
    if (!studentId || !phoneNo) {
      return NextResponse.json({ error: "Student ID and phone number are required" }, { status: 400 });
    }

    // Find the student in the database
    const student = await Student.findOne({ studentId, phoneNo }).exec();

    if (!student) {
      return NextResponse.json({ error: "Invalid student ID or phone number" }, { status: 401 });
    }

    return NextResponse.json({
      Message: "Login successful",
      student: {
        id: student._id,
        studentId: student.studentId,
      }
    });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}