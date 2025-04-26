import { title } from "@/app/components/primitives";
import dbConnect from "@/db/courseConnect";
import Lecturer from "@/app/models/Lecturers";
import Link from "next/link";
import { ArrowRight, EditAttributesTwoTone } from "@mui/icons-material";

export default async function Lecturers() {   
  let lecturers = [];
  try{
    await dbConnect();
    lecturers = await Lecturer.find();
  } catch (error) {
    console.error("Error fetching lecturers:", error);
  }

  return (
    <div className="flex-col " >
      <div className="text-center" >
        <span className={title({})} >Lecturers</span>
      </div>
      <div className="flex flex-row justify-evenly items-center mt-2.5" >        
        <div className="justify-start" >
          <table className="table-auto  bg-white text-gray-800 border-collapse border border-gray-300 w-full text-sm md:text-base" >
            <thead>
              <tr>
                <th className="table-">Name</th>
                <th className="table-">Email</th>
                <th className="table-">Course</th>
                <th className="table-">Action</th>
              </tr>
            </thead>
            <tbody>
              {lecturers.map((lecturer) => (
                <tr key={lecturer._id}>
                  <td className="table-">{lecturer.name}</td>
                  <td className="table-">{lecturer.email}</td>
                  <td className="table-">{lecturer.course}</td>
                  <td className="table-">
                    <Link href={`/admin/lecturers/${lecturer._id}`} className="text-blue-400 hover:underline" >                     
                      <EditAttributesTwoTone/> 
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="justify-end" >
          <div className="m-1" >
            <button className="new-button">
              <Link href="/admin/lecturers/addLecturer" > Add Lecturer</Link>
              <ArrowRight/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}