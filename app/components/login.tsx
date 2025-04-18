"use client"

import { useState } from "react";
import { title } from "./primitives";
import { signIn } from "next-auth/react";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [phoneNo, setPhoneNo] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      userId,
      password: phoneNo,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.href = "/";
    }
    setLoading(false);
  }

  return (
    <div className="Home flex  justify-center items-center gap-3 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-[10px]">
        <div className="text-center" >
          <h1 className={title({})}>WELCOME</h1>
        </div>
        <div className="flex flex-col items-center gap-1.5" >
            <div>
              <p>
                Please Login to access the Student Portal
              </p>
              <p className="text-sm text-gray-500 ml-2">
                Note:<br/>
                If you are a new student head over to the Courses tab and Apply for a Course .<br/>
                Your password is your phone number.<br/>
                Your student ID takes the form of CourseCode/year of admission/registration number.<br/>
                Example: BCS/2025/1.
              </p>          
              <form onSubmit={handleSubmit} >
                <div className="flex flex-col items-center" >
                  <input type="text" placeholder="User Id" value={userId} onChange={(e) => setUserId(e.target.value)} className="elegant-input"/>                            
                  <input type="password" placeholder="Password" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="elegant-input"/>
                </div>
                {errorMessage && (
                  <div className="text-red-500 flex text-center items-center justify-center text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
                <div className="flex justify-center text-center items-center mt-1">   
                 {loading ? (
                    <div className="spinner">
                      <span></span>      
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ):(          
                    <button className="button-login flex items-center justify-center text-center" type="submit" disabled={loading} >                  
                      <span>Login</span>                   
                    </button>
                  )}             
                </div>
              </form>
            </div> 
        </div>
      </main>      
    </div>
  );
}