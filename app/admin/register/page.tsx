"use client";

import { title } from "@/app/components/primitives";
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";
import { useState } from "react";


export default function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: firstname +" "+ lastname,
        email,
        password,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      setAlertMessage(data.error || "Something went wrong. Please try again.");
      setAlertSeverity("error");
      setAlertOpen(true);
    } else {
      setAlertMessage("Admin registered successfully!");
      setAlertSeverity("success");
      setAlertOpen(true);
      window.location.href = "/admin/login";
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center" >
      <span className={title({})} >Admin Registration</span>
      <div>
        <form className="flex flex-col mt-5" onSubmit={handleSubmit} >
              <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
                <input type="text" placeholder="First Name" value={firstname} required onChange={(e) => setFirstName(e.target.value)} className="elegant-input"/>
                <input type="text" placeholder="Last Name" value={lastname} required onChange={(e) => setLastName(e.target.value)} className="elegant-input"/>                
              </div>                                    
              <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
                <input type="email" placeholder="Email Address" value={email} required onChange={(e) => setEmail(e.target.value)} className="elegant-input"/>
                <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} className="elegant-input"/>
              </div>  
              {loading ? (
              <div className="flex justify-center mt-1" >
                <button className="login spinner text-center border-blue-800" type="submit" disabled>
                  <span></span>      
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>  
              ):(
              <div className="flex flex-col items-center justify-center mt-1" >
                <div>
                  <button className="elegant-button text-center" type="submit">Register</button>               
                </div>    
                <span className="text-md text-gray-500 font-mono">Already have an account?</span>
               <Link href="/admin/login" className="elegant-link  ">Login</Link>
              </div>
              )}                                  
            </form>
        
            <Snackbar
              open={alertOpen}
              autoHideDuration={20000}
              onClose={handleAlertClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%" }}>
                {alertMessage}
              </Alert>
            </Snackbar>
      </div>
    </div>
  )
}