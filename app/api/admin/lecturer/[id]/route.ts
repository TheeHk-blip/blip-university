import Lecturer from "@/app/models/Lecturers";
import dbConnect from "@/db/courseConnect";
import { NextResponse } from "next/server";


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }>}) {
  try {
    await dbConnect();

    const {id} = (await params); // Extract lecturer ID from URL
    const { name, email, course } = await request.json();
    
    if (!name || !email || !course) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true }
    );

    if (!updatedLecturer) {
      return NextResponse.json({ error: "Lecturer not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Lecturer updated successfully", lecturer: updatedLecturer },
      { status: 200 }
    )    

  } catch (error) {
    console.error("Error updating lecturer:", error);
    return NextResponse.json({ error: "Failed to update lecturer" }, { status: 500 });
  }
}