import Course from "@/app/models/Course";
import dbConnect from "@/db/courseConnect";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    await dbConnect();
    const response = await request.json();
    const body = await response.json();

    const newCourse = new Course({
      body,
    })

    await newCourse.save();
    return NextResponse.json({ message: "Course created successfully", course: newCourse})
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}