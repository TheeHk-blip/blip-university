"use client"
import { useSession } from "next-auth/react";
import { title } from "../components/primitives";
import { siteConfig } from "../config/site";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    window.location.href = "/";
    return null; // Prevent rendering the dashboard if not authenticated
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className={title({})} >Dashboard</h1>
      <div>
        <nav className="dashboard flex m-1 h-20 items-center flex-row gap-3 justify-between">
          {siteConfig.dashboardLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex hover:underline text-blue-700 text-lg font-mono" >{link.label}</Link>
          ))}
        </nav>      
      </div>
      <div className="mt-4">
        <p>Your courses will be displayed here.</p>
      </div>
    </div>
  );
}