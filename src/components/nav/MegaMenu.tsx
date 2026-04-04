'use client'

import Link from 'next/link'
import { type MenuCategory } from './menuConfig'

interface Props {
  category: MenuCategory
  onClose: () => void
}

export default function MegaMenu({ category, onClose }: Props) {
  if (category.simple) {
    return (
      <div
        style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: '#0a0a0a', borderBottom: '1px solid #1e1e1e',
          zIndex: 1000, boxShadow: '0 16px 32px rgba(0,0,0,.7)',
        }}
        onMouseLeave={onClose}
      >
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '16px 24px',
          display: 'flex', flexWrap: 'wrap', gap: '0',
        }}>
          {category.simple.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={onClose}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              style={{
                display: 'block',
                padding: '8px 20px',
                fontSize: '12px',
                color: '#777',
                textDecoration: 'none',
                fontFamily: "'Roboto Condensed', sans-serif",
                transition: 'color .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#777')}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (!category.collections) return null

  const cols = category.collections.length <= 8 ? 4 : category.collections.length <= 9 ? 3 : 4

  return (
    <div
      style={{
        position: 'absolute', top: '100%', left: 0, right: 0,
        background: '#0a0a0a', borderBottom: '2px solid #cc2200',
        zIndex: 1000, boxShadow: '0 20px 40px rgba(0,0,0,.8)',
      }}
      onMouseLeave={onClose}
    >
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '16px 24px 0',
        display: 'flex', alignItems: 'baseline', gap: '12px',
      }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '22px',
          letterSpacing: '.06em',
          color: '#fff',
          lineHeight: 1,
        }}>
          {category.label}
        </span>
        <span style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: '10px',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: '#555',
        }}>
          {category.collections.length} colecciones
        </span>
      </div>

      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '12px 24px 20px',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '1px',
        background: '#1a1a1a',
      }}>
        {category.collections.map((col, i) => (
          <Link
            key={i}
            href={col.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: '#0a0a0a',
              textDecoration: 'none',
              transition: 'background .15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#111'
              const label = e.currentTarget.querySelector('.mega-label') as HTMLElement
              if (label) label.style.color = '#fff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0a0a0a'
              const label = e.currentTarget.querySelector('.mega-label') as HTMLElement
              if (label) label.style.color = '#999'
            }}
          >
            <span
              className="mega-label"
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '.02em',
                color: '#999',
                transition: 'color .15s',
              }}
            >
              {col.label}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              {col.badge === 'import' && (
                <span style={{
                  fontSize: '8px', fontWeight: 700, letterSpacing: '.1em',
                  textTransform: 'uppercase', padding: '2px 6px',
                  background: '#1a0000', color: '#cc2200', border: '1px solid #cc2200',
                }}>Import</span>
              )}
              {col.badge === 'new' && (
                <span style={{
                  fontSize: '8px', fontWeight: 700, letterSpacing: '.1em',
                  textTransform: 'uppercase', padding: '2px 6px',
                  background: '#001800', color: '#00cc44', border: '1px solid #00cc44',
                }}>Nuevo</span>
              )}
              {col.badge === 'soon' && (
                <span style={{
                  fontSize: '8px', fontWeight: 700, letterSpacing: '.1em',
                  textTransform: 'uppercase', padding: '2px 6px',
                  background: '#1e1e1e', color: '#555', border: '1px solid #2a2a2a',
                }}>Pronto</span>
              )}
              <span style={{ fontSize: '10px', color: '#cc2200', opacity: 0.5 }}>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
