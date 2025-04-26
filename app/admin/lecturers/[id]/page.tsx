import { title } from "@/app/components/primitives";
import Lecturer from "@/app/models/Lecturers";
import dbConnect from "@/db/courseConnect";
import EditLecturerForm from "../editLecturer/page";
import mongoose from "mongoose";

interface Lecture {
  _id: string;
  name: string;
  email: string;
  course: string;
}

export default async function EditLecturer({ params }: {params: Promise<{id: string}>}) {  
  await dbConnect();
  const info = (await params).id;
  //console.log("Lecturer ID:",info)

  if (!mongoose.isValidObjectId(info)) {
    return <div>Invalid Lecturer ID</div>
  }
  
  const rawLecturer = await Lecturer.findById(new mongoose.Types.ObjectId(info)).lean<Lecture>();
  //console.log("Raw Lecturer:",rawLecturer)
  if (!rawLecturer) {
    return (
      <div> Lecturer not found</div>
    )
  }
  
  const lecturer: Lecture = {
    _id: rawLecturer._id.toString(),
    name: rawLecturer.name,
    email: rawLecturer.email,
    course: rawLecturer.course
  }

  return (
    <div className="flex-col">
      <div className="text-center">
        <h1 className={title({size: "sm"})}>Edit Lecturer</h1>
      </div>
      <div>
        <EditLecturerForm lecturer={lecturer} />
      </div>
    </div>
  )
}