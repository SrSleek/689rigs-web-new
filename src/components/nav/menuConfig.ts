// src/components/nav/menuConfig.ts

export interface SubCategory {
  label: string
  href: string
}

export interface Category {
  id: string
  label: string
  highlight?: boolean
  subs: SubCategory[]
}

const sub = (label: string, handle: string): SubCategory => ({
  label,
  href: `/collections/${handle}`,
})

export const menuConfig: Category[] = [
  {
    id: 'simracing',
    label: 'Sim Racing',
    highlight: true,
    subs: [
      sub('Bundles', 'bundles-simracing'),
      sub('Pedales', 'pedales'),
      sub('Volantes', 'volantes'),
      sub('Bases', 'servos-dd'),
      sub('Cockpits', 'collections-cockpits'),
      sub('Asientos', 'asientos-de-auto-simracing'),
      sub('DOFS & Haptics', 'dofshaptics'),
      sub('Dashboards Sim', 'dashboards-sim'),
      sub('Botoneras Sim', 'botoneras-simulador'),
      sub('Handbrakes', 'handbrakes'),
      sub('Shifters', 'palanca-de-cambios-y-frenos-de-mano'),
      sub('Monitor Stands', 'soportes-monitor'),
      sub('QR, Hubs', 'qr'),
      sub('Soportes Extras Sim', 'soportes-extras-sim'),
      sub('Impresiones 3D Sim', 'smart-collection-1'),
      sub('Guantes Motorsport', 'guantes'),
    ],
  },
  {
    id: 'pchardware',
    label: 'PC Hardware',
    subs: [
      sub('PC Gaming', 'pcs'),
      sub('PC Work', 'pc-work'),
      sub('Graficas', 'graficas'),
      sub('Procesadores', 'procesadores'),
      sub('Motherboards', 'motherboards'),
      sub('RAM', 'ram'),
      sub('Almacenamiento', 'ssd'),
      sub('Alimentacion', 'alimentacion'),
      sub('Gabinetes', 'gabinetes'),
      sub('Monitores', 'monitores'),
      sub('Perifericos', 'perifericos'),
      sub('PC Audio', 'pc-audio'),
      sub('VR', 'vr'),
      sub('Escritorios', 'escritorios'),
      sub('Sillas Gamer', 'sillas-gamer'),
      sub('Accesorios / Otros', 'accesorios-otros'),
      sub('Robots', 'robots'),
      sub('Iluminacion Streaming', 'iluminacion-streaming'),
    ],
  },
  {
    id: 'flysim',
    label: 'Fly Sim',
    subs: [
      sub('Bundles Vuelo', 'bundles-vuelo'),
      sub('Controles Vuelo', 'controles-de-vuelo'),
      sub('Asientos Vuelo', 'asientos-vuelo'),
      sub('Cockpit Vuelo', 'cockpit-vuelo'),
      sub('Dashboards Vuelo', 'dashboards-de-vuelo'),
      sub('Botoneras Vuelo', 'botoneras-vuelo'),
      sub('Monitor Stands', 'soportes-monitor'),
      sub('DOFS & Haptics', 'dofshaptics'),
      sub('Soportes Extras Sim', 'soportes-extras-sim'),
      sub('Impresiones 3D Vuelo', 'impresiones-3d-vuelo'),
    ],
  },
  {
    id: 'f1merch',
    label: 'F1 Merch',
    subs: [
      sub('Gorras F1', 'gorras-oficial-f1'),
      sub('Lentes F1', 'lentes-f1'),
      sub('Playeras F1', 'playeras-f1'),
      sub('Polos F1', 'polos-f1-1'),
      sub('Jackets F1', 'jackets'),
      sub('Jerseys F1', 'jerseys-f1'),
      sub('Pants F1', 'pants-f1'),
      sub('Shorts F1', 'shorts-f1'),
      sub('Mochilas F1', 'mochilas-f1'),
      sub('Coleccionables F1', 'coleccionables-f1'),
    ],
  },
  {
    id: 'golfsim',
    label: 'Golf Sim',
    subs: [
      sub('Simulador Golf', 'simulador-golf'),
      sub('Fierros / Bastones', 'fierros-bastones'),
      sub('Pelotas', 'pelotas'),
      sub('Bolsas', 'bolsas'),
      sub('Accesorios Golf', 'accesorios-golf'),
      sub('Apparel Golf', 'apparel-golf'),
      sub('Guantes Golf', 'guantes-golf'),
    ],
  },
  {
    id: 'motorsport',
    label: 'Motorsport',
    subs: [
      sub('Tops MS', 'tops-motorsports'),
      sub('Gorras MS', 'gorras-motorsport'),
      sub('Mochilas MS', 'mochila-motorsport'),
      sub('Coleccionables MS', 'coleccionable-motorsport'),
      sub('Impresiones 3D MS', 'impresiones-3d-ms'),
      sub('Guantes de Carrera', 'guantes'),
      sub('Cascos Motorsport', 'cascos-de-carrera'),
      sub('Nomex Motorsport', 'nomex-motorsport'),
    ],
  },
  {
    id: '3dprinting',
    label: '3D Printing',
    subs: [
      sub('Impresoras', 'impresoras'),
      sub('Filamento', 'filamento'),
      sub('Disenos Personalizados', 'disenos-personalizados'),
    ],
  },
  {
    id: 'garage',
    label: 'Garage',
    subs: [
      sub('Gabinetes de Herramientas', 'gabinetes-de-herramientas'),
      sub('Sets de Herramientas', 'sets-de-herramientas'),
      sub('Diagnostico', 'diagnostico'),
      sub('Dashcam', 'dash-cam'),
      sub('Jacks', 'jacks'),
    ],
  },
  {
    id: 'mancave',
    label: 'Man Cave',
    subs: [
      sub('Mobiliario', 'mobiliario'),
      sub('Decorativo', 'decorativo'),
      sub('Bar', 'bar'),
      sub('Juegos', 'juegos'),
      sub('DJ Station', 'dj-station'),
    ],
  },
  {
    id: 'radiocontrol',
    label: 'Radio Control',
    subs: [
      sub('Aviones RC', 'aviones'),
      sub('Autos RC', 'autos-rc'),
      sub('Motos RC', 'motos-rc'),
      sub('Barcos RC', 'barcos-rc'),
      sub('Controladores RC', 'controladores-rc'),
      sub('Baterias y Cargadores', 'baterias-y-cargadores-rc'),
      sub('Refacciones RC', 'refacciones-rc'),
    ],
  },
  {
    id: 'tuning',
    label: 'Tuning',
    subs: [
      sub('Interior', 'interior'),
      sub('Alerones', 'alerones'),
      sub('Audio', 'audio'),
      sub('Escape', 'escape'),
      sub('Frenos', 'frenos'),
      sub('Motor', 'motor'),
      sub('Neumaticos', 'neumaticos'),
      sub('Suspension', 'suspension'),
      sub('Body Kit', 'body-kit'),
      sub('Admision', 'admision'),
    ],
  },
  {
    id: 'movilidad',
    label: 'Movilidad',
    subs: [
      sub('Scooters', 'scooters'),
      sub('Bicicletas', 'bicicletas'),
      sub('E-Bikes', 'e-bikes'),
      sub('Motocicletas', 'motocicletas'),
      sub('Guantes de Moto', 'guantes-moto'),
      sub('Casco de Moto', 'casco-de-moto'),
    ],
  },
  {
    id: 'experiencias',
    label: 'Experiencias',
    subs: [
      sub('Renta de Simuladores', 'renta-de-simuladores'),
      sub('Clases de Manejo', 'clases-de-manejo'),
      sub('Eventos', 'eventos'),
      sub('Membresias', 'membresias'),
      sub('Campeonatos', 'campeonatos'),
    ],
  },
  {
    id: 'autolifestyle',
    label: 'Auto Lifestyle',
    subs: [
      sub('Detailing', 'detailing'),
      sub('Kits Car Care', 'kits-car-care'),
      sub('Herramientas de Detallado', 'herramientas-de-detallado'),
    ],
  },
  {
    id: 'memorabilia',
    label: 'Memorabilia',
    subs: [
      sub('Coleccionables MS', 'coleccionable-motorsport'),
      sub('Coleccionables F1', 'coleccionables-f1'),
      sub('NBA', 'nba'),
      sub('NFL', 'nfl'),
      sub('Pop Culture', 'pop-culture'),
    ],
  },
  {
    id: 'coleccionables',
    label: 'Coleccionables',
    subs: [
      sub('Action Figures', 'action-figures'),
      sub('Geek Zone', 'geek-zone'),
      sub('Vault', 'vault'),
    ],
  },
  {
    id: 'fitness',
    label: 'Fitness',
    subs: [
      sub('Recovery Tools', 'recovery-tools'),
      sub('Postura', 'postura'),
      sub('Gym', 'gym'),
      sub('Apparel', 'apparel'),
    ],
  },
  {
    id: 'audiopremium',
    label: 'Audio Premium',
    subs: [
      sub('Bocinas', 'bocinas'),
      sub('Soundbars', 'soundbars'),
      sub('DACs', 'dacs'),
      sub('Audifonos Hi-Fi', 'audifonos-hi-fi'),
    ],
  },
  {
    id: 'offroad',
    label: 'Aventura Off Road',
    subs: [
      sub('Coolers', 'coolers'),
      sub('Backpack', 'backpack'),
      sub('Supplies', 'supplies'),
      sub('Furniture', 'furniture'),
    ],
  },
  {
    id: 'nuevos',
    label: 'Nuevos',
    subs: [],
  },
  {
    id: 'bestsellers',
    label: 'Best Sellers',
    subs: [],
  },
  {
    id: 'ofertas',
    label: 'Ofertas',
    highlight: true,
    subs: [],
  },
  {
    id: 'armado',
    label: 'Armado Recomendado',
    subs: [],
  },
]