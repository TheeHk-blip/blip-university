"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LectureForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [message, setMessage ] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.NODE_ENV == "production" 
        ? "https://blip-university.vercel.app/api/admin/lecturer"
        : "http://localhost:3000/api/admin/lecturer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, course }),
      });

      if (response.ok) {
        setMessage("Lecturer added successfully");
        setName("");
        setEmail("");
        setPassword("");
        setCourse("");

        setTimeout(() => {
          router.push("/admin/lecturers")
        }, 2000)
      } else {
        setMessage("Failed to add lecturer");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred");
    }
  };
  
  return(
    <div className="flex">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center" >
          <div>            
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="elegant-input" required />
          </div>
          <div>          
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="elegant-input" required />
          </div>
          <div>            
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="elegant-input" required />
          </div>
          <div>           
            <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} className="elegant-input" required />
          </div>    
          <div>
            <button type="submit" className="elegant-button">Submit</button>
          </div>            
        </div>        
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}