'use client'

import Link from 'next/link'
import Price from '@/components/Price'

interface ProductCardProps {
  product: {
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
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const comparePrice = parseFloat(product.compareAtPriceRange?.minVariantPrice?.amount ?? '0')
  const onSale = comparePrice > 0 && comparePrice > price
  const currency = product.priceRange.minVariantPrice.currencyCode
  const isImport = product.tags?.some(t => ['importacion', 'import', 'importación'].includes(t.toLowerCase()))

  return (
    <Link href={`/products/${product.handle}`} className="product-card">
      <div className="product-card__image">
        {product.featuredImage ? (
          <img src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} loading="lazy" />
        ) : (
          <div className="product-card__placeholder" />
        )}
        {onSale && <span className="product-card__badge product-card__badge--sale">Oferta</span>}
        {!onSale && isImport && <span className="product-card__badge product-card__badge--import">Import</span>}
      </div>
      <div className="product-card__info">
        <span className="product-card__vendor">{product.vendor}</span>
        <span className="product-card__title">{product.title}</span>
        <div className="product-card__price-row">
          {onSale ? (
            <Price
              amount={price}
              compareAmount={comparePrice}
              fromCurrency={currency}
              className="product-card__price product-card__price--sale"
            />
          ) : (
            <Price
              amount={price}
              fromCurrency={currency}
              className="product-card__price"
            />
          )}
        </div>
      </div>
    </Link>
  )
}
