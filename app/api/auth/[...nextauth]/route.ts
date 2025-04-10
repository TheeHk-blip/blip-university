import NextAuth from "next-auth";
import {authOptions} from "@/authOptions";
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };