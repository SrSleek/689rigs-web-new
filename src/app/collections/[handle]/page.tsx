import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ handle: string }>
}

const COLLECTION_META: Record<string, { title: string; eyebrow: string }> = {
  'volantes':                            { title: 'Volantes', eyebrow: 'Sim Racing · Controles' },
  'pedales':                             { title: 'Pedales', eyebrow: 'Sim Racing · Controles' },
  'servos-dd':                           { title: 'Bases DD / Servos', eyebrow: 'Sim Racing · Controles' },
  'collections-cockpits':               { title: 'Cockpits & Rigs', eyebrow: 'Sim Racing · Estructuras' },
  'rigs':                                { title: 'Bundles Sim Racing', eyebrow: 'Sim Racing · Bundles' },
  'palanca-de-cambios-y-frenos-de-mano': { title: 'Shifters & Handbrakes', eyebrow: 'Sim Racing · Controles' },
  'soportes-y-bandejas':                { title: 'Soportes & Bandejas', eyebrow: 'Sim Racing · Accesorios' },
  'dashboards-y-button-boxes':          { title: 'Dashboards & Button Boxes', eyebrow: 'Sim Racing · Displays' },
  'custom-collection-10':               { title: 'DOFs & Haptics', eyebrow: 'Sim Racing · Motion' },
  'custom-collection-11':               { title: 'Asientos Racing', eyebrow: 'Sim Racing · Cockpits' },
  'smart-collection':                   { title: 'Monitor Stands', eyebrow: 'Sim Racing · Displays' },
  'monitores':                           { title: 'Monitores', eyebrow: 'PC Gaming · Displays' },
  'pcs':                                 { title: 'PCs Gaming', eyebrow: 'PC Gaming · Builds' },
  'procesadores':                        { title: 'Procesadores', eyebrow: 'PC Gaming · Componentes' },
  'ssd':                                 { title: 'SSD & Almacenamiento', eyebrow: 'PC Gaming · Storage' },
  'sonido':                              { title: 'Sonido & Audio', eyebrow: 'PC Gaming · Periféricos' },
  'asientos-flight':                     { title: 'Fly Sim', eyebrow: 'Flight Simulator · Bundles' },
  'controles-de-vuelo':                 { title: 'Controles de Vuelo', eyebrow: 'Flight Simulator · Controles' },
  'gorras-oficial-f1':                  { title: 'Merch F1 Oficial', eyebrow: 'Merch · Fórmula 1' },
  'gorras-motorsport':                  { title: 'Merch MotorSport', eyebrow: 'Merch · Motorsport' },
  'coleccionables':                      { title: 'Coleccionables', eyebrow: 'Merch · Die-Cast & Escala' },
  'juguetes':                            { title: 'Juguetes', eyebrow: 'Merch · Juguetes' },
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params
  const meta = COLLECTION_META[handle]

  if (!meta) notFound()

  let products: any[] = []
  let collectionTitle = meta.title

  try {
    const { getCollection } = await import('@/lib/shopify')
    const collection = await getCollection(handle, 24)
    if (collection) {
      products = collection.products.nodes
      collectionTitle = collection.title || meta.title
    }
  } catch (e) {
    console.log('Shopify token not configured yet')
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#555', borderBottom: '1px solid #1e1e1e' }}>
        <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Inicio</Link>
        <span style={{ color: '#333' }}>›</span>
        <span style={{ color: '#555' }}>Catálogo</span>
        <span style={{ color: '#333' }}>›</span>
        <span style={{ color: '#fff' }}>{collectionTitle}</span>
      </div>

      <div style={{ background: '#0a0a0a', padding: '28px 20px 20px', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase', color: '#cc2200', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#cc2200' }} />
            {meta.eyebrow}
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '48px', letterSpacing: '.06em', color: '#fff', lineHeight: 1, margin: 0 }}>
            {collectionTitle}
          </h1>
          <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#444', marginTop: '6px' }}>
            {products.length > 0 ? `${products.length} productos` : 'Cargando catálogo…'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', color: '#555' }}>Ordenar:</span>
          <select style={{ background: '#111', color: '#fff', border: '1px solid #1e1e1e', padding: '6px 10px', fontSize: '12px', outline: 'none', cursor: 'pointer' }}>
            <option>Destacados</option>
            <option>Precio: menor a mayor</option>
            <option>Precio: mayor a menor</option>
            <option>Nombre A–Z</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr' }}>
        <div style={{ borderRight: '1px solid #1e1e1e', paddingTop: '8px' }}>
          {[
            { title: 'Marca', items: products.length > 0 ? Array.from(new Set(products.map((p: any) => p.vendor).filter(Boolean))) as string[] : ['Fanatec', 'Moza Racing', 'Heusinkveld', 'Simucube'] },
            { title: 'Precio (USD)', items: ['Menos de $500', '$500 – $1,500', '$1,500 – $3,000', 'Más de $3,000'] },
            { title: 'Disponibilidad', items: ['En stock', 'Importación', 'En oferta'] },
          ].map(section => (
            <div key={section.title} style={{ borderBottom: '1px solid #1e1e1e' }}>
              <div style={{ padding: '12px 16px', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: '#555' }}>
                {section.title}
              </div>
              {section.items.map((item: string) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 16px', fontSize: '12px', color: '#555', cursor: 'pointer' }}>
                  <div style={{ width: '13px', height: '13px', border: '1px solid #2a2a2a', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #1e1e1e' }}>
            <span style={{ fontSize: '11px', color: '#555' }}>
              {products.length > 0 ? `Mostrando 1–${products.length} de ${products.length} productos` : 'Conectando con catálogo Shopify…'}
            </span>
          </div>

          {products.length === 0 ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1e1e1e' }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ background: '#000' }}>
                    <div style={{ width: '100%', aspectRatio: '1', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #1e1e1e', opacity: 0.3 }} />
                    </div>
                    <div style={{ padding: '12px 14px 18px' }}>
                      <div style={{ height: '10px', background: '#111', width: '40%', marginBottom: '8px' }} />
                      <div style={{ height: '13px', background: '#111', width: '80%', marginBottom: '6px' }} />
                      <div style={{ height: '13px', background: '#111', width: '60%', marginBottom: '10px' }} />
                      <div style={{ height: '15px', background: '#111', width: '30%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #1e1e1e' }}>
                <p style={{ fontSize: '12px', color: '#444', fontFamily: "'Roboto Condensed', sans-serif", letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  ⚙ Pendiente: configurar Storefront API token en .env.local
                </p>
                <Link href={`https://689rigs.com/collections/${handle}`} target="_blank" style={{ display: 'inline-block', marginTop: '12px', padding: '8px 20px', background: '#cc2200', color: '#fff', fontSize: '10px', fontFamily: "'Roboto Condensed', sans-serif", fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
                  Ver en tienda actual →
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1e1e1e' }}>
              {products.map((product: any) => {
                const price = parseFloat(product.priceRange.minVariantPrice.amount)
                const comparePrice = parseFloat(product.compareAtPriceRange?.minVariantPrice?.amount ?? '0')
                const onSale = comparePrice > 0 && comparePrice > price
                const currency = product.priceRange.minVariantPrice.currencyCode
                const fmt = (n: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
                const isImport = product.tags?.some((t: string) => ['importacion','import','importación'].includes(t.toLowerCase()))
                const isNew = product.tags?.some((t: string) => ['nuevo','new'].includes(t.toLowerCase()))
                return (
                  <Link key={product.id} href={`/products/${product.handle}`} style={{ background: '#000', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '100%', aspectRatio: '1', background: '#111', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {product.featuredImage ? (
                        <img src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '12px', mixBlendMode: 'lighten' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', opacity: 0.1, border: '1px solid #fff', borderRadius: '50%' }} />
                      )}
                      {onSale && <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#cc2200', color: '#fff', fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '3px 7px' }}>Oferta</span>}
                      {!onSale && isImport && <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'transparent', color: '#cc2200', border: '1px solid #cc2200', fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '3px 7px' }}>Import</span>}
                      {!onSale && !isImport && isNew && <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'transparent', color: '#00cc44', border: '1px solid #00cc44', fontSize: '9px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', padding: '3px 7px' }}>Nuevo</span>}
                    </div>
                    <div style={{ padding: '12px 14px 0', flex: 1 }}>
                      <div style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: '#555', marginBottom: '3px' }}>{product.vendor}</div>
                      <div style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.4, marginBottom: '8px' }}>{product.title}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 600, color: onSale ? '#cc2200' : '#fff' }}>{fmt(price)}</span>
                        {onSale && <span style={{ fontSize: '12px', color: '#444', textDecoration: 'line-through' }}>{fmt(comparePrice)}</span>}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #1e1e1e', color: '#555', fontFamily: "'Roboto Condensed', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', padding: '9px 14px', marginTop: '12px' }}>
                      Ver producto →
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
