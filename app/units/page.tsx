"use client";
import { useEffect, useState } from "react";
import { title } from "../components/primitives";
import { Alert, Snackbar } from "@mui/material";

type Unit = { code: string; title: string };
type CourseUnitBlock = { year: number; semester: number; units: Unit[] };

export default function UnitRegistration() {
  const [courseUnits, setCourseUnits] = useState<CourseUnitBlock[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [registeredUnits, setRegisteredUnits] = useState<string[]>([]);

  //Snackbar state for success and error messages
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  // Function to close the Snackbar
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // Fetch courseUnits from your API
  useEffect(() => {
    async function fetchUnits() {
      const res = await fetch("/api/student/units");
      const data = await res.json();
      setCourseUnits(data.courseUnits || []);
      // Optionally, fetch registered units for the student here as well
      setRegisteredUnits(data.registeredUnits || []);
    }
    fetchUnits();
  }, []);

  // Handle checkbox change
  function handleCheckboxChange(code: string) {
    setSelectedUnits((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }

  // Handle registration submit
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    // Send selectedUnits to your backend to save for the student
    const res = await fetch("/api/student/units/register-units", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ units: selectedUnits }),
    });
    if (res.ok) {               
      setAlertMessage("Units registered successfully!");
      setAlertSeverity("success");      
    } else {
      setAlertMessage("Failed to register units.");
      setAlertSeverity("error");
    }
  }

  // Fetch registered units
  useEffect(() => {
    async function fetchRegisteredUnits() {
      const response = await fetch("/api/student/units/register-units");
      const data = await response.json();
      console.log("Registered units from API:", data.registeredUnits);    
    }
    fetchRegisteredUnits();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={title()}>Unit Registration</h1>
      <div className="flex flex-col">
        <div className="units_card">
          <h1 className="font-semibold p-1.5 rounded-xl bg-gray-200">Confirmed Units</h1>
          {courseUnits.length === 0 ? (
            <div className="flex flex-col mt-2.5 justify-center items-center" >
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
              <span>Loading units...</span>
            </div>
          ) : registeredUnits.length === 0 ? (
            <div className="flex justify-center items-center">
              <span>No registered units found.</span>
            </div>
          ): (
            registeredUnits.map(( code ) => {
              const unit = courseUnits
                .flatMap(( block ) => block.units)
                .find(( u ) => u.code === code);
              return unit ? (
                <li key={unit.code}>
                  <span className="font-mono">{unit.code}</span>: {unit.title}  
                </li>
              ) : (                
                <span className="font-mono"> Not Found  </span>            
              );
            })
          )}
        </div>
        <div className="units_card">
          <h1 className="font-semibold p-1.5 rounded-xl bg-gray-200">Register Units</h1>
          <form className="flex flex-col" onSubmit={handleRegister}>
            {courseUnits.map((block) => (
              <div key={`${block.year}-${block.semester}`}>
                <h3>
                  Year {block.year} - Semester {block.semester}
                </h3>
                <ul>
                  {block.units.map((unit) => (
                    <li key={unit.code}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedUnits.includes(unit.code)}
                          onChange={() => handleCheckboxChange(unit.code)}
                        />
                        <span className="font-mono">{unit.code}</span>: {unit.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              className="rounded-2xl cursor-pointer mt-1 shadow-md w-30 p-1.5 bg-green-600"
              type="submit"
            >
              Register
            </button>
          </form>
          <Snackbar
            open={alertOpen}
            autoHideDuration={2000}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "top", horizontal: "center"}}
          >
            <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: "100%"}}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}