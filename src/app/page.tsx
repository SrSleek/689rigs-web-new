import Link from 'next/link'
import { getCollection, getCollectionImages, type ShopifyProduct } from '@/lib/shopify'
import ProductCard from '@/components/ProductCard'
import CollectionStrip from '@/components/CollectionStrip'

/* ══════════════════════════════════════════════════════════════
   689 RIGS — HOMEPAGE v2 (Parte 3)
   ══════════════════════════════════════════════════════════════ */

/* ── Configuración de secciones ────────────────────────────── */
interface CollectionCard {
  label: string
  href: string
  handle: string
}

interface ProductSection {
  id: string
  title: string
  eyebrow: string
  importNote: string
  collectionHandle: string
  collections: CollectionCard[]
}

const SECTIONS: ProductSection[] = [
  {
    id: 'simracing',
    title: 'Sim Racing',
    eyebrow: 'Simuladores de Carrera',
    importNote: 'Buscas algo en especial de importación? Pregúntanos!',
    collectionHandle: 'servos-dd',
    collections: [
      { label: 'Bases DD / Servos', href: '/collections/servos-dd', handle: 'servos-dd' },
      { label: 'Volantes', href: '/collections/volantes', handle: 'volantes' },
      { label: 'Pedales', href: '/collections/pedales', handle: 'pedales' },
      { label: 'Cockpits & Rigs', href: '/collections/collections-cockpits', handle: 'collections-cockpits' },
      { label: 'Asientos Racing', href: '/collections/custom-collection-11', handle: 'custom-collection-11' },
      { label: 'Accesorios', href: '/collections/soportes-y-bandejas', handle: 'soportes-y-bandejas' },
    ],
  },
  {
    id: 'flysim',
    title: 'Flight Sim',
    eyebrow: 'Simuladores de Vuelo',
    importNote: 'Buscas algo en especial de importación? Pregúntanos!',
    collectionHandle: 'controles-de-vuelo',
    collections: [
      { label: 'Controles de Vuelo', href: '/collections/controles-de-vuelo', handle: 'controles-de-vuelo' },
      { label: 'Bundles Vuelo', href: '/collections/asientos-flight', handle: 'asientos-flight' },
      { label: 'Asientos Flight', href: '/collections/asientos-flight', handle: 'asientos-flight' },
      { label: 'Monitor Stands', href: '/collections/smart-collection', handle: 'smart-collection' },
    ],
  },
  {
    id: 'pcgaming',
    title: 'PC Hardware',
    eyebrow: 'Componentes y Periféricos',
    importNote: 'Buscas algo en especial de importación? Pregúntanos!',
    collectionHandle: 'pcs',
    collections: [
      { label: 'PCs Completas', href: '/collections/pcs', handle: 'pcs' },
      { label: 'Procesadores', href: '/collections/procesadores', handle: 'procesadores' },
      { label: 'SSD & Storage', href: '/collections/ssd', handle: 'ssd' },
      { label: 'Monitores', href: '/collections/monitores', handle: 'monitores' },
      { label: 'Sonido & Audio', href: '/collections/sonido', handle: 'sonido' },
      { label: 'Accesorios', href: '/collections/soportes-y-bandejas', handle: 'soportes-y-bandejas' },
    ],
  },
  {
    id: 'merch',
    title: 'Merch & Coleccionables',
    eyebrow: 'Oficial F1 · Motorsport · Die-Cast',
    importNote: '',
    collectionHandle: 'gorras-oficial-f1',
    collections: [
      { label: 'Gorras F1 Oficial', href: '/collections/gorras-oficial-f1', handle: 'gorras-oficial-f1' },
      { label: 'Gorras MotorSport', href: '/collections/gorras-motorsport', handle: 'gorras-motorsport' },
      { label: 'Coleccionables', href: '/collections/coleccionables', handle: 'coleccionables' },
      { label: 'Juguetes', href: '/collections/juguetes', handle: 'juguetes' },
    ],
  },
  /* ── NUEVAS SECCIONES (Parte 3) ──────────────────────────── */
  {
    id: 'nuevos',
    title: 'Nuevos Productos',
    eyebrow: 'Lo más reciente en la tienda',
    importNote: 'Buscas algo en especial de importación? Pregúntanos!',
    collectionHandle: 'nuevos-productos',
    collections: [
      { label: 'Sim Racing', href: '/collections/servos-dd', handle: 'servos-dd' },
      { label: 'Flight Sim', href: '/collections/controles-de-vuelo', handle: 'controles-de-vuelo' },
      { label: 'PC Hardware', href: '/collections/pcs', handle: 'pcs' },
      { label: 'Monitores', href: '/collections/monitores', handle: 'monitores' },
      { label: 'Accesorios', href: '/collections/soportes-y-bandejas', handle: 'soportes-y-bandejas' },
    ],
  },
  {
    id: 'bestsellers',
    title: 'Más Vendidos',
    eyebrow: 'Los favoritos de nuestros clientes',
    importNote: '',
    collectionHandle: 'best-sellers',
    collections: [
      { label: 'Sim Racing', href: '/collections/servos-dd', handle: 'servos-dd' },
      { label: 'Cockpits', href: '/collections/collections-cockpits', handle: 'collections-cockpits' },
      { label: 'Volantes', href: '/collections/volantes', handle: 'volantes' },
      { label: 'Pedales', href: '/collections/pedales', handle: 'pedales' },
      { label: 'Merch F1', href: '/collections/gorras-oficial-f1', handle: 'gorras-oficial-f1' },
    ],
  },
]

const CATEGORY_TAGS = [
  { label: 'Sim Racing', href: '/collections/servos-dd' },
  { label: 'PC Hardware', href: '/collections/pcs' },
  { label: 'Fly Sim', href: '/collections/controles-de-vuelo' },
  { label: 'Merch F1', href: '/collections/gorras-oficial-f1' },
  { label: 'Coleccionables', href: '/collections/coleccionables' },
  { label: 'Monitores', href: '/collections/monitores' },
  { label: 'Audio', href: '/collections/sonido' },
  { label: 'Cockpits', href: '/collections/collections-cockpits' },
  { label: 'Volantes', href: '/collections/volantes' },
  { label: 'Pedales', href: '/collections/pedales' },
  { label: 'Asientos', href: '/collections/custom-collection-11' },
  { label: 'Importación', href: '/pages/importacion' },
]

/* ── Fetch helpers ─────────────────────────────────────────── */

/** Fetch 1 product from each collection in the category, then shuffle to show variety */
async function getMixedSectionProducts(
  collections: CollectionCard[],
  totalCount = 4
): Promise<ShopifyProduct[]> {
  try {
    // Fetch 2 products from each collection in parallel
    const results = await Promise.all(
      collections.map(col =>
        getCollection(col.handle, 2)
          .then(c => c?.products.nodes ?? [])
          .catch(() => [])
      )
    )

    // Flatten all products and remove duplicates by id
    const seen = new Set<string>()
    const allProducts: ShopifyProduct[] = []
    
    // Round-robin: take 1 from each collection first, then 1 more from each
    for (let round = 0; round < 2; round++) {
      for (const collectionProducts of results) {
        if (collectionProducts[round] && !seen.has(collectionProducts[round].id)) {
          seen.add(collectionProducts[round].id)
          allProducts.push(collectionProducts[round])
        }
      }
    }

    // Return first N products (already mixed from different collections)
    return allProducts.slice(0, totalCount)
  } catch {
    return []
  }
}

/* ── PromoBanner (solo imagen) ─────────────────────────────── */
function PromoBanner({ id }: { id: number }) {
  return (
    <div className="promo-banner-img">
      <Link href={id === 1 ? '/pages/importacion' : '/collections/ofertas'}>
        <img
          src={`/banner-promo-${id}.jpg`}
          alt={`Promoción ${id}`}
          className="promo-banner-img__image"
        />
      </Link>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   HOMEPAGE
   ══════════════════════════════════════════════════════════════ */
export default async function HomePage() {
  // Fetch products and collection images in parallel
  const allCollectionHandles = [...new Set(SECTIONS.flatMap(s => s.collections.map(c => c.handle)))]
  
  const [sectionProducts, collectionImages] = await Promise.all([
    Promise.all(SECTIONS.map(s => getMixedSectionProducts(s.collections, 4))),
    getCollectionImages(allCollectionHandles).catch(() => ({} as Record<string, string | null>)),
  ])

  return (
    <div className="homepage">
      {/* ── 1. HERO ───────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__grid">
          <div className="hero__info">
            <div className="hero__badge">SIM CENTER CLUB</div>
            <h1 className="hero__title">689 RIGS</h1>
            <p className="hero__subtitle">Simuladores de Carrera & Hardware</p>
            <div className="hero__details">
              <div className="hero__detail-item">
                <span className="hero__detail-icon">📍</span>
                <div>
                  <strong>Barrio Cascatta, Puebla</strong>
                  <br />
                  <span className="hero__detail-sub">Local 2do piso</span>
                </div>
              </div>
              <div className="hero__detail-item">
                <span className="hero__detail-icon">🕐</span>
                <div>
                  <strong>Lunes – Jueves</strong> 12pm – 9pm
                  <br />
                  <strong>Viernes – Domingo</strong> 12pm – 10pm
                </div>
              </div>
            </div>
            <div className="hero__actions">
              <Link href="https://maps.google.com/?q=689+Rigs+Barrio+Cascatta+Puebla" target="_blank" className="hero__btn hero__btn--primary">
                📍 Cómo llegar
              </Link>
              <Link href="/pages/sim-center" className="hero__btn hero__btn--secondary">
                Conoce el local →
              </Link>
            </div>
          </div>
          <div className="hero__image">
            <img src="/hero-local.png" alt="689 Rigs Sim Center Club - Barrio Cascatta, Puebla" />
            <div className="hero__image-overlay">
              <span>PRUEBA ANTES DE COMPRAR</span>
            </div>
          </div>
          <Link href="https://maps.google.com/?q=689+Rigs+Barrio+Cascatta+Puebla" target="_blank" className="hero__map">
            <div className="hero__map-bg" />
            <div className="hero__map-overlay">
              <span className="hero__map-label">📍 VER EN GOOGLE MAPS →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 2. CATEGORY TAGS ──────────────────────────────── */}
      <section className="category-tags">
        <div className="category-tags__scroll">
          {CATEGORY_TAGS.map(tag => (
            <Link key={tag.label} href={tag.href} className="category-tags__tag">
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3–8. PRODUCT SECTIONS (4 original + 2 new) ──── */}
      {SECTIONS.map((section, idx) => (
        <div key={section.id}>
          {section.importNote && (
            <div className="import-note">
              <span className="import-note__line" />
              <span className="import-note__text">{section.importNote}</span>
              <span className="import-note__line" />
            </div>
          )}

          <section className="product-section" id={section.id}>
            <div className="product-section__header">
              <h2 className="product-section__title">{section.title}</h2>
              <span className="product-section__eyebrow">{section.eyebrow}</span>
            </div>

            <div className="product-section__grid">
              {sectionProducts[idx].length > 0
                ? sectionProducts[idx].map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                : Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="product-card product-card--skeleton">
                      <div className="product-card__image"><div className="product-card__placeholder" /></div>
                      <div className="product-card__info">
                        <div style={{ height: 10, background: '#111', width: '40%', marginBottom: 6 }} />
                        <div style={{ height: 13, background: '#111', width: '80%', marginBottom: 6 }} />
                        <div style={{ height: 15, background: '#111', width: '30%' }} />
                      </div>
                    </div>
                  ))
              }
            </div>

            <CollectionStrip collections={section.collections} collectionImages={collectionImages} />
          </section>

          {/* Banner cada 2 secciones */}
          {(idx + 1) % 2 === 0 && idx < SECTIONS.length && (
            <PromoBanner id={Math.floor((idx + 1) / 2)} />
          )}
        </div>
      ))}

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__content">
          <div className="site-footer__col">
            <h4 className="site-footer__heading">General</h4>
            <Link href="/pages/about" className="site-footer__link">Sobre Nosotros</Link>
            <Link href="/pages/sim-center" className="site-footer__link">Sim Center Club</Link>
            <Link href="https://maps.google.com/?q=689+Rigs+Barrio+Cascatta+Puebla" target="_blank" className="site-footer__link">Ubicación · Google Maps</Link>
            <Link href="/pages/importacion" className="site-footer__link">Importación EE.UU.</Link>
          </div>
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Soporte</h4>
            <Link href="https://689rigs.com/pages/politica-de-reembolso-y-devoluciones" target="_blank" className="site-footer__link">Devoluciones y Reembolsos</Link>
            <Link href="/pages/envios" className="site-footer__link">Política de Envío</Link>
            <Link href="/pages/pagos" className="site-footer__link">Métodos de Pago</Link>
            <Link href="/pages/preguntas-frecuentes" className="site-footer__link">Preguntas Frecuentes</Link>
          </div>
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Legal</h4>
            <Link href="https://689rigs.com/pages/avisodeprivacidad" target="_blank" className="site-footer__link">Aviso de Privacidad</Link>
            <Link href="/pages/terminos" className="site-footer__link">Términos y Condiciones</Link>
          </div>
          <div className="site-footer__col">
            <h4 className="site-footer__heading">Contacto</h4>
            <Link href="https://wa.me/522215698976" target="_blank" className="site-footer__link">💬 WhatsApp: +52 221 569 8976</Link>
            <Link href="mailto:689.accessories@gmail.com" className="site-footer__link">✉ 689.accessories@gmail.com</Link>
            <div className="site-footer__socials">
              <Link href="https://instagram.com/689.rigs" target="_blank" className="site-footer__social" aria-label="Instagram 689.rigs">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </Link>
              <Link href="https://instagram.com/689rigs.simcenterclub" target="_blank" className="site-footer__social" aria-label="Instagram Sim Center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
              </Link>
              <Link href="https://tiktok.com/@689.rigs" target="_blank" className="site-footer__social" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.83 4.83 0 01-1-.15z" /></svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} 689 Rigs — Simuladores de Carrera & Hardware · Puebla, México</span>
          <div className="site-footer__bottom-links">
            <Link href="https://689rigs.com/pages/avisodeprivacidad" target="_blank">Privacidad</Link>
            <Link href="/pages/terminos">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
