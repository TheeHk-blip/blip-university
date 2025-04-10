import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/db/courseConnect";
import Student from "@/app/models/Students";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        studentId: { label: "Student ID", type: "text" },
        phoneNo: { label: "Phone Number", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const { studentId, phoneNo } =credentials || {};

        if (!studentId || !phoneNo) {
          throw new Error("Student ID and phone number are required");
        }

        const student = await Student.findOne({ studentId, phoneNo}).exec();

        if (!student) {
          throw new Error("Invalid student ID or phone number");
        }

        return { id: student._id, studentId: student.studentId, name: student.firstName + " " + student.lastName };
      }
    })
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
        token.studentId = user.studentId;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        studentId: token.studentId as string,
        name: token.name as string,
      };
      return session;
    }
  },
  pages: {
    signIn: "/"
  }
}