"use client"


import { useState } from "react";
import { title } from "./components/primitives";
import { signIn } from "next-auth/react";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [phoneNo, setPhoneNo] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      studentId,
      phoneNo,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  }

  return (
    <div className="Home flex  justify-center items-center gap-3 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-[10px]">
        <div className="ml-5" >
          <h1 className={title({})}>WELCOME</h1>
        </div>
        <div className="flex flex-col items-center gap-1.5" >
          <p>
            Please Login to access the Student Portal
          </p>
          <p className="text-sm text-gray-500 ml-2">
            Note:If you are a new student head over to the Courses tab and Apply for a Course .<br/>
            Your password is your phone number.<br/>
            Your student ID takes the form of CourseCode/year of admission/registration number.<br/>
            Example: BCS/2025/1.
          </p>
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col items-center" >
              <input type="text" placeholder="Student Id" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="input"/>                            
              <input type="password" placeholder="Password" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="input"/>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                {errorMessage}
              </div>
            )}
            <div className="flex justify-center text-center items-center mt-1">
              <button className="login flex items-center justify-center text-center" type="submit" disabled={loading} >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </main>      
    </div>
  );
}
