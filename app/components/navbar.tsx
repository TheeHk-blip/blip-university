"use client"
import Image from "next/image";
import { siteConfig } from "../config/site";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@mui/material";

export  function Navbar() {
  const { data: session } = useSession();

  return(
    <nav className="navbar flex h-20 items-center flex-row justify-between">
      <span className="gap-2 justify-start" >
        <Image
          alt={""}
          src={"/logo.png"}
          width={45}
          height={45}
          className="ml-5"
        />        
        <span className="text-sm font-bold hidden sm:inline">{siteConfig.name}</span>
      </span>
      <ul className="flex flex-row gap-3 justify-center">
        {siteConfig.navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline text-blue-700 text-lg font-mono">{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end" >
        { session ? (     
          <div>            
            <Avatar className="mr-1" sx={{ width: 30, height: 30 }} />
            <div className="flex flex-col">
              <span className="text-sm font-light" >
                {session.user.name}  
              </span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer border-2 border-red-700  hover:bg-red-700 text-sm font-mono rounded-2xl" >
                SignOut
              </button>
            </div>
          </div>    
        ):(
          <Link href={"/"} className="flex items-center hover:underline text-blue-700 text-lg font-mono" >
            <Avatar className="mr-1" />
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}