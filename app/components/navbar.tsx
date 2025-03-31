import Image from "next/image";
import { siteConfig } from "../config/site";
import Link from "next/link";
import { AccountCircle } from "@mui/icons-material";

export  function Navbar() {

  return(
    <nav className="navbar flex m-1 h-20 items-center flex-row justify-between">
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
        <AccountCircle />
      </div>
    </nav>
  )
}