'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import MegaMenu from './MegaMenu'
import { menuConfig } from './menuConfig'
import { useCart } from '@/components/cart/CartContext'
import CurrencySelector from '@/components/CurrencySelector'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const { openCart, totalQuantity } = useCart()

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
        🚀 Importación directa EE.UU. · Envíos toda la República · Sim Center Club · Barrio Cascatta, Puebla
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
            {/* Currency Selector */}
            <CurrencySelector />

            <Link href="/account" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: '#777', fontSize: '9px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, textDecoration: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Cuenta
            </Link>
            <div onClick={openCart} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', color: '#777', fontSize: '9px', letterSpacing: '.06em', textTransform: 'uppercase', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span style={{ position: 'absolute', top: '-3px', right: '-7px', background: '#cc2200', color: '#fff', fontSize: '9px', fontWeight: 700, width: '15px', height: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {totalQuantity}
                </span>
              </div>
              Carrito
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid #1e1e1e', overflowX: 'auto' }}>
          {menuConfig.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setOpenMenu(openMenu === cat.id ? null : cat.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '0 15px', height: '38px',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase',
                color: openMenu === cat.id ? '#fff' : cat.highlight ? '#cc2200' : '#777',
                cursor: 'pointer', whiteSpace: 'nowrap',
                borderBottom: openMenu === cat.id ? '2px solid #cc2200' : '2px solid transparent',
                transition: 'color .15s, border-color .15s',
                userSelect: 'none',
              }}
            >
              {cat.label}
              {(cat.collections || cat.simple) && (
                <span style={{ fontSize: '7px', opacity: openMenu === cat.id ? 0.8 : 0.4 }}>▾</span>
              )}
            </div>
          ))}
        </div>

        {openMenu && (
          <MegaMenu
            category={menuConfig.find(c => c.id === openMenu)!}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </nav>
    </>
  )
}
