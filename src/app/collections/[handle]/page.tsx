import Link from 'next/link'
import { getCollection, type ShopifyProduct } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'

interface Props {
  params: Promise<{ handle: string }>
}

/* ── Mapa de breadcrumb ── */
interface BreadcrumbInfo { parent: string; parentHref: string; eyebrow: string }

const BREADCRUMB_MAP: Record<string, BreadcrumbInfo> = {
  'rigs':                                { parent: 'Sim Racing', parentHref: '/collections/rigs', eyebrow: 'Sim Racing · Bundles' },
  'collections-cockpits':               { parent: 'Sim Racing', parentHref: '/collections/collections-cockpits', eyebrow: 'Sim Racing · Cockpits' },
  'smart-collection':                   { parent: 'Sim Racing', parentHref: '/collections/smart-collection', eyebrow: 'Sim Racing · Monitor Stands' },
  'custom-collection-11':               { parent: 'Sim Racing', parentHref: '/collections/custom-collection-11', eyebrow: 'Sim Racing · Asientos' },
  'servos-dd':                           { parent: 'Sim Racing', parentHref: '/collections/servos-dd', eyebrow: 'Sim Racing · Bases DD' },
  'volantes':                            { parent: 'Sim Racing', parentHref: '/collections/volantes', eyebrow: 'Sim Racing · Controles' },
  'pedales':                             { parent: 'Sim Racing', parentHref: '/collections/pedales', eyebrow: 'Sim Racing · Controles' },
  'palanca-de-cambios-y-frenos-de-mano': { parent: 'Sim Racing', parentHref: '/collections/palanca-de-cambios-y-frenos-de-mano', eyebrow: 'Sim Racing · Controles' },
  'dashboards-y-button-boxes':          { parent: 'Sim Racing', parentHref: '/collections/dashboards-y-button-boxes', eyebrow: 'Sim Racing · Displays' },
  'custom-collection-10':               { parent: 'Sim Racing', parentHref: '/collections/custom-collection-10', eyebrow: 'Sim Racing · Motion' },
  'soportes-y-bandejas':                { parent: 'Sim Racing', parentHref: '/collections/soportes-y-bandejas', eyebrow: 'Sim Racing · Accesorios' },
  'sonido':                              { parent: 'Sim Racing', parentHref: '/collections/sonido', eyebrow: 'Sim Racing · Audio' },
  'monitores':                           { parent: 'Sim Racing', parentHref: '/collections/monitores', eyebrow: 'Sim Racing · Displays' },
  'pcs':                                 { parent: 'PC Gaming', parentHref: '/collections/pcs', eyebrow: 'PC Gaming · Builds' },
  'procesadores':                        { parent: 'PC Gaming', parentHref: '/collections/procesadores', eyebrow: 'PC Gaming · Componentes' },
  'ssd':                                 { parent: 'PC Gaming', parentHref: '/collections/ssd', eyebrow: 'PC Gaming · Almacenamiento' },
  'almacenamiento':                      { parent: 'PC Gaming', parentHref: '/collections/almacenamiento', eyebrow: 'PC Gaming · Almacenamiento' },
  'tarjetas-de-video':                  { parent: 'PC Gaming', parentHref: '/collections/tarjetas-de-video', eyebrow: 'PC Gaming · Componentes' },
  'motherboards':                        { parent: 'PC Gaming', parentHref: '/collections/motherboards', eyebrow: 'PC Gaming · Componentes' },
  'ram':                                 { parent: 'PC Gaming', parentHref: '/collections/ram', eyebrow: 'PC Gaming · Componentes' },
  'fuentes-de-poder':                   { parent: 'PC Gaming', parentHref: '/collections/fuentes-de-poder', eyebrow: 'PC Gaming · Componentes' },
  'gabinetes':                           { parent: 'PC Gaming', parentHref: '/collections/gabinetes', eyebrow: 'PC Gaming · Componentes' },
  'enfriamiento':                        { parent: 'PC Gaming', parentHref: '/collections/enfriamiento', eyebrow: 'PC Gaming · Componentes' },
  'asientos-flight':                     { parent: 'Fly Sim', parentHref: '/collections/asientos-flight', eyebrow: 'Fly Sim · Bundles' },
  'controles-de-vuelo':                 { parent: 'Fly Sim', parentHref: '/collections/controles-de-vuelo', eyebrow: 'Fly Sim · Controles' },
  'gorras-oficial-f1':                  { parent: 'Merch & Coleccionables', parentHref: '/collections/gorras-oficial-f1', eyebrow: 'Merch · Fórmula 1' },
  'gorras-motorsport':                  { parent: 'Merch & Coleccionables', parentHref: '/collections/gorras-motorsport', eyebrow: 'Merch · Motorsport' },
  'coleccionables':                      { parent: 'Merch & Coleccionables', parentHref: '/collections/coleccionables', eyebrow: 'Merch · Die-Cast & Escala' },
  'juguetes':                            { parent: 'Merch & Coleccionables', parentHref: '/collections/juguetes', eyebrow: 'Merch · Juguetes' },
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params

  let products: ShopifyProduct[] = []
  let collectionTitle = handle.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  let collectionDescription = ''
  let shopifyError = false

  try {
    const collection = await getCollection(handle, 48)
    if (collection) {
      products = collection.products.nodes
      collectionTitle = collection.title || collectionTitle
      collectionDescription = collection.description || ''
    } else {
      shopifyError = true
    }
  } catch (e) {
    console.error('Shopify error:', e)
    shopifyError = true
  }

  const info = BREADCRUMB_MAP[handle]
  const eyebrow = info?.eyebrow || 'Catálogo'
  const parentLabel = info?.parent || 'Catálogo'

  return (
    <div className="col-page">
      {/* Breadcrumb */}
      <div className="col-page__breadcrumb">
        <div className="col-page__container">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <span>Catálogo</span>
          {parentLabel !== 'Catálogo' && (
            <>
              <span>›</span>
              <span>{parentLabel}</span>
            </>
          )}
          <span>›</span>
          <span className="col-page__breadcrumb-current">{collectionTitle}</span>
        </div>
      </div>

      {/* Header */}
      <div className="col-page__header">
        <div className="col-page__container">
          <div className="col-page__header-inner">
            <div>
              <div className="col-page__eyebrow">
                <span className="col-page__eyebrow-line" />
                {eyebrow}
              </div>
              <h1 className="col-page__title">{collectionTitle}</h1>
              <div className="col-page__count">
                {products.length > 0 ? `${products.length} productos` : shopifyError ? 'Error conectando con Shopify' : 'Cargando catálogo…'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="col-page__container">
        {products.length === 0 ? (
          <div className="col-page__empty">
            <p>
              {shopifyError
                ? '⚠ Error conectando con Shopify — verifica tu token en .env.local'
                : '⚙ Cargando productos…'}
            </p>
            <Link href={`https://689rigs.com/collections/${handle}`} target="_blank" className="col-page__fallback-btn">
              Ver en tienda actual →
            </Link>
          </div>
        ) : (
          <div className="col-page__grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
