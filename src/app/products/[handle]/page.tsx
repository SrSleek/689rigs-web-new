import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ handle: string }>
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params

  let product: any = null

  try {
    const { getProduct } = await import('@/lib/shopify')
    product = await getProduct(handle)
  } catch (e) {
    console.log('Shopify token not configured yet')
  }

  // Si hay token y no existe el producto, 404
  if (product === undefined) notFound()

  // Sin token — modo demo con datos del handle
  const title = product?.title ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  const vendor = product?.vendor ?? '689 Rigs'
  const price = product ? parseFloat(product.priceRange.minVariantPrice.amount) : 0
  const currency = product?.priceRange.minVariantPrice.currencyCode ?? 'USD'
  const images = product?.images?.nodes ?? []
  const mainImage = product?.featuredImage ?? null
  const description = product?.descriptionHtml ?? ''
  const variants = product?.variants?.nodes ?? []
  const options = product?.options ?? []

  const fmt = (n: number) => new Intl.NumberFormat('es-MX', {
    style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(n)

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* Breadcrumb */}
      <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#555', borderBottom: '1px solid #1e1e1e' }}>
        <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Inicio</Link>
        <span style={{ color: '#333' }}>›</span>
        <span style={{ color: '#555' }}>Catálogo</span>
        <span style={{ color: '#333' }}>›</span>
        <span style={{ color: '#fff' }}>{title}</span>
      </div>

      {/* Product layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: '80vh' }}>

        {/* Left — Images */}
        <div style={{ borderRight: '1px solid #1e1e1e', position: 'sticky', top: '94px', alignSelf: 'start' }}>
          {/* Main image */}
          <div style={{ width: '100%', aspectRatio: '1', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #1e1e1e' }}>
            {mainImage ? (
              <img
                src={mainImage.url}
                alt={mainImage.altText ?? title}
                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px', mixBlendMode: 'lighten' }}
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.2 }}>
                <div style={{ width: '80px', height: '80px', border: '1px solid #fff', borderRadius: '50%' }} />
                <div style={{ fontSize: '11px', color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase' }}>Sin imagen</div>
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '1px', background: '#1e1e1e', overflowX: 'auto' }}>
              {images.slice(0, 6).map((img: any, i: number) => (
                <div key={i} style={{ width: '80px', height: '80px', flexShrink: 0, background: '#0d0d0d', cursor: 'pointer' }}>
                  <img src={img.url} alt={img.altText ?? `${title} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px', mixBlendMode: 'lighten' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div style={{ padding: '32px 40px' }}>

          {/* Brand */}
          <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: '#555', marginBottom: '8px' }}>
            {vendor}
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', letterSpacing: '.04em', color: '#fff', lineHeight: 1.1, margin: '0 0 20px' }}>
            {title}
          </h1>

          {/* Price */}
          <div style={{ marginBottom: '28px' }}>
            {price > 0 ? (
              <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff' }}>
                {fmt(price)}
              </div>
            ) : (
              <div style={{ fontSize: '16px', color: '#555', fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Consultar precio
              </div>
            )}
            {price > 0 && (
              <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
                Precio en USD · Incluye envío a Puebla desde EE.UU.
              </div>
            )}
          </div>

          {/* Options / Variants */}
          {options.length > 0 && options[0].name !== 'Title' && (
            <div style={{ marginBottom: '24px' }}>
              {options.map((opt: any) => (
                <div key={opt.name} style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#777', marginBottom: '8px' }}>
                    {opt.name}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {opt.values.map((val: string, i: number) => (
                      <div key={val} style={{ padding: '7px 14px', border: i === 0 ? '1px solid #fff' : '1px solid #2a2a2a', background: i === 0 ? '#fff' : 'transparent', color: i === 0 ? '#000' : '#777', fontSize: '12px', cursor: 'pointer', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, letterSpacing: '.08em' }}>
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to cart */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            <button style={{ width: '100%', background: '#cc2200', color: '#fff', border: 'none', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px', cursor: 'pointer' }}>
              Agregar al carrito
            </button>
            <button style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid #2a2a2a', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', padding: '16px', cursor: 'pointer' }}>
              Solicitar por WhatsApp
            </button>
          </div>

          {/* Shipping info */}
          <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: '20px', marginBottom: '28px' }}>
            {[
              { icon: '🚀', label: 'Importación directa EE.UU.', sub: 'Traemos este producto desde distribuidores en Estados Unidos' },
              { icon: '📍', label: 'Recoge en tienda', sub: 'Barrio Cascatta, Puebla · Lun–Dom 12–10pm' },
              { icon: '🚚', label: 'Envío a toda la República', sub: 'Calculamos costo de envío al confirmar pedido' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: '#ccc', marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          {description ? (
            <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: '20px' }}>
              <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
                Descripción
              </div>
              <div
                style={{ fontSize: '13px', color: '#888', lineHeight: 1.8, fontWeight: 300 }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          ) : !product ? (
            <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: '20px' }}>
              <div style={{ padding: '16px', background: '#0d0d0d', border: '1px solid #1e1e1e', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#444', fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                  ⚙ Conectando con catálogo Shopify…
                </div>
                <Link
                  href={`https://689rigs.com/products/${handle}`}
                  target="_blank"
                  style={{ display: 'inline-block', padding: '8px 20px', background: '#cc2200', color: '#fff', fontSize: '10px', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  Ver en tienda actual →
                </Link>
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  )
}
