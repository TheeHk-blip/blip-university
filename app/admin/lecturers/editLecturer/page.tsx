"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Lecture {
  _id: string;
  name: string;
  email: string;
  course: string;
}

export default function EditLecturerForm({ lecturer}: { lecturer: Lecture}) {
  const [name, setName] = useState(lecturer.name);
  const [email, setEmail] = useState(lecturer.email); 
  const [course, setCourse] = useState(lecturer.course);
  const [message, setMessage] = useState("");
  
  const router = useRouter();

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(process.env.NODE_ENV == "production" 
        ? `http://localhost:3000/api/admin/lecturer/${lecturer._id}`
        : `https://blip-university.vercel.app/api/addmin/leturer/${lecturer._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify ({
          name: name.toString(),
          email: email.toString(),
          course: course.toString(),
        })                                  
      });

      if (response.ok) {
        setMessage("Lecturer updated successfully");
        setTimeout(() => {
          router.push("/admin/lecturers");
        }, 2000)        
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to update lecturer");
      }
    } catch (error) {
      console.error("Error updating lecturer:", error);
      setMessage("Failed to update lecturer");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center" >
      <form onSubmit={handleUpdate} className="flex flex-col items-center" >
        <div className=" flex flex-row" >
          <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} className="elegant-input" required /> 
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="elegant-input" required />
        </div>     
        <div>           
          <textarea  placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} className="text-area" required />
        </div>   
        <div>
          <button type="submit" className="elegant-button">Submit</button>
        </div> 
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}