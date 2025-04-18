import { authOptions } from "@/authOptions";
import Login from "./login"
import { getServerSession } from "next-auth";
import StudentDashboard from "./studentDashboard";
import LecturerDashboard from "./lecturerDashboard";
import AdminDashboard from "./adminDashboard";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session ? (
        (() => {
          switch (session.user.role) {
            case "student":
              return <StudentDashboard />;
            case "lecturer":
              return <LecturerDashboard />;
            case "admin":
              return <AdminDashboard />;
            default:
              return null;
          }
        })()
      ):(
        <Login/>
      )}      
    </div>
  )
}