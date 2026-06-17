import Sidebar from './components/Sidebar'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Climate from './pages/Climate'
import Lighting from './pages/Lighting'
import Irrigation from './pages/Irrigation'
import Security from './pages/Security'
import Hardware from './pages/Hardware'
import SettingsPage from './pages/SettingsPage'

const router = createBrowserRouter([
  {
    element: (
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    ),
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/climate', element: <Climate /> },
      { path: '/lighting', element: <Lighting /> },
      { path: '/irrigation', element: <Irrigation /> },
      { path: '/security', element: <Security /> },
      { path: '/automation', element: <div><h1 className="font-bold text-5xl font-headline">Automation</h1></div> },
      { path: '/hardware', element: <Hardware /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
