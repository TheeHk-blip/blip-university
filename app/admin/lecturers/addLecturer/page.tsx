import { title } from "@/app/components/primitives";
import LectureForm from "../components/lectureform";


export default function AddLecturer() {

  return (
    <div className="flex flex-col justify-center items-center" >
      <span className={title({size: "sm"})}>Add Lecturer</span>
      <div>
        <LectureForm/>
      </div>
    </div>
  )
}