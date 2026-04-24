'use client'

import { useState, useEffect } from 'react'

interface Props {
  images: string[]
  fallbackImage?: string | null
  alt: string
  intervalMs?: number
}

export default function RotatingThumb({
  images,
  fallbackImage,
  alt,
  intervalMs = 4000,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const imagesToShow = images.length > 0
    ? images
    : (fallbackImage ? [fallbackImage] : [])

  const shouldRotate = imagesToShow.length > 1

  useEffect(() => {
    if (!shouldRotate) return

    const initialDelay = Math.random() * 2000

    let timer: ReturnType<typeof setInterval>

    const timeout = setTimeout(() => {
      timer = setInterval(() => {
        setFading(true)
        setTimeout(() => {
          setCurrentIndex(prev => (prev + 1) % imagesToShow.length)
          setFading(false)
        }, 250)
      }, intervalMs)
    }, initialDelay)

    return () => {
      clearTimeout(timeout)
      if (timer) clearInterval(timer)
    }
  }, [imagesToShow.length, intervalMs, shouldRotate])

  if (imagesToShow.length === 0) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )
  }

  return (
    <img
      src={imagesToShow[currentIndex]}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '3px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.25s ease',
      }}
    />
  )
}