import { title } from "@/app/components/primitives";
import StudentFilter from "@/app/admin/students/components/studentFilter";
import Student from "@/app/models/Students";
import dbConnect from "@/db/courseConnect";


export default async function StudentData() {
    let studentData = [];
    try {
      await dbConnect();

      const students = await Student.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseCode",
            foreignField: "courseCode",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$courseDetails",
        }
      ]);
      // Convert Mongoose documents to plain Objects
      studentData = students.map((student) => ({
        ...student,
        _id: student._id.toString(),
        studentId: student.studentId.toString(),
        courseCode: student.courseCode.toString(),
        courseDetails: {
          courseTitle: student.courseDetails.courseTitle
        }

      }))
    } catch (error) {
      console.error("Error fetching student data:", error);
    }

  return(
    <div className="flex flex-col" >
      <div className="text-center" >
        <span className={title({})}>Student Data</span>
      </div>
      <div className="flex items-center justify-center" >
        <StudentFilter students={studentData} />
      </div>
    </div>      
  )
}