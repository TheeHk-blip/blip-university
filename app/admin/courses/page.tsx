import { title } from "@/app/components/primitives";



export default async function Courses() {

  return (
    <div className="flex flex-col justify-center flex-shrink sm:flex-wrap">
      <div className="text-center" >
        <span className={title({size: "sm"})}>Courses</span>
      </div>        
      <div className="flex">
        <div className="overflow-x-auto justify-center" >
        <table className="table-auto bg-white text-gray-800 border-collapse border border-gray-300 max-w-screen text-center text-sm md:text-base">
          <thead>
            <tr className="bg-gray-50 text-gray-700">              
              <th className="Table" >Course Code</th>
              <th className="Table" >Course Title</th>
              <th className="Table" >CourseDuration</th>
              <th className="Table" >CourseFee</th>
              <th className="Table" >CourseDetails</th>
              <th className="Table" >CourseUnits</th>
              <th className="Table" >Action</th>
            </tr>
          </thead>
          <tbody className="cursor-default" >                        
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )  
}