'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'
import { useCurrency } from '@/components/CurrencyContext'

interface Variant {
  id: string
  title: string
  availableForSale: boolean
  price: { amount: string; currencyCode: string }
  compareAtPrice?: { amount: string; currencyCode: string } | null
  selectedOptions: { name: string; value: string }[]
}

interface Option {
  name: string
  values: string[]
}

interface Props {
  variants: Variant[]
  options: Option[]
  defaultPrice: number
  defaultCurrency: string
  whatsappUrl?: string
}

export default function ProductInfo({ variants, options, defaultPrice, defaultCurrency, whatsappUrl }: Props) {
  const { addItem, isLoading } = useCart()
  const { displayPrice } = useCurrency()
  const [adding, setAdding] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    options.forEach(opt => {
      if (opt.name !== 'Title') initial[opt.name] = opt.values[0]
    })
    return initial
  })

  // Find matching variant based on selected options
  const selectedVariant = variants.find(v =>
    v.selectedOptions.every(so =>
      so.name === 'Title' || selectedOptions[so.name] === so.value
    )
  ) ?? variants[0]

  // Dynamic price from selected variant
  const currentPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : defaultPrice
  const currentCurrency = selectedVariant?.price.currencyCode ?? defaultCurrency
  const comparePrice = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : 0
  const onSale = comparePrice > 0 && comparePrice > currentPrice

  const handleAdd = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return
    setAdding(true)
    await addItem(selectedVariant.id)
    setAdding(false)
  }

  const hasRealOptions = options.length > 0 && options[0].name !== 'Title'

  return (
    <>
      {/* ── Dynamic Price ── */}
      <div style={{ marginBottom: '24px' }}>
        {currentPrice > 0 ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '28px', fontWeight: 600, color: onSale ? '#cc2200' : '#fff' }}>
                {displayPrice(currentPrice, currentCurrency)}
              </span>
              {onSale && (
                <span style={{ fontSize: '16px', color: '#555', textDecoration: 'line-through' }}>
                  {displayPrice(comparePrice, currentCurrency)}
                </span>
              )}
            </div>
            <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
              Importación directa EE.UU. · Envío a Puebla incluido
            </div>
          </>
        ) : (
          <div style={{
            fontSize: '16px', color: '#555',
            fontFamily: "'Roboto Condensed', sans-serif",
            letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            Consultar precio
          </div>
        )}
      </div>

      {/* ── Options selector ── */}
      {hasRealOptions && (
        <div style={{ marginBottom: '24px' }}>
          {options.map(opt => (
            <div key={opt.name} style={{ marginBottom: '16px' }}>
              <div style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '10px', fontWeight: 700, letterSpacing: '.16em',
                textTransform: 'uppercase', color: '#777', marginBottom: '8px',
              }}>
                {opt.name}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {opt.values.map(val => {
                  const isSelected = selectedOptions[opt.name] === val
                  return (
                    <button
                      key={val}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.name]: val }))}
                      style={{
                        padding: '7px 14px',
                        border: isSelected ? '1px solid #fff' : '1px solid #2a2a2a',
                        background: isSelected ? '#fff' : 'transparent',
                        color: isSelected ? '#000' : '#777',
                        fontSize: '12px', cursor: 'pointer',
                        fontFamily: "'Roboto Condensed', sans-serif",
                        fontWeight: 700, letterSpacing: '.08em',
                        transition: 'all 0.15s',
                      }}
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Buttons ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        <button
          onClick={handleAdd}
          disabled={adding || isLoading || !selectedVariant?.availableForSale}
          style={{
            width: '100%',
            background: selectedVariant?.availableForSale ? '#cc2200' : '#333',
            color: '#fff', border: 'none',
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '13px', fontWeight: 700, letterSpacing: '.18em',
            textTransform: 'uppercase', padding: '16px', cursor: 'pointer',
            opacity: adding || isLoading ? 0.7 : 1,
            transition: 'opacity .2s, background .2s',
          }}
        >
          {!selectedVariant?.availableForSale
            ? 'Agotado'
            : adding
              ? 'Agregando...'
              : 'Agregar al carrito'}
        </button>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            style={{
              width: '100%', background: 'transparent', color: '#fff',
              border: '1px solid #2a2a2a',
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '13px', fontWeight: 700, letterSpacing: '.18em',
              textTransform: 'uppercase', padding: '16px', cursor: 'pointer',
              textDecoration: 'none', textAlign: 'center', display: 'block',
              boxSizing: 'border-box',
            }}
          >
            Solicitar por WhatsApp
          </a>
        )}
      </div>
    </>
  )
}
