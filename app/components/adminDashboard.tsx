

import { authOptions } from "@/authOptions";
import { title } from "../components/primitives";
import { getServerSession } from "next-auth";


export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return (
      <div className="flex flex-col justify-center items-center">        
        <p className={title({})}>You are not authorized to view this page!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center" >
      <div className="flex justify-center text-center" >
        <p className={title({})} >Welcome {session.user.name}</p>
      </div>
      <div>        
      </div>
    </div>
  )
}