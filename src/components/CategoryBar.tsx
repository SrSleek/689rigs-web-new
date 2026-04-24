'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { menuConfig } from '@/components/nav/menuConfig'

export default function CategoryBar() {
  const [openCat, setOpenCat] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenCat(null)
      }
    }
    if (openCat) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [openCat])

  // Direct link map for categories without subs
  const directLinks: Record<string, string> = {
    nuevos: '/collections/nuevos',
    bestsellers: '/collections/best-sellers',
    ofertas: '/collections/ofertas',
    armado: '/collections/armado-recomendado',
  }

  return (
    <div className="catbar" ref={dropdownRef}>
      <div className="catbar__scroll">
        {menuConfig.map(cat => {
          // Categories without subs → direct link
          if (cat.subs.length === 0 && directLinks[cat.id]) {
            return (
              <Link
                key={cat.id}
                href={directLinks[cat.id]}
                className={`catbar__btn ${cat.highlight ? 'catbar__btn--highlight' : ''}`}
              >
                {cat.label}
              </Link>
            )
          }

          // Categories with subs → expandable
          return (
            <button
              key={cat.id}
              onClick={() => setOpenCat(prev => prev === cat.id ? null : cat.id)}
              className={`catbar__btn ${openCat === cat.id ? 'catbar__btn--active' : ''} ${cat.highlight ? 'catbar__btn--highlight' : ''}`}
            >
              {cat.label}
              {cat.subs.length > 0 && (
                <span className={`catbar__arrow ${openCat === cat.id ? 'catbar__arrow--open' : ''}`}>▾</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Dropdown */}
      {openCat && (() => {
        const cat = menuConfig.find(c => c.id === openCat)
        if (!cat || cat.subs.length === 0) return null

        return (
          <div className="catbar__dropdown">
            <div className="catbar__dropdown-title">{cat.label}</div>
            <div className="catbar__dropdown-grid">
              {cat.subs.map(s => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="catbar__sub"
                  onClick={() => setOpenCat(null)}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        )
      })()}
    </div>
  )
}