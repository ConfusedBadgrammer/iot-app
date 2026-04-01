import {
  Cpu,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  Settings,
  ShieldCheck,
  Thermometer,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="bg-[#121B2F] w-64 text-[#95A2B9] flex flex-col h-screen tracking-none antialiased font-body text-[16px] font-medium">
      <div className="p-6 text-center">
        <span>LOGO</span>
      </div>

      <nav className="pt-10 px-6 flex flex-col items-center">
        <ul className="flex flex-col">
          <li>
            <Link
              href="/dashboard"
              className="w-64 h-14 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/climate"
              className="w-64 h-14 flex items-center px-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <Thermometer className="mr-2" />
              Climate
            </Link>
          </li>
          <li>
            <Link
              href="/lighting"
              className="w-64 h-14 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <Lightbulb className="mr-2" />
              Lighting
            </Link>
          </li>
          <li>
            <Link
              href="/irrigation"
              className="w-64 h-14 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <Leaf className="mr-2" />
              Irrigation
            </Link>
          </li>
          <li>
            <Link
              href="/security"
              className="w-64 h-14 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <ShieldCheck className="mr-2" />
              Security
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="pt-10 items-center mt-auto">
        <ul className="flex w-full">
          <li className="flex flex-1">
            <Link
              href="/hardware"
              className="h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <Cpu size={16} />
              Hardware
            </Link>
          </li>
          <li className="flex flex-1">
            <Link
              href="/settings"
              className="h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500"
            >
              <Settings size={16} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
