"use client";
import { usePathname } from "next/navigation";
import {
  Cpu,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  Settings,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import { RiRobot2Line } from "react-icons/ri";

import Link from "next/link";

export default function Sidebar() {
  const currentPath = usePathname();

  const navLink = (href) =>
    `w-60 h-14 flex items-center pl-6 pr-4 cursor-pointer rounded transition-colors duration-500 hover:bg-[#2D3449] hover:text-cyan-300 ${
      currentPath.startsWith(href) ? "bg-[#2D3449] text-cyan-300" : ""
    }`;

  const bottomLink = (href) =>
    `h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 rounded transition-colors duration-500 hover:bg-[#2D3449] hover:text-cyan-300 ${
      currentPath.startsWith(href) ? "bg-[#2D3449] text-cyan-300" : ""
    }`;

  return (
    <div className="bg-[#121B2F] w-60 text-[#95A2B9] flex flex-col h-screen tracking-none antialiased font-body text-[16px] font-medium">
      <div className="pt-6 text-center ">
        <span className="font-headline font-bold tracking-[4px] text-3xl flex flex-col text-accent">
          AMBIENT
          <label className="text-[#94A3B9] text-[10px] font-label tracking-tight">
            SMART HOME SYSTEM
          </label>
        </span>
      </div>

      <nav className="pt-10 px-6 flex flex-col items-center">
        <ul className="flex flex-col">
          <li>
            <Link href="/dashboard" className={navLink("/dashboard")}>
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/climate" className={navLink("/climate")}>
              <Thermometer className="mr-2" />
              Climate
            </Link>
          </li>
          <li>
            <Link href="/lighting" className={navLink("/lighting")}>
              <Lightbulb className="mr-2" />
              Lighting
            </Link>
          </li>
          <li>
            <Link href="/irrigation" className={navLink("/irrigation")}>
              <Leaf className="mr-2" />
              Irrigation
            </Link>
          </li>
          <li>
            <Link href="/security" className={navLink("/security")}>
              <ShieldCheck className="mr-2" />
              Security
            </Link>
          </li>
          <li>
            <Link href="/automation" className={navLink("/automation")}>
              <RiRobot2Line className="mr-2" size={23.5} />
              Automation
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="pt-10 items-center mt-auto">
        <ul className="flex w-full">
          <li className="flex flex-1">
            <Link href="/hardware" className={bottomLink("/hardware")}>
              <Cpu size={16} />
              Hardware
            </Link>
          </li>
          <li className="flex flex-1">
            <Link href="/settings" className={bottomLink("/settings")}>
              <Settings size={16} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
