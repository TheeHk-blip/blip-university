"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { title } from "../components/primitives";
import { siteConfig } from "../config/site";
import Link from "next/link";

export default function Dashboard() {
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
    return <div className="text-center justify-center" >Loading...</div>;
  }
  if (!session) {   
    return(
      <div className="flex flex-col justify-center items-center">
        <h1 className={title({})} >Dashboard</h1>
        <p className="text-lg font-mono">You are not logged in. Please log in to view your dashboard.</p>
        <Link href="/" className="text-blue-700 text-lg font-mono hover:underline">Login</Link>
        <span className="text-md text-gray-500 font-mono">Note: If you are an Admin use the link below </span>
        <p className="text-md text-gray-500 font-mono">to view the admin dashboard.</p>
        <Link href="/admin/register" className="text-blue-700 text-lg font-mono hover:underline">Admin</Link>        
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={title({})} >Dashboard</h1>
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