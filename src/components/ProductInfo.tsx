'use client'

import { useState } from 'react'
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
  const { displayPrice } = useCurrency()

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
      {/* ── WhatsApp as primary CTA ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%',
              background: '#25d366',
              color: '#fff',
              border: 'none',
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              padding: '18px',
              cursor: 'pointer',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxSizing: 'border-box',
              transition: 'background 0.2s, transform 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#20bd5a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#25d366'
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar por WhatsApp
          </a>
        )}

        {!selectedVariant?.availableForSale && (
          <div style={{
            fontSize: '11px',
            color: '#555',
            textAlign: 'center',
            fontFamily: "'Roboto Condensed', sans-serif",
            letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}>
            Pregunta por disponibilidad
          </div>
        )}
      </div>
    </>
  )
}
