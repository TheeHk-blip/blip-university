import NextAuth from "next-auth";
import {authOptions} from "@/authOptions";
declare module "next-auth" {
  interface User {
    userId: string;
    role: string;
    name: string;
    studentId?: string;
  }
  interface Session {
    user: {
      userId: string;
      role: string;
      name: string;
      studentData: string | null;
    };
  }
  interface JWT {
    userId: string;
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };