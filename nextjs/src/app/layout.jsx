import './globals.css'
import Sidebar from '@/components/Sidebar'
import { Space_Grotesk, Manrope, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'IoT App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${inter.variable}`}>
      <body>
        <div className="flex">
          <Sidebar />
          <main className="p-6 text-white w-full">{children}</main>
        </div>
      </body>
    </html>
  )
}
