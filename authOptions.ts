import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/courseConnect";
import Student from "@/app/models/Students";
import User from "./app/models/Users";
import crypto from "crypto";

export const authOptions: NextAuthOptions = {  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },                   
        
      async authorize(credentials) {
        await dbConnect();

        const { userId, password } = credentials || {};

        if (!userId || !password) {
          throw new Error("User ID and password are required");
        }
        
        // Hash password before querying the database
        const hashedPassword = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");

        // Find user in the database
        const user = await User.findOne({ userId, password: hashedPassword }).exec();
        
        if (!user) {
          console.error("User not found for userId:", userId);
          throw new Error("Invalid user ID or password");
        }
        // If user is student fetch additional student specific data        
        let studentData = null;
        if (user.role === "student") {
          studentData = await Student.findOne({ studentId: user.userId }).exec();
          if (!studentData) {
            throw new Error("Student not found");
          }
        }
        
        return {
          id: user._id,
          userId: user.userId,
          role: user.role,
          name: user.name,
          studentData
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.role = user.role;
        token.name = user.name;
        if (user.studentId) {
          token.studentId = user.studentId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        userId: token.userId as string,
        role: token.role as string,
        name: token.name as string,
        studentData: token.studentData as string || null,
      };
      return session;
    }
  },
  pages: {
    signIn: "/"
  }  
}