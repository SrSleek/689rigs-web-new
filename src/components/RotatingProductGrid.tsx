'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  handle: string
  title: string
  vendor: string
  tags?: string[]
  featuredImage?: { url: string; altText: string | null } | null
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
}

interface Props {
  products: Product[]
  visibleCount?: number
  intervalMs?: number
}

export default function RotatingProductGrid({
  products,
  visibleCount = 4,
  intervalMs = 3000,
}: Props) {
  const [startIndex, setStartIndex] = useState(0)
  const [fading, setFading] = useState(false)

  // Only rotate if we have more products than visible
  const shouldRotate = products.length > visibleCount

  useEffect(() => {
    if (!shouldRotate) return

    const timer = setInterval(() => {
      setFading(true)

      setTimeout(() => {
        setStartIndex(prev => {
          const next = prev + visibleCount
          return next >= products.length ? 0 : next
        })
        setFading(false)
      }, 300) // fade out duration
    }, intervalMs)

    return () => clearInterval(timer)
  }, [products.length, visibleCount, intervalMs, shouldRotate])

  // Get current visible products
  const visibleProducts: Product[] = []
  for (let i = 0; i < visibleCount; i++) {
    const idx = (startIndex + i) % products.length
    visibleProducts.push(products[idx])
  }

  // Dots indicator
  const totalPages = Math.ceil(products.length / visibleCount)
  const currentPage = Math.floor(startIndex / visibleCount)

  if (products.length === 0) {
    return (
      <div className="product-section__grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="product-card product-card--skeleton">
            <div className="product-card__image"><div className="product-card__placeholder" /></div>
            <div className="product-card__info">
              <div style={{ height: 10, background: '#111', width: '40%', marginBottom: 6 }} />
              <div style={{ height: 13, background: '#111', width: '80%', marginBottom: 6 }} />
              <div style={{ height: 15, background: '#111', width: '30%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div
        className="product-section__grid"
        style={{
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id + '-' + startIndex} product={product} />
        ))}
      </div>

      {/* Dots indicator */}
      {shouldRotate && totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '14px',
        }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFading(true)
                setTimeout(() => {
                  setStartIndex(i * visibleCount)
                  setFading(false)
                }, 300)
              }}
              style={{
                width: i === currentPage ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === currentPage ? '#cc2200' : '#333',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
              aria-label={`Página ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
