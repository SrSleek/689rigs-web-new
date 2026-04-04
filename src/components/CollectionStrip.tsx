'use client'

import { useRef } from 'react'
import Link from 'next/link'

interface CollectionCard {
  label: string
  href: string
  handle: string
}

interface Props {
  collections: CollectionCard[]
  collectionImages: Record<string, string | null>
}

export default function CollectionStrip({ collections, collectionImages }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 200
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <div className="cstrip">
      {/* Left arrow */}
      <button className="cstrip__arrow cstrip__arrow--left" onClick={() => scroll('left')} aria-label="Scroll left">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Scrollable items */}
      <div className="cstrip__scroll" ref={scrollRef}>
        {collections.map(col => (
          <Link key={col.handle + col.label} href={col.href} className="cstrip__item">
            <div className="cstrip__icon">
              {collectionImages[col.handle] ? (
                <img
                  src={collectionImages[col.handle]!}
                  alt={col.label}
                />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              )}
            </div>
            <span>{col.label}</span>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button className="cstrip__arrow cstrip__arrow--right" onClick={() => scroll('right')} aria-label="Scroll right">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
