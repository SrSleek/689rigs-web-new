'use client'

import { useState, useRef, useEffect } from 'react'
import { useCurrency } from './CurrencyContext'

export default function CurrencySelector() {
  const { currency, currencies, setCurrency, isLoading } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (isLoading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '4px',
        padding: '4px 8px', fontSize: '11px', color: '#555',
      }}>
        <span style={{ opacity: 0.5 }}>···</span>
      </div>
    )
  }

  return (
    <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
      {/* Current currency button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '5px 10px',
          background: 'transparent',
          border: '1px solid #2a2a2a',
          color: '#999',
          fontSize: '11px',
          fontFamily: "'Roboto Condensed', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.04em',
          cursor: 'pointer',
          transition: 'border-color 0.2s, color 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#555'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2a2a2a'
          e.currentTarget.style.color = '#999'
        }}
      >
        <span style={{ fontSize: '14px' }}>{currency.flag}</span>
        <span>{currency.code}</span>
        <span style={{ fontSize: '8px', opacity: 0.5, marginLeft: '2px' }}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '4px',
          background: '#0a0a0a',
          border: '1px solid #2a2a2a',
          zIndex: 9999,
          minWidth: '180px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        }}>
          {currencies.map(c => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code)
                setOpen(false)
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%',
                padding: '10px 14px',
                background: c.code === currency.code ? '#111' : 'transparent',
                border: 'none',
                borderBottom: '1px solid #1a1a1a',
                color: c.code === currency.code ? '#fff' : '#777',
                fontSize: '12px',
                fontFamily: "'Roboto Condensed', sans-serif",
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
                textAlign: 'left',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#111'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                if (c.code !== currency.code) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#777'
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{c.flag}</span>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: c.code === currency.code ? '#cc2200' : '#555',
              }}>
                {c.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
