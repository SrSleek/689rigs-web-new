'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CurrencySelector from '@/components/CurrencySelector'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div style={{
        background: '#cc2200', textAlign: 'center', padding: '7px 16px',
        fontSize: '10px', fontWeight: 700, letterSpacing: '.16em',
        textTransform: 'uppercase', color: '#fff',
      }}>
        Importación directa EE.UU. · Envíos toda la República · Sim Center Club · Barrio Cascatta, Puebla
      </div>

      <nav style={{
        background: '#000', position: 'relative', zIndex: 999,
        borderBottom: scrolled ? '1px solid #2a2a2a' : '1px solid #1e1e1e',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: '56px', gap: '16px', position: 'sticky', top: 0, zIndex: 1000, background: '#000' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, marginRight: '16px', textDecoration: 'none' }}>
            <div style={{
              width: '34px', height: '34px',
              backgroundImage: `url('https://689rigs.com/cdn/shop/files/blanco2_Mesa_de_trabajo_1_150x150.png?v=1657835344')`,
              backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
            }} />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '.18em', color: '#fff', lineHeight: 1 }}>
              689 RIGS
            </span>
          </Link>

          <div style={{ flex: 1, maxWidth: '500px', display: 'flex', height: '36px', border: '1px solid #1e1e1e', background: '#111' }}>
            <input type="text" placeholder="Buscar cockpits, volantes, pedales, GPUs…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', padding: '0 12px', fontSize: '12px' }} />
            <button style={{ background: '#cc2200', border: 'none', cursor: 'pointer', padding: '0 13px', color: '#fff', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginLeft: 'auto' }}>
            <CurrencySelector />
            <Link href="/account" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: '#777', fontSize: '9px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Cuenta
            </Link>
            <a href="https://wa.me/522215698976?text=Hola%20689%20Rigs%2C%20tengo%20una%20consulta" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: '#25d366', fontSize: '9px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}