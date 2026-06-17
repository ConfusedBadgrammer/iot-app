import { useLocation, Link } from 'react-router-dom'
import {
  Cpu,
  LayoutDashboard,
  Leaf,
  Lightbulb,
  Settings,
  ShieldCheck,
  Thermometer,
  Bot,
} from 'lucide-react'

function Sidebar() {
  const { pathname } = useLocation()

  const navLink = (href) =>
    `w-60 h-14 flex items-center pl-6 pr-4 cursor-pointer rounded transition-colors duration-500 hover:bg-[#2D3449] hover:text-cyan-300 ${
      pathname.startsWith(href) ? 'bg-[#2D3449] text-cyan-300' : ''
    }`

  const bottomLink = (href) =>
    `h-12 flex flex-1 justify-center items-center cursor-pointer gap-1 rounded transition-colors duration-500 hover:bg-[#2D3449] hover:text-cyan-300 ${
      pathname.startsWith(href) ? 'bg-[#2D3449] text-cyan-300' : ''
    }`

  return (
    <div className="bg-[#121B2F] w-60 text-[#95A2B9] flex flex-col h-screen tracking-none antialiased font-body text-[16px] font-medium">
      <div className="pt-6 text-center">
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
            <Link to="/dashboard" className={navLink('/dashboard')}>
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/climate" className={navLink('/climate')}>
              <Thermometer className="mr-2" />
              Climate
            </Link>
          </li>
          <li>
            <Link to="/lighting" className={navLink('/lighting')}>
              <Lightbulb className="mr-2" />
              Lighting
            </Link>
          </li>
          <li>
            <Link to="/irrigation" className={navLink('/irrigation')}>
              <Leaf className="mr-2" />
              Irrigation
            </Link>
          </li>
          <li>
            <Link to="/security" className={navLink('/security')}>
              <ShieldCheck className="mr-2" />
              Security
            </Link>
          </li>
          <li>
            <Link to="/automation" className={navLink('/automation')}>
              <Bot className="mr-2" size={23.5} />
              Automation
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="pt-10 items-center mt-auto">
        <ul className="flex w-full">
          <li className="flex flex-1">
            <Link to="/hardware" className={bottomLink('/hardware')}>
              <Cpu size={16} />
              Hardware
            </Link>
          </li>
          <li className="flex flex-1">
            <Link to="/settings" className={bottomLink('/settings')}>
              <Settings size={16} />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
