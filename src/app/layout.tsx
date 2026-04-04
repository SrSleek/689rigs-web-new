import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/nav/Navbar'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: '689 Rigs — Simuladores de Carrera & Hardware',
  description: 'Tienda especializada en simuladores de carrera',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}