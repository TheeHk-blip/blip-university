import EditLecturerForm from "../components/editLecturerForm";


interface Lecture {
  _id: string;
  name: string;
  email: string;
  course: string;
}

export default async function EditLecturer(lecturer: Lecture) {
  return (
    <div>
      <EditLecturerForm lecturer={lecturer} />
    </div>
  )
}