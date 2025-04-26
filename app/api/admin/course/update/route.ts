import Course from "@/app/models/Course";
import dbConnect from "@/db/courseConnect";
import { NextResponse } from "next/server";


export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
  try {
    await dbConnect();
    const {id} = (await params);
    const body = await request.json();

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {body},
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found"}, { status: 404});
    }

    return NextResponse.json({ message: "Course Updated Successfully", course: updatedCourse});

  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json({ error: "Failed to update course"}, { status: 500 })
  }
}