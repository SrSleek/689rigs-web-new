'use client'

import { useCurrency } from '@/components/CurrencyContext'

interface PriceProps {
  amount: string | number
  fromCurrency?: string
  compareAmount?: string | number | null
  className?: string
  style?: React.CSSProperties
}

/**
 * Displays a price converted to the user's selected currency.
 * Use this anywhere you show a price to get automatic conversion.
 */
export default function Price({
  amount,
  fromCurrency = 'USD',
  compareAmount,
  className,
  style,
}: PriceProps) {
  const { displayPrice } = useCurrency()

  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  const numCompare = compareAmount
    ? typeof compareAmount === 'string'
      ? parseFloat(compareAmount)
      : compareAmount
    : null

  const hasDiscount = numCompare && numCompare > numAmount

  return (
    <span className={className} style={style}>
      {hasDiscount && (
        <span style={{
          fontSize: '0.75em',
          fontWeight: 400,
          color: '#555',
          textDecoration: 'line-through',
          marginRight: '8px',
        }}>
          {displayPrice(numCompare, fromCurrency)}
        </span>
      )}
      <span style={hasDiscount ? { color: '#cc2200' } : undefined}>
        {displayPrice(numAmount, fromCurrency)}
      </span>
    </span>
  )
}
