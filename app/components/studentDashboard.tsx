"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { siteConfig } from "../config/site";
import Link from "next/link";

export default function StudentDashboard() {
  const { data: session } = useSession();

  const [units, setUnits] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect (() => {   
      const fetchUnits = async () => {
      setLoading(true);
      try {
        const studentId = session?.user.userId;

        if (!studentId) {
          return;
        }

        const response = await fetch(
          process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api/student/units?userId=" + studentId
          : "https://blip-university.vercel.app/api/student/units?userId=" + studentId,
        )
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
        <div className="spinner justify-center" >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <nav className="dashboard flex m-1 h-20 items-center flex-row gap-3 justify-between">
          {siteConfig.dashboardLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex hover:underline text-blue-700 text-lg font-mono" >{link.label}</Link>
          ))}
        </nav>      
      </div>
      <div className="mt-4">
        {Array.isArray(units) ? (
          units.length > 0 ? (
            <ul className="list-disc list-inside">
              {units.map((unit, index) => (
                <li key={index} className="text-md font-mono">{unit}</li>
              ))}
            </ul>
          ) : (
            <p className="text-lg font-mono">No units found.</p>
          )
        ): typeof units === "string" ? (
          units.split("\n").map((line, index) => 
            <p key={index} className="text-lg font-mono">{line}</p>)
        ): (
          <p>No units found</p>
        )}        
      </div>
    </div>
  );
}