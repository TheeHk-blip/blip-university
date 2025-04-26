"use client"

import { useState } from "react";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  courseCode: string;
  courseDetails: {
    courseTitle: string;
  };
  emailAddress: string;
  phoneNo: string;
}

export default function StudentFilter({ students}: {students: Student[]}) {
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [selectedCourse, setSelectedCourse] = useState("");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const courseCode = event.target.value;
    setSelectedCourse(courseCode);

    if (courseCode ==="") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter((student) => student.courseCode === courseCode));
    }
  };

  const courseCodes = Array.from(new Set(students.map((student) => student.courseCode)));

  return (
    <div className="flex flex-col">
      <div className="mb-4" >
        <label htmlFor="courseFilter">Filter by Course:</label>
        <select
          id="courseFilter"
          value={selectedCourse}
          onChange={handleFilterChange}
          className="border border-gray-300  text-gray-500 rounded px-2 p-1 ml-2"
        >
          <option value="">All Courses</option>
          {courseCodes.map((courseCode) => (
            <option className="text-gray-500" key={courseCode} value={courseCode}>
              {courseCode}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto w-full">
      <table className="table-auto bg-white text-gray-800 border-collapse border border-gray-300 w-full text-sm md:text-base">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="table-" >Name</th>
              <th className="table-" >Course Code</th>
              <th className="table-" >Course Title</th>
              <th className="table-" >Email</th>
              <th className="table-" >Phone No</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td className="table-" >{student.firstName} {student.lastName}</td>
                  <td className="table-" >{student.courseCode}</td>
                  <td className="table-" >{student.courseDetails.courseTitle}</td>
                  <td className="table-" >{student.emailAddress}</td>
                  <td className="table-" >{student.phoneNo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

}