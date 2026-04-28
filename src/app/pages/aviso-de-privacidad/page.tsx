import Link from 'next/link'

export const metadata = {
  title: 'Aviso de Privacidad | 689 Rigs',
  description: 'Aviso de privacidad de 689 Rigs. Conoce cómo protegemos y tratamos tus datos personales.',
}

export default function AvisoPrivacidadPage() {
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
          <span style={{ color: '#fff' }}>Aviso de Privacidad</span>
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
            Aviso de Privacidad
          </h1>
          <p style={{
            fontSize: '13px', color: '#555', lineHeight: 1.6,
            fontFamily: "'Roboto Condensed', sans-serif",
          }}>
            Última actualización: Abril 2026 · En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          <Section number="01" title="Identidad del Responsable">
            <P>
              <Strong>689 Rigs</Strong>, con domicilio en Barrio Cascatta, Puebla, Puebla, México,
              es responsable del tratamiento de sus datos personales conforme al presente Aviso de Privacidad.
            </P>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '6px',
              padding: '14px', background: '#0a0a0a', border: '1px solid #1e1e1e',
              marginTop: '10px', fontSize: '12px', color: '#777',
            }}>
              <span><Strong>Nombre comercial:</Strong> 689 Rigs / 689 Accessories</span>
              <span><Strong>Domicilio:</Strong> Barrio Cascatta, Local 2do Piso, Puebla, Puebla, México</span>
              <span><Strong>Correo electrónico:</Strong> marketing@689rigs.com</span>
              <span><Strong>Teléfono / WhatsApp:</Strong> +52 221 569 8976</span>
              <span><Strong>Sitio web:</Strong> www.689rigs.com</span>
            </div>
          </Section>

          <Section number="02" title="Datos Personales que Recabamos">
            <P>Para las finalidades señaladas en este aviso, podemos recabar las siguientes categorías de datos personales:</P>
            <Ul items={[
              'Datos de identificación: nombre completo.',
              'Datos de contacto: correo electrónico, número telefónico, dirección de envío.',
              'Datos de facturación: RFC, razón social, domicilio fiscal, régimen fiscal y código postal (cuando se solicite factura).',
              'Datos de navegación: dirección IP, tipo de navegador, páginas visitadas, cookies y datos analíticos del sitio.',
              'Datos de transacción: historial de compras, productos adquiridos, montos y método de pago (no almacenamos datos de tarjetas de crédito/débito).',
            ]} />
            <P>
              <Strong>689 Rigs no recaba datos personales sensibles</Strong> (origen étnico, estado de salud, creencias religiosas, orientación sexual, datos biométricos, entre otros).
            </P>
          </Section>

          <Section number="03" title="Finalidades del Tratamiento">
            <P>Sus datos personales serán utilizados para las siguientes finalidades necesarias:</P>
            <Ul items={[
              'Procesar y dar seguimiento a sus pedidos y compras.',
              'Realizar envíos y entregas de productos.',
              'Emitir facturas y comprobantes fiscales.',
              'Brindar atención al cliente y soporte postventa.',
              'Gestionar devoluciones, cambios y garantías.',
              'Dar cumplimiento a obligaciones legales y fiscales.',
            ]} />
            <P>De manera adicional y con su consentimiento, utilizaremos sus datos para:</P>
            <Ul items={[
              'Enviarle información sobre nuevos productos, ofertas y promociones.',
              'Invitarle a eventos, campeonatos y actividades de 689 Rigs.',
              'Realizar encuestas de satisfacción.',
              'Personalizar su experiencia de compra en nuestro sitio web.',
            ]} />
            <P>
              Si no desea que sus datos sean tratados para las finalidades adicionales, puede comunicarlo
              al correo marketing@689rigs.com en cualquier momento.
            </P>
          </Section>

          <Section number="04" title="Medios para Recabar Datos">
            <P>Recabamos sus datos personales a través de los siguientes medios:</P>
            <Ul items={[
              'Directamente: cuando realiza una compra en nuestra tienda física o en línea, cuando nos contacta por WhatsApp, correo electrónico o redes sociales.',
              'A través de nuestro sitio web: mediante formularios de contacto, registro de cuenta y proceso de checkout.',
              'De forma automática: mediante cookies y tecnologías de rastreo al navegar en 689rigs.com.',
            ]} />
          </Section>

          <Section number="05" title="Transferencia de Datos">
            <P>Sus datos personales pueden ser transferidos y tratados por terceros en los siguientes casos:</P>
            <Ul items={[
              'Proveedores de servicios de paquetería y mensajería para la entrega de sus pedidos.',
              'Plataformas de procesamiento de pagos (Shopify Payments, PayPal, entre otros) para completar sus transacciones. Estos proveedores cuentan con sus propias políticas de privacidad y seguridad.',
              'Proveedores de servicios tecnológicos (hosting, analytics, email marketing) necesarios para la operación del sitio web.',
              'Autoridades competentes cuando sea requerido por ley o mandato judicial.',
            ]} />
            <P>
              No vendemos, rentamos ni compartimos sus datos personales con terceros para fines de
              mercadotecnia sin su consentimiento expreso.
            </P>
          </Section>

          <Section number="06" title="Derechos ARCO">
            <P>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos
              personales (derechos ARCO). Para ejercer cualquiera de estos derechos, envíe una solicitud
              al correo electrónico <Strong>marketing@689rigs.com</Strong> con la siguiente información:
            </P>
            <Ol items={[
              'Nombre completo del titular de los datos.',
              'Descripción clara del derecho que desea ejercer y los datos sobre los que desea ejercerlo.',
              'Documento que acredite su identidad (copia de INE o pasaporte).',
              'Cualquier documento o información que facilite la localización de sus datos.',
            ]} />
            <P>
              Responderemos su solicitud en un plazo máximo de <Strong>20 días hábiles</Strong> contados
              a partir de la fecha de recepción. La respuesta indicará la procedencia de la solicitud y,
              en su caso, se hará efectiva dentro de los 15 días hábiles siguientes.
            </P>
          </Section>

          <Section number="07" title="Revocación del Consentimiento">
            <P>
              Usted puede revocar su consentimiento para el tratamiento de sus datos personales en cualquier
              momento, enviando una solicitud al correo marketing@689rigs.com. Tenga en cuenta que en
              algunos casos no podremos atender su solicitud de manera inmediata si los datos son necesarios
              para el cumplimiento de obligaciones legales o contractuales vigentes.
            </P>
          </Section>

          <Section number="08" title="Uso de Cookies y Tecnologías de Rastreo">
            <P>
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de
              navegación, analizar el tráfico del sitio y personalizar contenido. Las cookies que utilizamos son:
            </P>
            <Ul items={[
              'Cookies esenciales: necesarias para el funcionamiento del sitio (carrito de compras, sesión, preferencias de idioma y moneda).',
              'Cookies analíticas: nos permiten entender cómo los visitantes interactúan con el sitio (Vercel Analytics).',
              'Cookies de geolocalización: para detectar su país y mostrar precios en su moneda local.',
            ]} />
            <P>
              Puede desactivar las cookies en la configuración de su navegador. Sin embargo, algunas funciones
              del sitio podrían no funcionar correctamente sin ellas.
            </P>
          </Section>

          <Section number="09" title="Seguridad de los Datos">
            <P>
              En 689 Rigs implementamos medidas de seguridad técnicas, administrativas y físicas para proteger
              sus datos personales contra daño, pérdida, alteración, destrucción o acceso no autorizado. Entre
              estas medidas se incluyen:
            </P>
            <Ul items={[
              'Conexión segura mediante protocolo HTTPS/TLS en todo el sitio web.',
              'No almacenamos datos de tarjetas de crédito o débito en nuestros servidores; estos son procesados directamente por plataformas certificadas PCI DSS.',
              'Headers de seguridad (CSP, HSTS, X-Frame-Options) para proteger contra ataques comunes.',
              'Acceso restringido a datos personales solo a personal autorizado.',
            ]} />
          </Section>

          <Section number="10" title="Menores de Edad">
            <P>
              Nuestro sitio web y servicios no están dirigidos a menores de 18 años. No recabamos
              intencionalmente datos personales de menores de edad. Si usted es padre o tutor y tiene
              conocimiento de que un menor nos ha proporcionado datos personales, contáctenos para
              proceder a su eliminación.
            </P>
          </Section>

          <Section number="11" title="Modificaciones al Aviso de Privacidad">
            <P>
              689 Rigs se reserva el derecho de modificar el presente Aviso de Privacidad en cualquier
              momento. Las modificaciones serán publicadas y disponibles en nuestro sitio web en la
              dirección: <Strong>www.https://www.689rigs.com/pages/avisodeprivacidad</Strong>.
            </P>
            <P>
              Le recomendamos revisar periódicamente este aviso para mantenerse informado sobre cómo
              protegemos sus datos personales.
            </P>
          </Section>

          <Section number="12" title="Autoridad Competente">
            <P>
              Si usted considera que su derecho a la protección de datos personales ha sido vulnerado,
              puede interponer una queja ante el Instituto Nacional de Transparencia, Acceso a la
              Información y Protección de Datos Personales (INAI). Para mayor información visite
              www.inai.org.mx.
            </P>
          </Section>

          <Section number="13" title="Contacto">
            <P>Para cualquier duda o aclaración respecto a este Aviso de Privacidad:</P>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '8px',
              padding: '16px', background: '#0a0a0a', border: '1px solid #1e1e1e',
              marginTop: '12px',
            }}>
              <ContactItem icon="📧" label="Email" value="marketing@689rigs.com" href="mailto:marketing@689rigs.com" />
              <ContactItem icon="📱" label="WhatsApp" value="+52 221 569 8976" href="https://wa.me/522215698976" />
              <ContactItem icon="📍" label="Domicilio" value="Barrio Cascatta, Local 2do Piso, Puebla, Puebla, México" />
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
          El presente Aviso de Privacidad se elabora en cumplimiento de lo dispuesto por la Ley Federal
          de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y
          los Lineamientos del Aviso de Privacidad publicados en el Diario Oficial de la Federación.
          Fecha de entrada en vigor: Abril 2026.
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
      <div>{children}</div>
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
