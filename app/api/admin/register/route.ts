import dbConnect from "@/db/courseConnect"
import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/app/models/Users";

export const POST = async (request: Request) => {
  try {
    await dbConnect();

    // Check if Admin already exists
    const existingAdmin = await User.findOne({ role: "admin" }).exec();
    if (existingAdmin) {
      return NextResponse.json(
        {error: "Admin already exists. Please login."},
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name , email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        {error: "Please fill in all fields."},
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

    // Create Admin user
    const admin = new User({
      userId: name,
      name,
      password: hashedPassword,
      email,
      role: "admin",
    });

    // Save the admin user to the database
    await admin.save();
    return NextResponse.json({ message: "Admin registered successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error registering admin:", error);
    return NextResponse.json({ error: "Failed to register admin" }, { status: 500 });
  }

}