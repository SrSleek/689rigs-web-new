'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'

interface Props {
  variants: {
    id: string
    title: string
    availableForSale: boolean
    price: { amount: string; currencyCode: string }
    selectedOptions: { name: string; value: string }[]
  }[]
  options: { name: string; values: string[] }[]
  whatsappUrl?: string
}

export default function AddToCartButton({ variants, options, whatsappUrl }: Props) {
  const { addItem, isLoading } = useCart()
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    options.forEach(opt => {
      if (opt.name !== 'Title') initial[opt.name] = opt.values[0]
    })
    return initial
  })
  const [adding, setAdding] = useState(false)

  const selectedVariant = variants.find(v =>
    v.selectedOptions.every(so =>
      so.name === 'Title' || selectedOptions[so.name] === so.value
    )
  ) ?? variants[0]

  const handleAdd = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return
    setAdding(true)
    await addItem(selectedVariant.id)
    setAdding(false)
  }

  const hasRealOptions = options.length > 0 && options[0].name !== 'Title'

  return (
    <>
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
                {opt.values.map(val => (
                  <button
                    key={val}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.name]: val }))}
                    style={{
                      padding: '7px 14px',
                      border: selectedOptions[opt.name] === val ? '1px solid #fff' : '1px solid #2a2a2a',
                      background: selectedOptions[opt.name] === val ? '#fff' : 'transparent',
                      color: selectedOptions[opt.name] === val ? '#000' : '#777',
                      fontSize: '12px', cursor: 'pointer',
                      fontFamily: "'Roboto Condensed', sans-serif",
                      fontWeight: 700, letterSpacing: '.08em',
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        <button
          onClick={handleAdd}
          disabled={adding || isLoading || !selectedVariant?.availableForSale}
          style={{
            width: '100%', background: selectedVariant?.availableForSale ? '#cc2200' : '#333',
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
