"use client"
import '@/app/globals.css';
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
              <p className="text-sm text-gray-500 ml-2">
                Note:<br/>
                If you are a new student head over to the Courses tab and Apply for a Course .<br/>                
                Your student ID takes the form of CourseCode/year of admission/registration number.<br/>
                Example: BCS/2025/1.
              </p>          
              <form onSubmit={handleSubmit} className='card' >
                <div className="flex flex-col" >   
                  <p className="text-[20px] m-1 text-center text-gray-500 font-semibold" >Login to Continue</p>   
                  <div className="flex flex-col justify-center" >  
                    <label htmlFor="userId" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">User ID</label>          
                    <input id="userId" type="text"  placeholder="BCS/2025/1" value={userId} onChange={(e) => setUserId(e.target.value)} className="input self-center"/>    
                  </div>                        
                  <div className="flex flex-col justify-center" >
                    <label htmlFor="phoneNo" className="text-left ml-3.5 text-sm font-medium text-gray-600 mb-0.5">Password</label>
                    <input id='phoneNo' type="password" placeholder="********" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="input self-center"/>
                  </div>
                  
                </div>
                {errorMessage && (
                  <div className="text-red-500 flex text-center items-center justify-center text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
                <div className="flex justify-center text-center items-center mt-1">   
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
                    <div className="circle">
                      <div className="dot"></div>
                      <div className="outline"></div>
                    </div>
                  </div>
                  ):(          
                    <button className="button-login flex items-center justify-center text-center" type="submit" disabled={loading} >                  
                      <span>LogIn</span>                   
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