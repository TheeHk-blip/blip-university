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

  useEffect(() => {
    const fetchFees = async () => {
      setLoading(true);
      try {
        const studentId = session?.user.studentId;
        
        const response = await fetch(
          process.env.NODE_ENV == "development"
            ? "http://localhost:3000/api/student/fees?studentId=" + studentId
            : "https://blip-university.vercel.app/api/student/fees?studentId=" + studentId,);

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
  },[session?.user.studentId]);

  if (loading) {
    return <div className="text-center w-full">Loading Fees...</div>;
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