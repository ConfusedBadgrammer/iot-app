import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'IoT App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex">
          <Sidebar />
          <main className="p-6 text-white">{children}</main>
        </div>
      </body>
    </html>
  )
}
