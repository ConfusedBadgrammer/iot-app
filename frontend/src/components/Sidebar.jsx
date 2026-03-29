import {
  Cpu,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  Settings,
  ShieldCheck,
  Thermometer,
} from 'lucide-react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="bg-[#121B2F] w-64 text-[#95A2B9] flex flex-col h-screen tracking-wide antialiased">
      <div className="p-6 text-center">
        <span>LOGO</span>
      </div>

      <nav className="pt-10 px-6 flex flex-col items-center">
        <ul className="flex flex-col gap-3">
          <Link to="/">
            <li className="w-64 h-12 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <LayoutDashboard className="mr-2" />
              Dashboard
            </li>
          </Link>
          <Link to="/climate">
            <li className="w-64 h-12 flex items-center px-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <Thermometer className="mr-2" />
              Climate
            </li>
          </Link>
          <Link to="/lighting">
            <li className="w-64 h-12 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <Lightbulb className="mr-2" />
              Lighting
            </li>
          </Link>
          <Link to="/irrigation">
            <li className="w-64 h-12 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <Leaf className="mr-2" />
              Irrigation
            </li>
          </Link>
          <Link to="/security">
            <li className="w-64 h-12 flex items-center pl-6 pr-4 cursor-pointer hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <ShieldCheck className="mr-2" />
              Security
            </li>
          </Link>
        </ul>
      </nav>

      <nav className="pt-10  items-center mt-auto">
        <ul className="flex w-full">
          <Link to="/hardware" className="flex flex-1">
            <li className="h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <Cpu size={16} />
              Hardware
            </li>
          </Link>
          <Link to="/settings" className="flex flex-1">
            <li className="h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 hover:bg-[#1E2A42] hover:text-cyan-300 rounded transition-colors duration-500">
              <Settings size={16} />
              Settings
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
