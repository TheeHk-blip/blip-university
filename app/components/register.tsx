"use client"

import { useState } from "react";
import {Alert, Snackbar} from "@mui/material";
import { useRouter } from "next/navigation";

interface RegisterProps {
  courseTitle: string;
  minRequirements: string;
}

export default function Register({ minRequirements, courseTitle }: RegisterProps) {
  console.log("minRequirements", minRequirements);
    const router = useRouter();
    
    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nationalId, setNationalId] = useState<number | string>("");
    const [phoneNo, setPhoneNo] = useState<number | string>("");
    const [emailAddress, setEmailAddress] = useState("");
    const [meanGrade, setMeanGrade] = useState("");
    const [loading, setLoading] = useState(false);

    //Snackbar state for success and error messages
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

    const handleAlertClose = () => {
      setAlertOpen(false);
    };

    //Grade mapping for comparison
    const gradeMapping: { [key: string]: number } = {
      "A": 12,
      "A-": 11,
      "B+": 10,
      "B": 9,
      "B-": 8,
      "C+": 7,
      "C": 6,
      "C-": 5,
      "D+": 4,
      "D": 3,
      "D-": 2,
      "E": 1,
    };
  
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      

      //Check if user's meanGrade meets the minimum requirements for the course
      const userGrade = gradeMapping[meanGrade.toUpperCase()] || 0;
      const minGrade = gradeMapping[minRequirements.toUpperCase()] || 0;

      if (userGrade < minGrade) {
        setAlertMessage(`Your mean grade of ${meanGrade} does not meet the minimum requirement of ${minRequirements} for this course.`);
        setAlertSeverity("error");
        setAlertOpen(true);
        return;
      }
      setLoading(true);  
      try{
        const formData = new FormData(event.target as HTMLFormElement);        
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("nationalId", `${nationalId}`);
        formData.append("phoneNo", `${phoneNo}`);
        formData.append("emailAddress", emailAddress);
        formData.append("meanGrade", meanGrade);
        const response = await fetch(process.env.NODE_ENV == "production" ? `https://blip-university.vercel.app/api/student/register?courseTitle=${courseTitle}`:`http://localhost:3000/api/student/register?courseTitle=${courseTitle}`,{
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setAlertMessage("Application Successful! Your student ID is: " + data.studentId);
          setAlertSeverity("success");
          setAlertOpen(true);      

          // Redirect to home page
          setTimeout(() => {
            router.push("/");
          }, 20000); // Redirect after 20 seconds          
          
          return data;          
        } else {
          setAlertMessage("Application Failed. Please try again.");
          setAlertSeverity("error");
          setAlertOpen(true);
        }                
      } catch (error){
        setAlertMessage("An error occurred. Please try again.");
        setAlertSeverity("error");
        setAlertOpen(true);
        console.log("Error applying for course", error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
    <form className="flex flex-col" onSubmit={handleSubmit} >
      <div className="flex flex-row gap-2" >
        <input type="text" placeholder="First Name" value={firstName} required onChange={(e) => setFirstName(e.target.value)} className="elegant-input"/> 
        <input type="text" placeholder="Last Name" value={lastName} required onChange={(e) => setLastName(e.target.value)} className="elegant-input"/>
      </div>  
      <div className="flex flex-row gap-2" >
        <input type="number" placeholder="National Id" value={nationalId} required onChange={(e) => setNationalId(e.target.value)} className="elegant-input"/>
        <input type="number" placeholder="Phone No" value={phoneNo} required onChange={(e) => setPhoneNo(e.target.value)} className="elegant-input"/>
      </div>                        
      <div className="flex flex-row gap-2" >
        <input type="email" placeholder="Email Address" value={emailAddress} required onChange={(e) => setEmailAddress(e.target.value)} className="elegant-input"/>
        <input type="text" placeholder="KCSE mean grade" value={meanGrade} required onChange={(e) => setMeanGrade(e.target.value)} className="elegant-input"/>
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
      <div className="flex justify-center mt-1" >
        <button className="elegant-button text-center" type="submit">Apply</button>
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
  )
}