import Lecturer from "@/app/models/Lecturers";
import User from "@/app/models/Users";
import dbConnect from "@/db/courseConnect";
import { NextResponse } from "next/server";
import crypto from "crypto"

export async function POST (request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.email || !body.password || !body.course) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    const lecturer = new Lecturer({
      lecturerId: body.name,
      name: body.name,
      email: body.email,
      password: body.password,
      course: body.course
    });
    await lecturer.save();

    const hashedPassword = crypto
      .createHash("sha256")
      .update(body.password)
      .digest("hex");

    const user = new User({
      userId: body.name,
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: "lecturer",
      course: body.course
    });
    await user.save();

    return NextResponse.json({ message: "Lecturer created successfully." }, { status: 201 });

  } catch (error) {
    console.error("Error creating lecturer:", error);
    return NextResponse.json({ error: "Failed to create lecturer." }, { status: 500 });
  }
}