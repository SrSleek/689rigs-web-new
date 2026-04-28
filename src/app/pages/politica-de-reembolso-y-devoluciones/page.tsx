import Link from 'next/link'

export const metadata = {
  title: 'Política de Reembolso y Devoluciones | 689 Rigs',
  description: 'Conoce nuestra política de reembolso, devoluciones y garantía en 689 Rigs. Importación directa EE.UU.',
}

export default function PoliticaDevolucionesPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      {/* Breadcrumb */}
      <div style={{
        borderBottom: '1px solid #1e1e1e',
        padding: '10px 0',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '11px', color: '#555',
        }}>
          <Link href="/" style={{ color: '#555', textDecoration: 'none' }}>Inicio</Link>
          <span>›</span>
          <span style={{ color: '#fff' }}>Política de Reembolso y Devoluciones</span>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '10px', fontWeight: 700, letterSpacing: '.22em',
            textTransform: 'uppercase', color: '#cc2200', marginBottom: '8px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ display: 'inline-block', width: '20px', height: '1px', background: '#cc2200' }} />
            689 Rigs
          </div>
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '.04em', color: '#fff', lineHeight: 1.1, margin: '0 0 12px',
          }}>
            Política de Reembolso y Devoluciones
          </h1>
          <p style={{
            fontSize: '13px', color: '#555', lineHeight: 1.6,
            fontFamily: "'Roboto Condensed', sans-serif",
          }}>
            Última actualización: Abril 2026 · Aplica a todas las compras realizadas en 689rigs.com y en nuestra tienda física.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* 1. General */}
          <Section number="01" title="Compromiso de Satisfacción">
            <P>
              En 689 Rigs nos importa que estés completamente satisfecho con tu compra. Si por cualquier motivo
              no estás conforme con el producto recibido, puedes solicitar una devolución o cambio dentro del plazo
              establecido en esta política.
            </P>
          </Section>

          {/* 2. Plazo */}
          <Section number="02" title="Plazo para Devoluciones">
            <P>
              Tienes un plazo máximo de <Strong>7 días naturales</Strong> a partir de la fecha de recepción del
              producto para solicitar una devolución o cambio. Pasado este periodo, no se aceptarán devoluciones
              salvo en casos de garantía por defecto de fábrica.
            </P>
          </Section>

          {/* 3. Condiciones */}
          <Section number="03" title="Condiciones para Aceptar una Devolución">
            <P>Para que tu devolución sea aceptada, el producto debe cumplir con las siguientes condiciones:</P>
            <Ul items={[
              'El producto debe estar en su empaque original, sin daños ni alteraciones.',
              'Debe incluir todos los accesorios, manuales, cables y componentes con los que fue entregado.',
              'No debe presentar signos de uso, instalación, rayones, golpes ni modificaciones.',
              'Debes presentar tu comprobante de compra (ticket, factura o confirmación de pedido).',
              'Los productos de higiene personal (guantes, cascos, audifonos) no aceptan devolución una vez abiertos, salvo defecto de fábrica.',
            ]} />
          </Section>

          {/* 4. Proceso */}
          <Section number="04" title="¿Cómo Solicitar una Devolución?">
            <P>El proceso es sencillo:</P>
            <Ol items={[
              'Contáctanos por WhatsApp al +52 221 569 8976 o al correo marketing@689rigs.com indicando tu número de pedido y el motivo de la devolución.',
              'Nuestro equipo revisará tu solicitud y te confirmará si procede dentro de un plazo de 1 a 3 días hábiles.',
              'Una vez aprobada, te indicaremos las instrucciones para enviar o entregar el producto.',
              'Al recibir y verificar el estado del producto, procederemos con el reembolso o crédito según tu preferencia.',
            ]} />
          </Section>

          {/* 5. Envío de devolución */}
          <Section number="05" title="Costos de Envío en Devoluciones">
            <P>El costo del envío de devolución depende del motivo:</P>
            <Ul items={[
              'Producto defectuoso, dañado o diferente al solicitado: 689 Rigs cubre el costo del envío de devolución.',
              'Cambio de opinión, talla incorrecta u otra razón personal: El cliente cubre el costo del envío de devolución.',
            ]} />
            <P>
              Si realizaste tu compra en nuestra tienda física en Barrio Cascatta, Puebla, puedes traer el producto
              directamente sin costo adicional.
            </P>
          </Section>

          {/* 6. Reembolso */}
          <Section number="06" title="Formas de Reembolso">
            <P>Una vez verificado el producto devuelto, puedes elegir entre:</P>
            <Ul items={[
              'Reembolso al método de pago original: Se procesará en un plazo de 5 a 10 días hábiles dependiendo de tu banco o institución financiera.',
              'Crédito en tienda: Se acredita de inmediato a tu cuenta y puede ser utilizado en cualquier producto de 689rigs.com o en tienda física. El crédito no tiene fecha de vencimiento.',
            ]} />
          </Section>

          {/* 7. Productos de importación */}
          <Section number="07" title="Productos de Importación">
            <P>
              Debido a que la mayoría de nuestros productos son importados directamente de Estados Unidos,
              aplican las siguientes consideraciones especiales:
            </P>
            <Ul items={[
              'Los tiempos de entrega de productos de importación pueden variar entre 2 y 6 semanas.',
              'Los productos de importación bajo pedido (no disponibles en inventario local) no aceptan cancelación una vez que el pedido ha sido procesado con nuestro proveedor.',
              'En caso de defecto de fábrica en un producto importado, 689 Rigs gestionará la garantía directamente con el fabricante.',
              'Los costos de aduana e importación ya están incluidos en el precio publicado.',
            ]} />
          </Section>

          {/* 8. Garantía */}
          <Section number="08" title="Garantía">
            <P>
              Todos nuestros productos cuentan con garantía del fabricante. El periodo de garantía varía según
              la marca y tipo de producto. En caso de falla por defecto de fábrica fuera del periodo de los 7 días
              de devolución, contáctanos para gestionar la garantía con el fabricante.
            </P>
            <P>
              La garantía <Strong>no cubre</Strong>: daños por mal uso, caídas, modificaciones no autorizadas,
              desgaste normal, daños por líquidos ni instalación incorrecta.
            </P>
          </Section>

          {/* 9. Productos no retornables */}
          <Section number="09" title="Productos No Retornables">
            <P>Los siguientes productos no aceptan devolución ni cambio:</P>
            <Ul items={[
              'Productos de higiene personal abiertos o usados (guantes, cascos, audífonos in-ear).',
              'Software, licencias digitales y tarjetas de regalo.',
              'Productos personalizados o hechos a medida (impresiones 3D personalizadas, configuraciones custom).',
              'Productos en oferta o liquidación marcados como "Venta Final".',
              'Productos de importación bajo pedido una vez procesada la orden con el proveedor.',
            ]} />
          </Section>

          {/* 10. Cambios */}
          <Section number="10" title="Cambios de Producto">
            <P>
              Si deseas cambiar un producto por otro modelo, talla o color, aplican las mismas condiciones que
              para una devolución. Si el nuevo producto tiene un precio mayor, se te cobrará la diferencia. Si
              tiene un precio menor, la diferencia se acreditará como crédito en tienda.
            </P>
          </Section>

          {/* 11. Contacto */}
          <Section number="11" title="Contacto">
            <P>¿Tienes dudas sobre tu devolución? Contáctanos:</P>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              padding: '16px', background: '#0a0a0a', border: '1px solid #1e1e1e',
              marginTop: '12px',
            }}>
              <ContactItem icon="📱" label="WhatsApp" value="+52 221 569 8976" href="https://wa.me/522215698976" />
              <ContactItem icon="📧" label="Email" value="marketing@689rigs.com" href="mailto:689.accessories@gmail.com" />
              <ContactItem icon="📍" label="Tienda" value="Barrio Cascatta, Puebla · Lun–Dom 12pm–09pm" />
              <ContactItem icon="📷" label="Instagram" value="@689.rigs" href="https://instagram.com/689.rigs" />
            </div>
          </Section>

        </div>

        {/* Footer note */}
        <div style={{
          marginTop: '48px', paddingTop: '24px',
          borderTop: '1px solid #1e1e1e',
          fontSize: '11px', color: '#333', lineHeight: 1.8,
          fontFamily: "'Roboto Condensed', sans-serif",
        }}>
          689 Rigs se reserva el derecho de modificar esta política en cualquier momento. Los cambios serán
          publicados en esta página y aplicarán a compras realizadas a partir de la fecha de actualización.
          Esta política se rige por las leyes aplicables de los Estados Unidos Mexicanos, incluyendo la
          Ley Federal de Protección al Consumidor.
        </div>
      </div>
    </div>
  )
}

/* ── Helper Components ── */

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '28px', color: '#1a1a1a', letterSpacing: '.04em',
        }}>{number}</span>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '22px', letterSpacing: '.04em',
          color: '#fff', margin: 0,
        }}>{title}</h2>
      </div>
      <div style={{ paddingLeft: '0' }}>{children}</div>
    </div>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '13px', color: '#999', lineHeight: 1.9,
      margin: '0 0 10px', fontWeight: 300,
    }}>{children}</p>
  )
}

function Strong({ children }: { children: React.ReactNode }) {
  return <strong style={{ color: '#fff', fontWeight: 600 }}>{children}</strong>
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul style={{
      margin: '8px 0 12px', paddingLeft: '18px',
      fontSize: '13px', color: '#999', lineHeight: 2,
      fontWeight: 300, listStyleType: 'none',
    }}>
      {items.map((item, i) => (
        <li key={i} style={{ position: 'relative', paddingLeft: '16px' }}>
          <span style={{ position: 'absolute', left: 0, color: '#cc2200' }}>—</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Ol({ items }: { items: string[] }) {
  return (
    <ol style={{
      margin: '8px 0 12px', paddingLeft: '0',
      fontSize: '13px', color: '#999', lineHeight: 2,
      fontWeight: 300, listStyleType: 'none', counterReset: 'step',
    }}>
      {items.map((item, i) => (
        <li key={i} style={{
          position: 'relative', paddingLeft: '28px', counterIncrement: 'step',
          marginBottom: '4px',
        }}>
          <span style={{
            position: 'absolute', left: 0, color: '#cc2200',
            fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px',
            letterSpacing: '.04em',
          }}>{String(i + 1).padStart(2, '0')}</span>
          {item}
        </li>
      ))}
    </ol>
  )
}

function ContactItem({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      <span style={{ fontSize: '11px', color: '#555', fontWeight: 600, minWidth: '70px' }}>{label}:</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{
          fontSize: '12px', color: '#cc2200', textDecoration: 'none',
        }}>{value}</a>
      ) : (
        <span style={{ fontSize: '12px', color: '#999' }}>{value}</span>
      )}
    </div>
  )
}
