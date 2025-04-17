// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

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
}