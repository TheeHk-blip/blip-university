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
      window.location.href = "/";
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center" >
      <span className={title({})} >Admin Registration</span>
      <div>
        <form className="card flex flex-col mt-5" onSubmit={handleSubmit} >
          <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
            <div className="flex flex-col justify-center" >              
              <label htmlFor="firstname" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">User ID</label>          
              <input id="firstname" type="text"  placeholder="John" value={firstname} onChange={(e) => setFirstName(e.target.value)} className="input self-center"/>                      
            </div>
            <div className="flex flex-col justify-center" >
              <label htmlFor="lastname" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Last Name</label>
              <input id="lastname" type="text" placeholder="Doe" value={lastname} onChange={(e) => setLastName(e.target.value)} className="input self-center"/>
            </div>               
          </div>                                    
          <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
            <div className="flex flex-col justify-center" >
              <label htmlFor="email" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Email</label>
              <input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input self-center "/>
            </div>
            <div className="flex flex-col justify-center" >
              <label htmlFor="password" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Password</label>
              <input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="input self-center"/>
            </div>
          </div>  
            {loading ? (
            <div className="flex justify-center mt-1" > 
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
            ):(
            <div className="flex flex-col items-center justify-center mt-1" >
              <div className="mb-2" >
                <button className="elegant-button text-center" type="submit">Register</button>               
              </div>    
              <span className="text-md text-gray-500 font-mono">Delete your account?</span>
              <Link href="/admin/deleteAccount" className="elegant-link mb-2 ">Delete</Link>
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