"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { siteConfig } from "../config/site";
import Link from "next/link";
import { title } from "./primitives";

type Unit = { code: string; title: string };
type CourseUnitBlock = { year: number; semester: number; units: Unit[] };

export default function StudentDashboard() {
  const { data: session } = useSession();

  const [units, setUnits] = useState<CourseUnitBlock[]>([]);
  const [loading, setLoading] = useState(true);

  function getUnitsApiUrl(studentId: string) {
    if (process.env.NODE_ENV === "development") {
      // Use localhost if running locally, otherwise use devtunnel
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return `http://localhost:3000/api/student/units?userId=${studentId}`;
      }
      return `https://4hb0xq12-3000.euw.devtunnels.ms/api/student/units?userId=${studentId}`;
    }
    // Production
    return `https://blip-university.vercel.app/api/student/units?userId=${studentId}`;
  }

  useEffect (() => {   
      const fetchUnits = async () => {
      setLoading(true);
      try {
        const studentId = session?.user.userId;

        if (!studentId) {
          return;
        }

        const response = await fetch(getUnitsApiUrl(studentId));
        if (response.ok) {
          const data = await response.json();  
          /*console.log("Fetched units data:", data);
          console.log("Course Code:", data.courseCode);
          console.log("Course Units:", data.courseUnits);*/     
          setUnits(Array.isArray(data.courseUnits) ? data.courseUnits : []);
        } else {
          const errorData = await response.json();
          console.error("Error fetching units:", errorData.error);
          setUnits([]);
        }
      }  catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  },[session?.user.userId]);
    
  if (loading) {
    return (
      <div className="flex justify-center items-center" >
        <div className="loader">
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
          <div className="circle">
            <div className="dot"></div>
            <div className="outline"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={title()}>Student Dashboard</h1>
      <div className="flex flex-row items-center mt-1.5" >
        {siteConfig.dashboardLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-blue-500 hover:underline mx-1 gap-5 font-semibold"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        {Array.isArray(units) && units.length === 0 ? (
          <p>No units found.</p>
        ) : (          
          units.map((block, idx) => (
            <div key={idx} className="mb-4 units_card">
              <h3 className="font-semibold rounded-xl shadow bg-gray-300 p-2">
                Year {block.year} - Semester {block.semester}                
              </h3>
              <ul className="list-disc ml-6">
                {block.units.map((unit, i) => (
                  <li key={i}>
                    <span className="font-mono">{unit.code}</span>: {unit.title}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
