"use client"
import Image from "next/image";
import { siteConfig } from "../config/site";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";

export  function Navbar() {
  const { data: session } = useSession();
  console.log("session data:", session);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Function to get initials from the user's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  return(
    <nav className="navbar flex h-20 p-1 items-center flex-row justify-evenly sm:justify-between">
      <span className="navbrand gap-2 justify-start" >
        <Image
          alt={""}
          src={"/logo.png"}
          width={45}
          height={45}
          className="ml-5"
        />        
        <span className="text-sm font-bold hidden sm:inline">{siteConfig.name}</span>
      </span>
      <ul className="flex flex-row gap-1.5 sm:gap-3 items-center justify-center">
        {siteConfig.navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:underline text-blue-700 text-lg font-mono">{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-end" >
        { session ? (     
          <div>             
            <Avatar 
              className="mr-1 cursor-pointer " 
              sx={{ width: 35, height: 35, color: "white", backgroundColor: "green" }} 
              onClick={handleClick} ref={anchorRef}               
            >
              {getInitials(session.user.name || "User")}
            </Avatar>
            <Menu 
              open={open} 
              onClose={handleClose} 
              anchorEl={anchorRef.current} 
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "black",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "inset 0px 0px .8px 0px white"
                }
              }}
            >
              <MenuItem onClick={handleClose} >My Account</MenuItem>
              <MenuItem onClick={handleClose}>
                {session.user.role !== "admin" ? (
                  <Link href="/admin/register" className="hover:underline text-blue-700 text-lg font-mono" aria-disabled >
                    Admin
                  </Link>
                ):(
                  <Link href="/admin/register" className="hover:underline text-blue-700 text-lg font-mono" >
                    Admin
                  </Link>
                )}                
              </MenuItem>
              <MenuItem onClick={handleClose} >
                <button onClick={() => signOut({ callbackUrl: "/" })} className="button-logout" >
                  SignOut
                </button>
              </MenuItem>
            </Menu>
            <div className="flex flex-col">
              <span className="text-sm font-light mt-0.5" >
                {session.user.name}
              </span>              
            </div>
          </div>    
        ):(
          <div>          
            <Avatar className="mr-1" />
            <Menu 
              open={open} 
              onClose={handleClose} 
              anchorEl={anchorRef.current} 
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "black",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  boxShadow: "inset 0px 0px .8px 0px white"
                }
              }}
            >
              <MenuItem onClick={handleClose} >My Account</MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/admin/register" className="hover:underline text-blue-700 text-lg font-mono" >
                  Admin
                </Link>               
              </MenuItem>
              <MenuItem onClick={handleClose} >
                <button onClick={() => signOut({ callbackUrl: "/" })} className="button-logout" >
                  SignOut
                </button>
              </MenuItem>
            </Menu>
          </div>         
        )}
      </div>
    </nav>
  )
}