export interface MenuLink {
  label: string
  href: string
  badge?: 'import' | 'new' | 'soon'
}

export interface MenuCategory {
  id: string
  label: string
  highlight?: boolean
  /** Grid de colecciones (nuevo diseño simplificado) */
  collections?: MenuLink[]
  /** Dropdown simple (para Sim Center, Marcas, etc.) */
  simple?: MenuLink[]
}

export const menuConfig: MenuCategory[] = [
  {
    id: 'simracing',
    label: 'SIM RACING',
    highlight: true,
    collections: [
      { label: 'Bundles', href: '/collections/rigs' },
      { label: 'Cockpits', href: '/collections/collections-cockpits' },
      { label: 'Monitor Stands', href: '/collections/smart-collection' },
      { label: 'Asientos', href: '/collections/custom-collection-11' },
      { label: 'Bases DD', href: '/collections/servos-dd' },
      { label: 'Pedales', href: '/collections/pedales' },
      { label: 'Volantes', href: '/collections/volantes' },
      { label: 'Shifters', href: '/collections/palanca-de-cambios-y-frenos-de-mano' },
      { label: 'Handbrakes', href: '/collections/soportes-y-bandejas' },
      { label: 'Dashs y Botones', href: '/collections/dashboards-y-button-boxes' },
      { label: 'QR & Hubs', href: '/collections/volantes' },
      { label: 'DOFs & Haptics', href: '/collections/custom-collection-10' },
    ],
  },
  {
    id: 'pcgaming',
    label: 'PC GAMING',
    collections: [
      { label: 'PC Full', href: '/collections/pcs' },
      { label: 'Gráficas', href: '#', badge: 'soon' },
      { label: 'Almacenamiento', href: '/collections/ssd' },
      { label: 'Gabinetes', href: '#', badge: 'soon' },
      { label: 'Motherboards', href: '#', badge: 'soon' },
      { label: 'Procesadores', href: '/collections/procesadores' },
      { label: 'Alimentación', href: '#', badge: 'soon' },
      { label: 'RAM', href: '#', badge: 'soon' },
      { label: 'Monitores', href: '/collections/monitores' },
      { label: 'Sonido', href: '/collections/sonido' },
      { label: 'Periféricos', href: '#', badge: 'soon' },
      { label: 'VR', href: '#', badge: 'soon' },
    ],
  },
  {
    id: 'flysim',
    label: 'FLY SIM',
    collections: [
      { label: 'Turn Key Vuelo', href: '/collections/asientos-flight' },
      { label: 'Cockpit Vuelo', href: '/collections/asientos-flight' },
      { label: 'Monitor Stands', href: '/collections/smart-collection' },
      { label: 'Asientos de Vuelo', href: '/collections/asientos-flight' },
      { label: 'Controles de Vuelo', href: '/collections/controles-de-vuelo' },
      { label: 'Dashboards Vuelo', href: '/collections/dashboards-y-button-boxes' },
      { label: 'Handbrakes', href: '/collections/soportes-y-bandejas' },
      { label: 'DOFs & Haptics', href: '/collections/custom-collection-10' },
    ],
  },
  {
    id: 'import',
    label: 'IMPORTACIÓN',
    simple: [
      { label: '① Nos dices qué quieres', href: '/pages/importacion' },
      { label: '② Cotizamos precio final MX', href: '/pages/importacion' },
      { label: '③ Confirmamos y pedimos', href: '/pages/importacion' },
      { label: '④ Entrega Puebla o envío MX', href: '/pages/importacion' },
      { label: 'Express: 5–10 días hábiles', href: '/pages/importacion' },
      { label: 'Estándar: 15–20 días', href: '/pages/importacion' },
    ],
  },
  {
    id: 'merch',
    label: 'MERCH & COLECCIONABLES',
    collections: [
      { label: 'Gorras y Lentes F1', href: '/collections/gorras-oficial-f1' },
      { label: 'Hoodies F1', href: '#', badge: 'soon' },
      { label: 'Jackets F1', href: '#', badge: 'soon' },
      { label: 'Jerseys F1', href: '#', badge: 'soon' },
      { label: 'Coleccionables F1', href: '/collections/coleccionables' },
      { label: 'Pants F1', href: '#', badge: 'soon' },
      { label: 'Polos F1', href: '#', badge: 'soon' },
      { label: 'Camisas & Sudaderas F1', href: '#', badge: 'soon' },
      { label: 'Shorts F1', href: '#', badge: 'soon' },
      { label: 'Playeras F1', href: '#', badge: 'soon' },
      { label: 'Mochilas F1', href: '#', badge: 'soon' },
      { label: 'Footwear F1', href: '#', badge: 'soon' },
    ],
  },
  {
    id: 'simcenter',
    label: 'SIM CENTER ●',
    simple: [
      { label: '📍 Barrio Cascatta, Puebla', href: '/pages/sim-center' },
      { label: '🕐 Lun–Jue 12–9pm · Vie–Dom 12–10pm', href: '/pages/sim-center' },
      { label: '🗺 Cómo llegar · Google Maps', href: 'https://maps.google.com/?q=Barrio+Cascatta+Puebla' },
      { label: '🏎 Prueba antes de comprar', href: '/pages/sim-center' },
      { label: '📦 Recoger pedido en tienda', href: '/pages/sim-center' },
    ],
  },
  {
    id: 'marcas',
    label: 'MARCAS',
    simple: [
      { label: 'Fanatec', href: '#' },
      { label: 'Moza Racing', href: '#' },
      { label: 'Heusinkveld', href: '#' },
      { label: 'Sim-Lab', href: '#' },
      { label: 'Asetek SimSports', href: '#' },
      { label: 'Thrustmaster', href: '#' },
      { label: 'Synology · Kingston · NVIDIA', href: '#' },
    ],
  },
]
