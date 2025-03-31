"use client"

import { useState } from "react";

export default function Register() {
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalId, setNationalId] = useState(0);
    const [phoneNo, setPhoneNo] = useState(0);
    const [emailAddress, setEmailAddress] = useState("");
    const [meanGrade, setMeanGrade] = useState("");

  
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try{
        const formData = new FormData(event.target as HTMLFormElement);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("nationalId", `${nationalId}`);
        formData.append("phoneNo", `${phoneNo}`);
        formData.append("emailAddress", emailAddress);
        formData.append("meanGrade", meanGrade);
        const response = await fetch("http://localhost:3000/api/student/register",{
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        return data;
      } catch (error){
        console.log("Error applying for course", error);
      }
    }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} >
      <div className="flex flex-row gap-2" >
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input"/> 
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input"/>
      </div>  
      <div className="flex flex-row gap-2" >
        <input type="number" placeholder="National Id" value={nationalId} onChange={(e) => setNationalId(parseInt(e.target.value))} className="input"/>
        <input type="number" placeholder="Phone No" value={phoneNo} onChange={(e) => setPhoneNo(parseInt(e.target.value))} className="input"/>
      </div>                        
      <div className="flex flex-row gap-2" >
        <input type="email" placeholder="Email Address" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} className="input"/>
        <input type="text" placeholder="KCSE mean grade" value={meanGrade} onChange={(e) => setMeanGrade(e.target.value)} className="input"/>
      </div>       
      <div className="flex justify-center mt-1" >
        <button className="login text-center" type="submit">Apply</button>
      </div>                             
    </form>
  )
}