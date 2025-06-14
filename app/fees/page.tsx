"use client"

import { useEffect, useState } from "react";
import { title } from "../components/primitives";
import { useSession } from "next-auth/react";

export default function Fees() {
  const { data: session } = useSession();
  const [fees, setFees] = useState<string | number>("");
  const [courseTitle, setCourseTitle] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getUnitsApiUrl(studentId: string) {
    if (process.env.NODE_ENV === "development") {
      // Use localhost if running locally, otherwise use devtunnel
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return `http://localhost:3000/api/student/fees?userId=${studentId}`;
      }
      return `https://4hb0xq12-3000.euw.devtunnels.ms/api/student/fees?userId=${studentId}`;
    }
    // Production
    return `https://blip-university.vercel.app/api/student/fees?userId=${studentId}`;
  }

  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      try {
        const studentId = session?.user.userId;
        
        const response = await fetch(getUnitsApiUrl(studentId || ""));
            if (response.ok) {
              const data = await response.json();
              setFees(data.courseFee);
              setCourseTitle(data.courseTitle);
            } else {
              const errorData = await response.json();
              setError(errorData.error || "Failed to fetch fees");
            }
      } catch (error) {
        console.error("Error fetching fees:", error);
        setError("Failed to fetch fees");
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  },[session?.user.userId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center" >
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
        <span>Computing fees</span>
      </div>
    )
  }

  if (error) {
    return <div className="text-center w-full">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={title({})}>Fees</h1>
      <div className="flex flex-col ml-1.5 items-center justify-center">
        <span>
          Fee payable this semester for <strong>{courseTitle}</strong> is: <strong>{fees}</strong>
        </span>        
        <div>
        </div>
      </div>
    </div>
  );
}