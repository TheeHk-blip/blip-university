"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { siteConfig } from "../config/site";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: session } = useSession();

  const [units, setUnits] = useState("");
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
          setUnits(data.courseUnits);
        } else {
          const errorData = await response.json();
          console.error("Error fetching units:", errorData.error);
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
    <div className="flex flex-col justify-center items-center">
      <div>
        <nav className="dashboard rounded-md bg-gray-200 p-1 flex m-1 h-auto items-center flex-row gap-3 justify-between">
          {siteConfig.dashboardLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex hover:underline text-blue-700 text-lg font-mono" >{link.label}</Link>
          ))}
        </nav>      
      </div>
      <div className="mt-4">
        {formatCourseUnits(units)}      
      </div>
    </div>
  );
}

function formatCourseUnits(raw: string) {
  if(!raw) return <div>No course units found.</div>;

  const lines = raw.split('\n').map( line => line.trim()).filter(Boolean);

  const result: Record<string, Record<string, string[]>> ={};

  let currentYear = "";
  let currentSemester = "";

  for (const line of lines) {
    const yearSemesterMatch = line.match(/YEAR\s+(\d+)\s+SEMESTER\s+(\d+)/i);
    const isUnitLine = /^[A-Z]{2,4}\s?\d{3}\s+.+/.test(line);

    if (yearSemesterMatch) {
      const year = `Year ${yearSemesterMatch[1]}`;
      const semester = `Semester ${yearSemesterMatch[2]}`;
      currentYear = year;
      currentSemester = semester;

      if (!result[year]) result[year] = {};
      if (!result[year][semester]) result[year][semester] = [];
    } else if (isUnitLine && currentYear && currentSemester) {
      result [currentYear][currentSemester].push(line);
    }
  }

  return (
    <div className="flex flex-col sm:[flex-row flex-wrap grid-rows-2 max-w-[320px]] ">
      {Object.entries(result).map(([year, semesters]) => (
        <div key={year} className="units_card" >
          <h3 className="font-semibold" >{year.toUpperCase()}</h3>
          {Object.entries(semesters).map(([semester, units]) => (
            <div key={semester}>
              <h4 className="font-medium text-gray-600 max-w-fit m-1 rounded-lg p-1 bg-gray-300" >{semester}</h4>
              <ul>
                {units.map((unit, index) => (
                  <li key={index} className="text-sm" >{unit.toUpperCase()}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  )


}