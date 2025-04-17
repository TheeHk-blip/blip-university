"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { title } from "@/app/components/primitives";

export default function Login() {
  const [adminId, setadminId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      redirect: false,
      userId:adminId,
      password,
    });

    if (result?.error) {
      setErrorMessage(result.error);
    } else {
      window.location.href = "/admin";
    }
    setLoading(false);
  };

  return(
    <div className="flex flex-col items-center" >
      <span className={title({})}>Administrator</span>
      <div className="flex items-center justify-center mt-5" >
        <form onSubmit={handleSubmit} >
          <div className="flex flex-col items-center" >
            <input type="text" placeholder="Administrator Id" value={adminId} onChange={(e) => setadminId(e.target.value)} className="elegant-input"/>                            
            <input type="password" placeholder="Administrator Password" value={password} onChange={(e) => setPassword(e.target.value)} className="elegant-input"/>
          </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
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
                  <span className="text-center">Login</span>        
                </button>
              )}              
            </div>
        </form>
      </div>
    </div>
  )
}