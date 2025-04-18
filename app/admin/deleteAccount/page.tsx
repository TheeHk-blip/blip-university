"use client"
import { title } from "@/app/components/primitives";
import { DeleteForever } from "@mui/icons-material";
import { Checkbox, FormControlLabel } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useState } from "react";
import {useRouter} from "next/navigation"

export default function DeleteAccount() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try{
      const response = await fetch("/api/admin/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ adminId, password}),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Failed to delete Account");
      } else {
        setSuccessMessage("Account deleted successfully");
        
        setTimeout(() => {
          router.push("/")
        }, 3000)
      }

    } catch (error) {
      console.error("An unexpected error occurred:", error)
      setErrorMessage("An unexpected error occurred")

    }
  };

  return (
    <div className="flex flex-col justify-center items-center" >
      <div className="text-center" >
        <span className={title({})} >Delete Account</span>
      </div>
      <div className="card" >        
        <div className="card-body" >
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center" >
            <input type="text" placeholder="adminId" value={adminId} onChange={(e) => setAdminId(e.target.value)} className="elegant-input" />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="elegant-input" />    
            <FormControlLabel required control={<Checkbox sx={{color: green[800], '&.Mui-checked': { color: red[600] }}} />} label="Action cannot be undone" />  
            <button className="btn-53 flex justify-center items-center mb-2">     
              <DeleteForever />   
              <div className="original flex justify-center items-center">                
                <p>DELETE</p>
              </div>
              <div className="letters">                
                <span>D</span>
                <span>E</span>
                <span>L</span>
                <span>E</span>
                <span>T</span>
                <span>E</span>
              </div>
            </button>                      
          </form>
          <div className="flex justify-center items-center" >
            {errorMessage && (
              <p className="text-red-600 mt-2" >{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-600 mt-2" >{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}