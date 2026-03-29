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
      <div className="flex">
        <Sidebar />
        <main className=" p-6 text-white">
          <Outlet />
        </main>
      </div>
    ),
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/climate', element: <Climate /> },
      { path: '/lighting', element: <Lighting /> },
      { path: '/irrigation', element: <Irrigation /> },
      { path: '/security', element: <Security /> },
      { path: '/hardware', element: <Hardware /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
