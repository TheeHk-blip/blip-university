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

    function getApiUrl() {
    if (process.env.NODE_ENV === "development") {
      // Use localhost if running locally, otherwise use devtunnel
      if (typeof window !== "undefined" && window.location.hostname === "localhost") {
        return "http://localhost:3000/api/student/register?courseTitle=" + courseTitle;
      }
      return "https://4hb0xq12-3000.euw.devtunnels.ms/api/student/register?courseTitle=" + courseTitle;
    }
    // Production
    return `https://blip-university.vercel.app/api/student/register?courseTitle=${courseTitle}`;
  }

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
        const response = await fetch( getApiUrl() ,{
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setAlertMessage("Application Successful! Your student ID is: " + data.studentId + ". Your Password is your Phone No. Please save it somewhere safe. You will be redirected to the home page in 20 seconds.");                    
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
    <form className="flex flex-col card" onSubmit={handleSubmit} >
      <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
        <div className="flex flex-col justify-center" >  
          <label htmlFor="firstName" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">First Name</label>          
          <input id="firstName" type="text"  placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input self-center"/>    
        </div>
        <div className="flex flex-col justify-center" >  
          <label htmlFor="lastName" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Last Name</label>          
          <input id="lastName" type="text"  placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input self-center"/>    
        </div>
      </div>  
      <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
        <div className="flex flex-col justify-center" >  
          <label htmlFor="nationalId" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">National ID</label>          
          <input id="nationalId" type="number" placeholder="1234567890" value={nationalId} required onChange={(e) => setNationalId(e.target.value)} className="input self-center"/>    
        </div>
        <div className="flex flex-col justify-center" >  
          <label htmlFor="phoneNo" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Phone No</label>          
          <input id="phoneNo" type="number" placeholder="2547********" value={phoneNo} required onChange={(e) => setPhoneNo(e.target.value)} className="input self-center"/>    
        </div>
      </div>                        
      <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-2" >
        <div className="flex flex-col justify-center" >  
          <label htmlFor="emailAddress" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Email Address</label>          
          <input id="emailAddress" type="email" placeholder="you@example.com" value={emailAddress} required onChange={(e) => setEmailAddress(e.target.value)} className="input self-center"/>    
        </div>
        <div className="flex flex-col justify-center" >  
          <label htmlFor="meanGrade" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Mean Grade</label>          
          <input id="meanGrade" type="text" placeholder="B+" value={meanGrade} required onChange={(e) => setMeanGrade(e.target.value)} className="input self-center"/>    
        </div>
      </div>  
      {loading ? (       
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