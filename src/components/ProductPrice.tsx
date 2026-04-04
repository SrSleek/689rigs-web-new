'use client'

import { useCurrency } from '@/components/CurrencyContext'

interface ProductPriceProps {
  amount: number
  currencyCode: string
}

export default function ProductPrice({ amount, currencyCode }: ProductPriceProps) {
  const { displayPrice } = useCurrency()

  if (amount <= 0) {
    return (
      <div style={{ fontSize: '16px', color: '#555', fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase' }}>
        Consultar precio
      </div>
    )
  }

  return (
    <>
      <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff' }}>
        {displayPrice(amount, currencyCode)}
      </div>
      <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
        Importación directa EE.UU. · Envío a Puebla incluido
      </div>
    </>
  )
}
