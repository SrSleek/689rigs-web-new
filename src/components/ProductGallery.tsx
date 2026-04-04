'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  mainImage: { url: string; altText: string | null } | null
  images: { url: string; altText: string | null }[]
  title: string
}

export default function ProductGallery({ mainImage, images, title }: ProductGalleryProps) {
  const allImages = mainImage 
    ? [mainImage, ...images.filter(img => img.url !== mainImage.url)]
    : images
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = allImages[selectedIndex] ?? null

  if (!selectedImage && allImages.length === 0) {
    return (
      <div className="gallery">
        <div className="gallery__main">
          <div className="gallery__no-image">
            <div className="gallery__no-image-circle" />
            <span>Sin imagen</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gallery">
      {/* Main image */}
      <div className="gallery__main">
        {selectedImage && (
          <img
            src={selectedImage.url}
            alt={selectedImage.altText ?? title}
            className="gallery__main-img"
          />
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="gallery__thumbs">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`gallery__thumb ${i === selectedIndex ? 'gallery__thumb--active' : ''}`}
            >
              <img src={img.url} alt={img.altText ?? `${title} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
