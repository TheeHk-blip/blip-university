"use client"
import Image from "next/image";
import { siteConfig } from "../config/site";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export  function Navbar() {
  const { data: session } = useSession();
  console.log("session data:", session);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const pathname = usePathname();

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
    <nav className="navbar">    
      <div className="navbrand">
        <Image
          alt={""}
          src={"/logo.png"}
          width={35}
          height={35}          
        />        
        <span className="text-sm font-bold hidden sm:inline">{siteConfig.name}</span>
      </div>
      <div className="flex flex-row items-center links" >    
        {siteConfig.navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "link_text p-1 sm:p-2.5",
                isActive
                  ? "text-lg  bg-blue-400 text-black"
                  : "text-md text-gray-700 hover:bg-gray-200"
              )}
            >
              {link.label}
            </Link>
          )
        })}  
      </div>
      <div className="flex items-center mr-0.5">
        { session ? (     
          <div>             
            <Avatar 
              className="cursor-pointer " 
              sx={{ width: 30, height: 30, color: "white", backgroundColor: "green" }} 
              onClick={handleClick} ref={anchorRef}               
            >
              <span className="text-sm font-semibold">{getInitials(session.user.name || "User")}</span>
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
                  <span className=" text-gray-700 text-lg font-mono cursor-not-allowed ">
                    Admin
                  </span>
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
              <span className="text-[10px] sm:text-[14px] font-medium mr-1" >
                {session.user.name}
              </span>              
            </div>
          </div>    
        ):(
          <div>           
            <Avatar className="cursor-pointer" onClick={handleClick} ref={anchorRef} />
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
                <span className=" text-gray-700 text-lg font-mono cursor-not-allowed " >
                  Admin
                </span>               
              </MenuItem>            
            </Menu>
          </div>         
        )}
      </div>      
    </nav>
  )
}