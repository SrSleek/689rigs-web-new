'use client'

import { useState } from 'react'
import Link from 'next/link'
import { type MenuCategory } from './menuConfig'

interface Props {
  category: MenuCategory
  onClose: () => void
}

const s = {
  simpleDrop: { position: 'absolute' as const, top: '100%', left: 0, minWidth: '260px', background: '#0a0a0a', border: '1px solid #1e1e1e', borderTop: 'none', zIndex: 1000, boxShadow: '0 16px 32px rgba(0,0,0,.7)' },
  simpleItem: { display: 'block', padding: '10px 18px', fontSize: '12px', color: '#777', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' },
  megaWrap: { position: 'absolute' as const, top: '100%', left: 0, right: 0, background: '#0a0a0a', border: '1px solid #1e1e1e', borderTop: 'none', zIndex: 1000, boxShadow: '0 20px 40px rgba(0,0,0,.8)' },
  megaHero: { height: '120px', backgroundImage: `url('https://689rigs.com/cdn/shop/files/ChatGPT_Image_10_mar_2026_11_32_05_a.m._970x.png?v=1773163965')`, backgroundSize: 'cover' as const, backgroundPosition: 'center 30%', borderBottom: '1px solid #1e1e1e' },
  megaHeroOverlay: { width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,.88) 0%, rgba(0,0,0,.55) 60%, rgba(0,0,0,.2) 100%)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '18px' },
  megaHeroLogo: { display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 },
  megaHeroRino: { width: '40px', height: '40px', backgroundImage: `url('https://689rigs.com/cdn/shop/files/blanco2_Mesa_de_trabajo_1_150x150.png?v=1657835344')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' as const, backgroundPosition: 'center' },
  megaHeroWordmark: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '26px', letterSpacing: '.18em', color: '#fff', lineHeight: 1 as const },
  megaHeroDivider: { width: '1px', height: '50px', background: 'rgba(255,255,255,.15)', flexShrink: 0 },
  megaHeroInfo: { display: 'flex', flexDirection: 'column' as const, gap: '3px' },
  megaHeroCat: { fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '.08em', color: '#fff', lineHeight: 1 as const },
  megaHeroSub: { fontSize: '11px', color: 'rgba(255,255,255,.45)', fontWeight: 300 },
  megaHeroRight: { marginLeft: 'auto', textAlign: 'right' as const },
  megaHeroTag: { fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#cc2200', marginBottom: '6px' },
  megaMapsBtn: { display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.15)', padding: '5px 10px', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: '#fff', textDecoration: 'none' },
  megaBody: { display: 'flex' },
  megaSidebar: { width: '190px', flexShrink: 0, borderRight: '1px solid #1e1e1e', background: '#000' },
  sbItemBase: { padding: '11px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: '#777', cursor: 'pointer', borderLeft: '2px solid transparent', transition: 'all .12s' },
  sbItemActive: { color: '#fff', borderLeftColor: '#cc2200', background: '#111' },
  megaContent: { flex: 1, padding: '20px 24px' },
  megaColTitle: { fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' as const, color: '#cc2200', marginBottom: '8px', paddingBottom: '5px', borderBottom: '1px solid #1e1e1e' },
  megaColLinks: { listStyle: 'none' as const, display: 'flex', flexDirection: 'column' as const },
  megaLink: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', fontSize: '12px', color: '#777', textDecoration: 'none', gap: '6px' },
  badgeImport: { fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '1px 5px', flexShrink: 0, background: '#1a0000', color: '#cc2200', border: '1px solid #cc2200' },
  badgeNew: { fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '1px 5px', flexShrink: 0, background: '#001800', color: '#00cc44', border: '1px solid #00cc44' },
  badgeSoon: { fontSize: '8px', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const, padding: '1px 5px', flexShrink: 0, background: '#1e1e1e', color: '#555', border: '1px solid #2a2a2a' },
}

export default function MegaMenu({ category, onClose }: Props) {
  const [activeSection, setActiveSection] = useState(category.mega?.sections[0]?.id ?? '')

  if (category.simple) {
    return (
      <div style={s.simpleDrop} onMouseLeave={onClose}>
        {category.simple.map((link, i) => (
          <Link key={i} href={link.href} style={s.simpleItem} onClick={onClose}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#777')}>
            {link.label}
          </Link>
        ))}
      </div>
    )
  }

  if (!category.mega) return null

  const currentSection = category.mega.sections.find(sec => sec.id === activeSection) ?? category.mega.sections[0]

  return (
    <div style={s.megaWrap} onMouseLeave={onClose}>
      <div style={s.megaHero}>
        <div style={s.megaHeroOverlay}>
          <div style={s.megaHeroLogo}>
            <div style={s.megaHeroRino} />
            <span style={s.megaHeroWordmark}>689 RIGS</span>
          </div>
          <div style={s.megaHeroDivider} />
          <div style={s.megaHeroInfo}>
            <div style={s.megaHeroCat}>{category.label}</div>
            <div style={s.megaHeroSub}>{category.mega.eyebrow}</div>
          </div>
          <div style={s.megaHeroRight}>
            <div style={s.megaHeroTag}>📍 Barrio Cascatta, Puebla</div>
            <Link href="https://maps.google.com/?q=Barrio+Cascatta+Puebla" target="_blank" style={s.megaMapsBtn}>
              Ver en Google Maps
            </Link>
          </div>
        </div>
      </div>

      <div style={s.megaBody}>
        <div style={s.megaSidebar}>
          {category.mega.sections.map((section) => (
            <div key={section.id}
              style={{ ...s.sbItemBase, ...(activeSection === section.id ? s.sbItemActive : {}) }}
              onMouseEnter={() => setActiveSection(section.id)}>
              {section.label}
              <span style={{ fontSize: '9px', color: activeSection === section.id ? '#cc2200' : '#444' }}>›</span>
            </div>
          ))}
        </div>

        <div style={s.megaContent}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(currentSection.columns.length, 4)}, 1fr)`, gap: '0 20px' }}>
            {currentSection.columns.map((col, ci) => (
              <div key={ci}>
                <div style={s.megaColTitle}>{col.title}</div>
                <ul style={s.megaColLinks}>
                  {col.links.map((link, li) => (
                    <li key={li}>
                      <Link href={link.href} style={s.megaLink} onClick={onClose}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#777')}>
                        <span>{link.label}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          {link.badge === 'import' && <span style={s.badgeImport}>Import</span>}
                          {link.badge === 'new' && <span style={s.badgeNew}>Nuevo</span>}
                          {link.badge === 'soon' && <span style={s.badgeSoon}>Pronto</span>}
                          <span style={{ fontSize: '10px', color: '#cc2200', opacity: 0.6 }}>→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
