import dbConnect from "@/db/courseConnect";
import Course from "@/app/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try{
    const courses = await Course.find().exec();
    return NextResponse.json(courses);
  } catch (error){
    console.log("No courses found", error);
    return NextResponse.error();
  }
}