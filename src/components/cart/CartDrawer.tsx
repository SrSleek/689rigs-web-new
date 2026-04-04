'use client'

import Link from 'next/link'
import { useCart } from './CartContext'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem, totalQuantity } = useCart()

  const fmt = (amount: string, currency = 'USD') =>
    new Intl.NumberFormat('es-MX', {
      style: 'currency', currency,
      minimumFractionDigits: 0, maximumFractionDigits: 0,
    }).format(parseFloat(amount))

  const lines = cart?.lines.nodes ?? []

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
            zIndex: 9998, cursor: 'pointer',
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '420px', maxWidth: '90vw',
        background: '#0a0a0a', borderLeft: '1px solid #1e1e1e',
        zIndex: 9999,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #1e1e1e',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '22px', letterSpacing: '.06em', color: '#fff',
            }}>
              CARRITO
            </span>
            {totalQuantity > 0 && (
              <span style={{
                background: '#cc2200', color: '#fff',
                fontSize: '10px', fontWeight: 700,
                padding: '2px 8px', borderRadius: '2px',
              }}>
                {totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none', border: 'none', color: '#555',
              fontSize: '20px', cursor: 'pointer', padding: '4px',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* Loading bar */}
        {isLoading && (
          <div style={{ height: '2px', background: '#cc2200', animation: 'cartPulse 1s infinite' }} />
        )}

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
          {lines.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', height: '100%', gap: '16px', padding: '40px',
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '13px', color: '#444', letterSpacing: '.06em',
              }}>
                Tu carrito está vacío
              </span>
              <button
                onClick={closeCart}
                style={{
                  background: 'transparent', border: '1px solid #333',
                  color: '#777', padding: '10px 24px', cursor: 'pointer',
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontSize: '11px', fontWeight: 700, letterSpacing: '.12em',
                  textTransform: 'uppercase',
                }}
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            lines.map(line => (
              <div key={line.id} style={{
                display: 'flex', gap: '14px', padding: '16px 20px',
                borderBottom: '1px solid #1e1e1e',
              }}>
                {/* Image */}
                <Link
                  href={`/products/${line.merchandise.product.handle}`}
                  onClick={closeCart}
                  style={{ flexShrink: 0 }}
                >
                  <div style={{
                    width: '72px', height: '72px', background: '#111',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {line.merchandise.product.featuredImage ? (
                      <img
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px', mixBlendMode: 'lighten' }}
                      />
                    ) : (
                      <div style={{ width: '24px', height: '24px', border: '1px solid #333', borderRadius: '50%', opacity: 0.3 }} />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Link
                    href={`/products/${line.merchandise.product.handle}`}
                    onClick={closeCart}
                    style={{ textDecoration: 'none' }}
                  >
                    <span style={{
                      fontFamily: "'Roboto Condensed', sans-serif",
                      fontSize: '12px', color: '#ccc', lineHeight: 1.3,
                    }}>
                      {line.merchandise.product.title}
                    </span>
                  </Link>

                  {/* Variant info */}
                  {line.merchandise.title !== 'Default Title' && (
                    <span style={{
                      fontSize: '10px', color: '#555',
                      fontFamily: "'Roboto Condensed', sans-serif",
                    }}>
                      {line.merchandise.selectedOptions.map(o => o.value).join(' / ')}
                    </span>
                  )}

                  {/* Price */}
                  <span style={{
                    fontSize: '13px', fontWeight: 600, color: '#fff',
                    marginTop: '2px',
                  }}>
                    {fmt(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                  </span>

                  {/* Quantity controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '6px' }}>
                    <button
                      onClick={() => updateItem(line.id, line.quantity - 1)}
                      disabled={isLoading}
                      style={{
                        width: '28px', height: '28px',
                        background: '#111', border: '1px solid #2a2a2a',
                        color: '#777', fontSize: '14px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      width: '36px', height: '28px',
                      background: '#000', border: '1px solid #2a2a2a', borderLeft: 'none', borderRight: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 600, color: '#fff',
                    }}>
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateItem(line.id, line.quantity + 1)}
                      disabled={isLoading}
                      style={{
                        width: '28px', height: '28px',
                        background: '#111', border: '1px solid #2a2a2a',
                        color: '#777', fontSize: '14px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      style={{
                        background: 'none', border: 'none', color: '#444',
                        fontSize: '10px', cursor: 'pointer', marginLeft: '10px',
                        fontFamily: "'Roboto Condensed', sans-serif",
                        letterSpacing: '.08em', textTransform: 'uppercase',
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — Checkout */}
        {lines.length > 0 && (
          <div style={{
            borderTop: '1px solid #1e1e1e',
            padding: '16px 20px',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '14px',
            }}>
              <span style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '11px', fontWeight: 700, letterSpacing: '.12em',
                textTransform: 'uppercase', color: '#555',
              }}>
                Subtotal
              </span>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                {cart?.cost.subtotalAmount
                  ? fmt(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
                  : '--'}
              </span>
            </div>
            <span style={{
              display: 'block', fontSize: '10px', color: '#444',
              marginBottom: '12px', textAlign: 'center',
            }}>
              Impuestos y envío calculados al finalizar la compra
            </span>
            <a
              href={cart?.checkoutUrl ?? '#'}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                background: '#cc2200', color: '#fff', padding: '16px',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: '13px', fontWeight: 700, letterSpacing: '.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                cursor: 'pointer', transition: 'background .2s',
              }}
            >
              Finalizar compra →
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cartPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  )
}
