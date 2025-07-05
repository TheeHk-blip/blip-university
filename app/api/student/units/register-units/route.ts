import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authOptions";
import dbConnect from "@/db/courseConnect";
import Student, { IStudent } from "@/app/models/Students";

export const POST = async (req: Request) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = session.user.userId;
    const { units } = await req.json(); // units: string[] (unit codes)

    if (!Array.isArray(units)) {
      return NextResponse.json({ error: "Invalid units data" }, { status: 400 });
    }

    // Update the student's registeredUnits field (create it if it doesn't exist)
    const student = await Student.findOneAndUpdate(
      { studentId },
      { $set: { registeredUnits: units } },
      { new: true, upsert: false }
    );

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Units registered successfully", registeredUnits: student.registeredUnits });
  } catch (error) {
    console.error("Error registering units:", error);
    return NextResponse.json({ error: "Failed to register units" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const studentId = session.user.userId;
    const student = await Student.findOne({ studentId }).lean<IStudent>();
    console.log("Student found:", student)

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Return the registeredUnits array (unit codes)
    return NextResponse.json({ registeredUnits: student.registeredUnits || [] });

  } catch (error) {
    console.error("Error fetching registered units:", error);
    return NextResponse.json({ error: "Failed to fetch registered units" }, {status: 500})
  }
}