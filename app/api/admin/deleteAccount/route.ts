import User from "@/app/models/Users";
import dbConnect from "@/db/courseConnect"
import { NextResponse } from "next/server";
import crypto from "crypto"


export const POST = async (request: Request) => {

  try {
    await dbConnect();
    
    const { adminId, password } = await request.json();

    if (!adminId || !password) {
      return NextResponse.json(
        {error: "AdminId and password required"},{ status: 400 }        
      );
    }

    const existingUser = await User.findOne({ userId:adminId}).exec();

    if( !existingUser ) {
      return NextResponse.json(
        {error: "User not found"} ,{status: 404}
      );
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Validate password
    if (existingUser.password !== hashedPassword) {
      return NextResponse.json({error: "Invalid password"}, {status: 401})
    }

    // Delete the user from the database
    await User.deleteOne({ userId: adminId }).exec();

    return NextResponse.json({ message: "Account deleted successfully" });

  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      {error: "Internal Server Error"}, {status: 500}
    )
  }  
}