"use client"


import { title } from "./components/primitives";

export default function Home() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className="items-center justify-items-center min-h-screen  gap-3 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[10px]">
        <div className="ml-5" >
          <h1 className={title({})}>WELCOME</h1>
        </div>
        <div className="flex flex-col gap-1.5" >
          <p>
            Please Login to access the Student Portal
          </p>
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col" >
              <input type="text" placeholder="Student Id" className="input"/>                            
              <input type="password" placeholder="Password" className="input"/>
            </div>
            <div className="flex justify-center items-center mt-1">
              <button className="login text-center">Login</button>
            </div>
          </form>
        </div>
      </main>      
    </div>
  );
}
