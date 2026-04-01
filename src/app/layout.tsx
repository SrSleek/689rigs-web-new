import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/nav/Navbar'

export const metadata: Metadata = {
  title: '689 Rigs — Simuladores de Carrera & Hardware Gaming',
  description: 'Tienda especializada en simuladores de carrera, hardware gaming y productos de importación. Sim Center Club en Barrio Cascatta, Puebla.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}