export interface MenuLink {
  label: string
  href: string
  badge?: 'import' | 'new' | 'soon'
}

export interface MenuColumn {
  title: string
  links: MenuLink[]
}

export interface MenuSection {
  id: string
  label: string
  columns: MenuColumn[]
}

export interface MenuCategory {
  id: string
  label: string
  highlight?: boolean
  // Mega menu con sidebar
  mega?: {
    eyebrow: string
    sections: MenuSection[]
  }
  // Dropdown simple
  simple?: MenuLink[]
}

// ── MENU CONFIG — handles mapeados a Collections reales de Shopify ──────────

export const menuConfig: MenuCategory[] = [
  {
    id: 'simracing',
    label: 'SIM RACING',
    highlight: true,
    mega: {
      eyebrow: 'Sim Racing · Curado desde EE.UU.',
      sections: [
        {
          id: 'bundles',
          label: 'Bundles & Kits',
          columns: [
            {
              title: 'Bundles completos',
              links: [
                { label: 'Todos los Bundles', href: '/collections/rigs' },
                { label: 'Entry Level', href: '/collections/rigs' },
                { label: 'Mid Range', href: '/collections/rigs' },
                { label: 'Pro / High-End', href: '/collections/rigs', badge: 'import' },
              ],
            },
            {
              title: 'Por disciplina',
              links: [
                { label: 'GT / Gran Turismo', href: '/collections/rigs' },
                { label: 'Open Wheel / F1', href: '/collections/rigs' },
                { label: 'Rally / Dirt', href: '/collections/rigs' },
                { label: 'Drift', href: '/collections/rigs' },
              ],
            },
          ],
        },
        {
          id: 'cockpits',
          label: 'Cockpits',
          columns: [
            {
              title: 'Cockpits / Rigs',
              links: [
                { label: 'Todos los Cockpits', href: '/collections/collections-cockpits' },
                { label: 'Perfil 4040', href: '/collections/collections-cockpits' },
                { label: 'Perfil 4080', href: '/collections/collections-cockpits' },
                { label: 'GT / F1 / Rally', href: '/collections/collections-cockpits' },
              ],
            },
            {
              title: 'Monitor Stands',
              links: [
                { label: 'Monitor Stands', href: '/collections/smart-collection' },
                { label: 'Single / Triple Setup', href: '/collections/smart-collection' },
                { label: 'Integrado al Rig', href: '/collections/smart-collection' },
              ],
            },
            {
              title: 'Asientos Racing',
              links: [
                { label: 'Todos los Asientos', href: '/collections/custom-collection-11' },
                { label: 'GT / Reclinable', href: '/collections/custom-collection-11' },
                { label: 'Con rieles', href: '/collections/custom-collection-11' },
              ],
            },
          ],
        },
        {
          id: 'controles',
          label: 'Controles',
          columns: [
            {
              title: 'Bases DD / Servos',
              links: [
                { label: 'Todas las Bases', href: '/collections/servos-dd' },
                { label: 'Fanatec DD', href: '/collections/servos-dd', badge: 'import' },
                { label: 'Moza R5/R9/R12/R21', href: '/collections/servos-dd' },
                { label: 'Simucube 2', href: '/collections/servos-dd', badge: 'import' },
                { label: 'Asetek / VNM', href: '/collections/servos-dd' },
              ],
            },
            {
              title: 'Volantes',
              links: [
                { label: 'Todos los Volantes', href: '/collections/volantes' },
                { label: 'GT / Gran Turismo', href: '/collections/volantes' },
                { label: 'F1 / Open Wheel', href: '/collections/volantes' },
                { label: 'Rally', href: '/collections/volantes' },
                { label: 'QR & Hubs', href: '/collections/volantes' },
              ],
            },
            {
              title: 'Pedales',
              links: [
                { label: 'Todos los Pedales', href: '/collections/pedales' },
                { label: 'Heusinkveld', href: '/collections/pedales', badge: 'import' },
                { label: 'Moza CRP / CMP', href: '/collections/pedales' },
                { label: 'Fanatec ClubSport', href: '/collections/pedales' },
                { label: 'Load Cell Entry', href: '/collections/pedales' },
              ],
            },
            {
              title: 'Shifters & Handbrakes',
              links: [
                { label: 'Shifters & Palancas', href: '/collections/palanca-de-cambios-y-frenos-de-mano' },
                { label: 'H-Shifter', href: '/collections/palanca-de-cambios-y-frenos-de-mano' },
                { label: 'Secuencial', href: '/collections/palanca-de-cambios-y-frenos-de-mano' },
                { label: 'Handbrakes', href: '/collections/soportes-y-bandejas' },
              ],
            },
          ],
        },
        {
          id: 'displays',
          label: 'Displays & Dash',
          columns: [
            {
              title: 'Dashboards & Botones',
              links: [
                { label: 'Dashboards SimHub', href: '/collections/dashboards-y-button-boxes' },
                { label: 'Button Boxes', href: '/collections/dashboards-y-button-boxes' },
                { label: 'Displays analógicos', href: '/collections/dashboards-y-button-boxes' },
              ],
            },
            {
              title: 'Monitores',
              links: [
                { label: 'Monitores Gaming', href: '/collections/monitores' },
                { label: 'Curvo / Ultrawide', href: '/collections/monitores' },
                { label: 'Triple Screen', href: '/collections/monitores' },
              ],
            },
            {
              title: 'VR',
              links: [
                { label: 'Meta Quest', href: '#', badge: 'new' },
                { label: 'Accesorios VR', href: '#' },
              ],
            },
          ],
        },
        {
          id: 'motion',
          label: 'DOFs & Haptics',
          columns: [
            {
              title: 'Motion Platforms',
              links: [
                { label: 'DOFs & Haptics', href: '/collections/custom-collection-10' },
                { label: '2DOF / 3DOF', href: '/collections/custom-collection-10' },
                { label: 'Full Motion', href: '/collections/custom-collection-10', badge: 'import' },
              ],
            },
            {
              title: 'Haptic Feedback',
              links: [
                { label: 'Bass Shakers / Buttkicker', href: '/collections/custom-collection-10' },
                { label: 'Transductores', href: '/collections/custom-collection-10' },
                { label: 'SimHub compatible', href: '/collections/custom-collection-10' },
              ],
            },
          ],
        },
        {
          id: 'accesorios',
          label: 'Accesorios',
          columns: [
            {
              title: 'Soportes & Bandejas',
              links: [
                { label: 'Soportes & Bandejas', href: '/collections/soportes-y-bandejas' },
                { label: 'Brackets aluminio', href: '/collections/soportes-y-bandejas' },
              ],
            },
            {
              title: 'Audio',
              links: [
                { label: 'Sonido / Audio', href: '/collections/sonido' },
                { label: 'Headsets racing', href: '/collections/sonido' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'pcgaming',
    label: 'PC GAMING',
    mega: {
      eyebrow: 'PC Gaming · Componentes y periféricos',
      sections: [
        {
          id: 'builds',
          label: 'Builds Completas',
          columns: [
            {
              title: 'PC Completas',
              links: [
                { label: 'PCs Gaming / Sim', href: '/collections/pcs' },
                { label: 'PC Entry 1080p', href: '/collections/pcs' },
                { label: 'PC Mid 1440p', href: '/collections/pcs' },
                { label: 'PC Pro 4K', href: '/collections/pcs', badge: 'import' },
              ],
            },
          ],
        },
        {
          id: 'componentes',
          label: 'Componentes',
          columns: [
            {
              title: 'CPU & GPU',
              links: [
                { label: 'Procesadores Intel/AMD', href: '/collections/procesadores' },
                { label: 'GPUs NVIDIA', href: '#', badge: 'import' },
                { label: 'GPUs AMD Radeon', href: '#' },
              ],
            },
            {
              title: 'Monitores',
              links: [
                { label: 'Todos los monitores', href: '/collections/monitores' },
                { label: 'Gaming 144hz+', href: '/collections/monitores' },
                { label: 'Curvo / Ultrawide', href: '/collections/monitores' },
              ],
            },
          ],
        },
        {
          id: 'storage',
          label: 'Almacenamiento',
          columns: [
            {
              title: 'SSD',
              links: [
                { label: 'Todos los SSD', href: '/collections/ssd' },
                { label: 'SSD SATA 2.5"', href: '/collections/ssd' },
                { label: 'SSD NVMe M.2', href: '/collections/ssd' },
                { label: 'SSD Portátil USB 3.1', href: '/collections/ssd' },
              ],
            },
            {
              title: 'HDD Externo',
              links: [
                { label: 'HDD 2TB Ultra Slim', href: '#' },
                { label: 'HDD 4TB / 8TB / 10TB', href: '#' },
              ],
            },
          ],
        },
        {
          id: 'perifericos',
          label: 'Periféricos',
          columns: [
            {
              title: 'Audio & Video',
              links: [
                { label: 'Sonido', href: '/collections/sonido' },
                { label: 'Monitores', href: '/collections/monitores' },
              ],
            },
            {
              title: 'Input',
              links: [
                { label: 'Teclados', href: '#', badge: 'soon' },
                { label: 'Ratones gaming', href: '#', badge: 'soon' },
                { label: 'VR', href: '#', badge: 'soon' },
              ],
            },
          ],
        },
        {
          id: 'nas',
          label: 'Redes & NAS',
          columns: [
            {
              title: 'NAS Synology',
              links: [
                { label: 'DS223 2 bahías', href: '#' },
                { label: 'DS423 4 bahías', href: '#', badge: 'import' },
                { label: 'DX4800 Enterprise', href: '#', badge: 'import' },
              ],
            },
            {
              title: 'Redes',
              links: [
                { label: 'Routers WiFi 6', href: '#' },
                { label: 'Switches', href: '#' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'flysim',
    label: 'FLY SIM',
    mega: {
      eyebrow: 'Fly Sim · Simuladores de vuelo',
      sections: [
        {
          id: 'fly-bundles',
          label: 'Bundles Vuelo',
          columns: [
            {
              title: 'Turn-Key Vuelo',
              links: [
                { label: 'Fly Sim completo', href: '/collections/asientos-flight' },
                { label: 'Bundle A320 Comercial', href: '/collections/asientos-flight', badge: 'import' },
                { label: 'Bundle Cessna / GA', href: '/collections/asientos-flight' },
                { label: 'Bundle MSFS 2024', href: '/collections/asientos-flight' },
              ],
            },
          ],
        },
        {
          id: 'fly-controls',
          label: 'Controles',
          columns: [
            {
              title: 'Yokes & Joysticks',
              links: [
                { label: 'Controles de vuelo', href: '/collections/controles-de-vuelo' },
                { label: 'Honeycomb Alpha Yoke', href: '/collections/controles-de-vuelo' },
                { label: 'HOTAS Warthog', href: '/collections/controles-de-vuelo', badge: 'import' },
              ],
            },
            {
              title: 'Throttles & Rudder',
              links: [
                { label: 'Honeycomb Bravo Throttle', href: '/collections/controles-de-vuelo' },
                { label: 'Pedales Rudder', href: '/collections/controles-de-vuelo' },
              ],
            },
          ],
        },
        {
          id: 'fly-seats',
          label: 'Asientos & Cockpit',
          columns: [
            {
              title: 'Asientos de Vuelo',
              links: [
                { label: 'Asientos Flight Sim', href: '/collections/asientos-flight' },
                { label: 'Monitor Stands vuelo', href: '/collections/smart-collection' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'import',
    label: 'IMPORTACIÓN',
    mega: {
      eyebrow: 'Importación directa desde EE.UU.',
      sections: [
        {
          id: 'como',
          label: '¿Cómo funciona?',
          columns: [
            {
              title: 'El proceso',
              links: [
                { label: '① Nos dices qué quieres', href: '/pages/importacion' },
                { label: '② Cotizamos precio final MX', href: '/pages/importacion' },
                { label: '③ Confirmamos y pedimos', href: '/pages/importacion' },
                { label: '④ Entrega Puebla o envío MX', href: '/pages/importacion' },
              ],
            },
            {
              title: 'Tiempos estimados',
              links: [
                { label: 'Express: 5–10 días hábiles', href: '/pages/importacion' },
                { label: 'Estándar: 15–20 días', href: '/pages/importacion' },
              ],
            },
          ],
        },
        {
          id: 'marcas-imp',
          label: 'Marcas disponibles',
          columns: [
            {
              title: 'Sim Racing',
              links: [
                { label: 'Heusinkveld', href: '/pages/importacion' },
                { label: 'Asetek SimSports', href: '/pages/importacion' },
                { label: 'Simucube 2', href: '/pages/importacion' },
                { label: 'VNM Simracing', href: '/pages/importacion' },
                { label: 'Sim-Lab / GT Omega', href: '/pages/importacion' },
              ],
            },
            {
              title: 'PC & Tech',
              links: [
                { label: 'NVIDIA RTX', href: '/pages/importacion' },
                { label: 'Synology NAS', href: '/pages/importacion' },
                { label: 'Fanatec', href: '/pages/importacion' },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'merch',
    label: 'MERCH & COLECCIONABLES',
    mega: {
      eyebrow: 'Merch oficial F1 · Motorsport · Coleccionables',
      sections: [
        {
          id: 'f1',
          label: 'Merch F1 Oficial',
          columns: [
            {
              title: 'Gorras & Headwear',
              links: [
                { label: 'Gorras F1 Oficial', href: '/collections/gorras-oficial-f1' },
                { label: 'Pirelli Podium Cap', href: '/collections/gorras-oficial-f1' },
                { label: 'Red Bull / Ferrari / Mercedes', href: '/collections/gorras-oficial-f1' },
              ],
            },
            {
              title: 'Ropa F1',
              links: [
                { label: 'Polos F1', href: '#', badge: 'soon' },
                { label: 'Playeras F1', href: '#', badge: 'soon' },
                { label: 'Hoodies / Jackets', href: '#', badge: 'soon' },
                { label: 'Mochilas F1', href: '#', badge: 'soon' },
              ],
            },
          ],
        },
        {
          id: 'motorsport',
          label: 'Merch MotorSport',
          columns: [
            {
              title: 'Gorras MotorSport',
              links: [
                { label: 'Gorras MotorSport', href: '/collections/gorras-motorsport' },
                { label: 'WRC / Rally', href: '/collections/gorras-motorsport' },
                { label: 'MotoGP', href: '/collections/gorras-motorsport' },
              ],
            },
          ],
        },
        {
          id: 'coleccionables',
          label: 'Coleccionables',
          columns: [
            {
              title: 'Die-Cast & Escala',
              links: [
                { label: 'Todos los Coleccionables', href: '/collections/coleccionables' },
                { label: 'Escala 1:43 F1', href: '/collections/coleccionables' },
                { label: 'Escala 1:18 Superautos', href: '/collections/coleccionables' },
              ],
            },
          ],
        },
        {
          id: 'juguetes',
          label: 'Juguetes & Die-Cast',
          columns: [
            {
              title: 'Juguetes',
              links: [
                { label: 'Todos los Juguetes', href: '/collections/juguetes' },
                { label: 'Hot Wheels Especiales', href: '/collections/juguetes' },
                { label: 'LEGO Technic / Speed', href: '/collections/juguetes' },
              ],
            },
          ],
        },
      ],
    },
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
