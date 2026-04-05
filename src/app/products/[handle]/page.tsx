import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/ProductGallery'
import ProductInfo from '@/components/ProductInfo'

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

  if (product === undefined) notFound()

  const title = product?.title ?? handle.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
  const vendor = product?.vendor ?? '689 Rigs'
  const price = product ? parseFloat(product.priceRange.minVariantPrice.amount) : 0
  const currency = product?.priceRange.minVariantPrice.currencyCode ?? 'USD'
  const images = product?.images?.nodes ?? []
  const mainImage = product?.featuredImage ?? null
  const description = product?.descriptionHtml ?? ''
  const variants = product?.variants?.nodes ?? []
  const options = product?.options ?? []

  return (
    <div className="pdp">
      {/* Breadcrumb */}
      <div className="pdp__breadcrumb">
        <div className="pdp__container">
          <Link href="/">Inicio</Link>
          <span>›</span>
          <span>Catálogo</span>
          <span>›</span>
          <span className="pdp__breadcrumb-current">{title}</span>
        </div>
      </div>

      {/* Product layout */}
      <div className="pdp__container">
        <div className="pdp__layout">

          {/* Images — interactive gallery */}
          <div className="pdp__images">
            <ProductGallery
              mainImage={mainImage}
              images={images}
              title={title}
            />
          </div>

          {/* Info */}
          <div className="pdp__info">
            <div className="pdp__vendor">{vendor}</div>
            <h1 className="pdp__title">{title}</h1>

            {/* Price + Variants + Add to Cart — all in one client component */}
            <ProductInfo
              variants={variants}
              options={options}
              defaultPrice={price}
              defaultCurrency={currency}
              whatsappUrl={`https://wa.me/522215698976?text=Hola! Me interesa: ${title}`}
            />

            {/* Shipping info */}
            <div className="pdp__shipping">
              {[
                { icon: '🚀', label: 'Importación directa EE.UU.', sub: 'Traemos este producto desde distribuidores en Estados Unidos' },
                { icon: '📍', label: 'Recoge en tienda', sub: 'Barrio Cascatta, Puebla · Lun–Dom 12–10pm' },
                { icon: '🚚', label: 'Envío a toda la República', sub: 'Calculamos costo de envío al confirmar pedido' },
              ].map(item => (
                <div key={item.label} className="pdp__shipping-item">
                  <span className="pdp__shipping-icon">{item.icon}</span>
                  <div>
                    <div className="pdp__shipping-label">{item.label}</div>
                    <div className="pdp__shipping-sub">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {description ? (
              <div className="pdp__description">
                <div className="pdp__description-title">Descripción</div>
                <div
                  className="pdp__description-body"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            ) : !product ? (
              <div className="pdp__description">
                <div className="pdp__connect-box">
                  <div className="pdp__connect-text">⚙ Conectando con catálogo Shopify…</div>
                  <Link href={`https://689rigs.com/products/${handle}`} target="_blank" className="pdp__connect-btn">
                    Ver en tienda actual →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
