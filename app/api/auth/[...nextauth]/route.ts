import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Student from "@/app/models/Students";
import { NextAuthOptions } from "next-auth";
import dbConnect from "@/db/courseConnect";

declare module "next-auth" {
  interface User {
    studentId: string;
  }
  interface Session {
    user: {
      studentId: string;
      name: string;
    };
  }
  interface JWT {
    studentId: string;
  }
}

export const authOptions: NextAuthOptions = ({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        studentId: { label: "Student ID", type: "text" },
        phoneNo: { label: "Phone Number", type: "password" },
      },
      async authorize(credentials) {
        // Connect to the database (if not already connected)
        await dbConnect();

        const { studentId, phoneNo } = credentials || {};
        console.log("Received Credentials", {studentId, phoneNo});
        
        // Validate the input data
        if (!studentId || !phoneNo) {
          console.error("Student ID and phone number are required");
          throw new Error("Student ID and phone number are required");
        }

        // Find the student in the database
        const student = await Student.findOne({ studentId, phoneNo }).exec();

        if (!student) {
          console.error("Invalid student ID or phone number");
          throw new Error("Invalid student ID or phone number");
        }

        // Return the student object (to be stored in the session)
        return { id: student._id, studentId: student.studentId, name: student.firstName + " " + student.lastName };
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token
      if (user) {
        token.studentId = user.studentId;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      session.user = { 
        studentId: token.studentId as string,
        name: token.name as string
      };
      return session;
    },
  },
  pages: {
    signIn: "/",
  }
});

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };