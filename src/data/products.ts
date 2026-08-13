import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 0. Civil, Interiors, Hardware & Sanitary (Quick-Commerce Construction Essentials)
  {
    id: 'pr-cement-01',
    name: 'UltraTech Super PPC Cement 50kg Bag (The Engineer\'s Choice)',
    slug: 'ultratech-super-ppc-cement-50kg',
    brand: 'UltraTech',
    brandId: 'ultratech',
    category: 'Civil & Interiors',
    categoryId: 'civil-interiors',
    sku: 'CIV-ULT-PPC-50',
    price: 395,
    originalPrice: 440,
    unit: 'per 50kg Bag',
    minOrderQty: 1,
    stock: 500,
    inStock: true,
    rating: 4.9,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Premium Pozzolana Portland Cement engineered for high early compressive strength and crack-resistant concrete slabs.',
    description: 'UltraTech Super PPC is engineered using advanced micro-fine particles providing high durability, superior bonding, and low heat of hydration for residential and commercial building construction.',
    features: [
      'High early and ultimate compressive strength',
      'Superior resistance to sulfate and chloride attacks',
      'Low heat of hydration preventing thermal cracks',
      'Tamper-proof 50kg moisture-resistant packaging'
    ],
    specifications: {
      'Grade': 'Pozzolana Portland Cement (PPC)',
      'Weight': '50 kg per bag',
      'Standard Compliance': 'IS 1489 (Part 1)',
      'Setting Time (Initial)': 'Minimum 30 mins',
      'Setting Time (Final)': 'Maximum 600 mins'
    },
    applications: ['RCC columns, beams and foundations', 'Brick masonry & plastering', 'Flooring and screeds'],
    certifications: ['BIS Certified', 'ISO 9001', 'GreenPro Certified'],
    warranty: 'Fresh Batch Guarantee (< 30 days from mfg)',
    isFeatured: true,
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 20, discountPercent: 4 },
      { minQty: 100, discountPercent: 8 },
      { minQty: 300, discountPercent: 12 }
    ]
  },
  {
    id: 'pr-roff-01',
    name: 'Roff T20 Power Matik High Strength Tile & Stone Adhesive (20kg)',
    slug: 'roff-t20-power-matik-tile-adhesive-20kg',
    brand: 'Pidilite Roff',
    brandId: 'roff',
    category: 'Civil & Interiors',
    categoryId: 'civil-interiors',
    sku: 'CIV-ROF-T20-20',
    price: 460,
    originalPrice: 520,
    unit: 'per 20kg Bag',
    minOrderQty: 1,
    stock: 320,
    inStock: true,
    rating: 4.9,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Polymer modified cementitious tile adhesive for fixing ceramic, vitrified tiles and marble on floors & interior walls.',
    description: 'Roff T20 Power Matik delivers superior non-slip bonding for all sizes of vitrified tiles, granite, and natural stones with zero hollow sounds.',
    features: [
      'Self-curing polymer modified adhesive formula',
      'Excellent tensile adhesion and shock absorption',
      'Prevents water seepage and debonding of heavy tiles',
      'Coverage: ~55-60 sq.ft per 20kg bag at 3mm thickness'
    ],
    specifications: {
      'Pack Size': '20 kg bag',
      'Open Time': 'Approx 20-25 minutes',
      'Pot Life': 'Approx 2 hours',
      'Classification': 'IS 15477:2019 Type 2T'
    },
    applications: ['Vitrified tile fixing on floor & walls', 'Granite and marble cladding', 'Bathrooms and kitchen flooring'],
    certifications: ['IS 15477:2019', 'Pidilite Quality Assured'],
    warranty: '100% Genuine Pidilite Seal',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pr-fevicol-01',
    name: 'Fevicol SH Ultimate Synthetic Resin Wood Adhesive (5kg Bucket)',
    slug: 'fevicol-sh-synthetic-resin-wood-adhesive-5kg',
    brand: 'Fevicol',
    brandId: 'fevicol',
    category: 'Furniture & Architectural Hardware',
    categoryId: 'furniture-hardware',
    sku: 'HRD-FEV-SH-05',
    price: 1120,
    originalPrice: 1250,
    unit: 'per 5kg Bucket',
    minOrderQty: 1,
    stock: 210,
    inStock: true,
    rating: 5.0,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'India\'s #1 synthetic resin adhesive for unbreakable wood bonding, laminates, and plywood furniture fabrication.',
    description: 'Fevicol SH offers unmatched bond strength and fast drying times for carpenters, interior contractors, and modular furniture workshops.',
    features: [
      'Unsurpassed bonding strength for ply, MDF, particle board',
      'Low VOC eco-friendly water-based adhesive formulation',
      'Spreads easily with high coverage per square foot',
      'Original blue bucket container with holographic verification'
    ],
    specifications: {
      'Weight': '5 kg Bucket',
      'Viscosity': 'High paste consistency',
      'Setting Time': '4-6 hours handling strength',
      'Full Cure': '24 hours'
    },
    applications: ['Laminate pasting on plywood', 'Modular kitchen cabinetry', 'Veneer and solid wood jointing'],
    certifications: ['IS 4835', 'EN 204 D2'],
    warranty: 'Pidilite Seal of Authenticity',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pr-paint-01',
    name: 'Asian Paints Royale Luxury Interior Emulsion Paint (4 Litre Bucket)',
    slug: 'asian-paints-royale-luxury-emulsion-4l',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    category: 'Civil & Interiors',
    categoryId: 'civil-interiors',
    sku: 'PNT-ASP-ROY-04',
    price: 1890,
    originalPrice: 2150,
    unit: 'per 4L Bucket',
    minOrderQty: 1,
    stock: 140,
    inStock: true,
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Super luxury sheen interior paint with Teflon surface protector, anti-bacterial finish and washable stain resistance.',
    description: 'Asian Paints Royale Luxury Emulsion gives walls a smooth high-sheen appearance with superior stain repellency and odorless application.',
    features: [
      'Teflon surface protection for easy stain cleanup',
      'Anti-fungal and anti-bacterial Silver Ion technology',
      'Zero smell and ultra-low VOC rating',
      'Coverage: ~280-320 sq.ft for 2 coats per 4 Litres'
    ],
    specifications: {
      'Volume': '4 Litres',
      'Finish': 'Soft Silk High-Sheen',
      'Drying Time': '30 mins touch dry',
      'Recoat Period': '4 hours'
    },
    applications: ['Living rooms and master bedrooms', 'Luxury interior wall surfaces', 'False ceiling painting'],
    certifications: ['GreenAssure', 'IS 15489'],
    warranty: '5 Years Manufacturer Performance Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pr-sanitary-01',
    name: 'Hindware Element Rimless One-Piece Ceramic Floor Mount Toilet Commode',
    slug: 'hindware-element-rimless-one-piece-commode',
    brand: 'Hindware',
    brandId: 'hindware',
    category: 'Plumbing, Sanitary & Bath',
    categoryId: 'plumbing-sanitary',
    sku: 'SAN-HIN-ELM-01',
    price: 7490,
    originalPrice: 8990,
    unit: 'per Unit Set',
    minOrderQty: 1,
    stock: 65,
    inStock: true,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Ultra-hygienic rimless flush one-piece ceramic European water closet with soft-close hydraulic seat cover.',
    description: 'Vitreous china construction with anti-germ glaze coating preventing bacterial residue and ensuring powerful 360° cyclone flushing.',
    features: [
      'Rimless flushing technology for 100% hygiene',
      'Dual flush mechanism (3L / 6L) for water conservation',
      'Soft-close hydraulic UF seat cover included',
      'S-Trap 300mm standard rough-in plumbing distance'
    ],
    specifications: {
      'Trap Type': 'S-Trap 300mm Roughing-in',
      'Material': 'Vitreous China Grade-A Ceramic',
      'Dimensions': '650 x 360 x 740 mm',
      'Color': 'Glossy Arctic White'
    },
    applications: ['Master bathrooms', 'Commercial office washrooms', 'Hospitality hotel suites'],
    certifications: ['IS 2556', 'IAPMO Certified'],
    warranty: '10 Years Ceramic Warranty',
    isFeatured: true,
    isBestSeller: true
  },
  {
    id: 'pr-board-01',
    name: 'Action TESA HDHMR Strong-Board Classic Moisture Resistant Board (8x4 ft x 18mm)',
    slug: 'action-tesa-hdhmr-strong-board-18mm',
    brand: 'Action TESA',
    brandId: 'action-tesa',
    category: 'Civil & Interiors',
    categoryId: 'civil-interiors',
    sku: 'CIV-TES-HDH-18',
    price: 2450,
    originalPrice: 2800,
    unit: 'per 8x4 Sheet',
    minOrderQty: 1,
    stock: 90,
    inStock: true,
    rating: 4.9,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High Density High Moisture Resistance green core board for modular kitchens, wardrobes and bathroom vanities.',
    description: 'Engineered with hardwood eucalyptus fibers and German polyurethane resin to withstand water contact, termites, and heavy screw holding loads.',
    features: [
      'Density > 850 kg/m³ for exceptional screw holding strength',
      '100% Borer & Termite proof core matrix',
      'Smooth surface ready for direct painting, polishing or laminate pasting',
      'Extreme water & moisture resistance'
    ],
    specifications: {
      'Sheet Dimensions': '8 ft x 4 ft (2440 x 1220 mm)',
      'Thickness': '18 mm',
      'Density': '850+ kg/m³',
      'Color': 'Characteristic Green Core'
    },
    applications: ['Modular kitchen carcase & shutters', 'Bathroom vanity cabinets', 'Wardrobes and TV consoles'],
    certifications: ['IS 14587', 'FSC Certified', 'Emission Grade E1'],
    warranty: '15 Years Borer-Proof Guarantee',
    isFeatured: true,
    isBestSeller: true
  },

  // 1. Wires & Cables
  {
    id: 'pr-wire-01',
    name: 'Polycab Maxima Flame Retardant Low Smoke (FRLS) Copper Wire 2.5 sq.mm',
    slug: 'polycab-maxima-frls-copper-wire-2-5-sqmm',
    brand: 'Polycab',
    brandId: 'polycab',
    category: 'Wires & Cables',
    categoryId: 'wires-cables',
    sku: 'PWR-POL-FRLS-25',
    price: 3450,
    originalPrice: 3890,
    unit: 'per 90m Coil',
    minOrderQty: 1,
    stock: 240,
    inStock: true,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '100% Pure Electrolytic Copper wire engineered with 3-layer insulation for fire safety in residential and commercial circuits.',
    description: 'Polycab Maxima FRLS insulated copper building wire features special formulation compound that emits very low toxic fumes and dense smoke during fire incidents. Ensures high conductivity, 100% conductivity rating, and energy efficiency for critical electrical loads like air conditioners, geysers, and commercial power lines.',
    features: [
      '100% Electrolytic Bare Annealed Copper Conductor',
      'Oxygen Index > 29% for enhanced flame retardance',
      'Temperature Rating: -15°C to +70°C continuous operation',
      'Anti-rodent and anti-termite lead-free PVC insulation',
      'Tested to IS 694:2010 specification with ISI mark'
    ],
    specifications: {
      'Conductor Material': 'Class 2 Stranded Electrolytic Copper',
      'Cross Section Area': '2.5 sq.mm',
      'Voltage Grade': '1100 Volts AC',
      'Current Rating (Enclosed in Conduit)': '20 Amps',
      'Standard Packing Length': '90 Meters Box',
      'Insulation Type': 'Special Grade Flame Retardant Low Smoke PVC'
    },
    applications: ['Residential power distribution', 'Air conditioners & power outlets', 'Commercial office fitouts', 'Hotel guestroom circuits'],
    certifications: ['IS 694', 'FIA/TAC Approved', 'RoHS Compliant', 'CE Certified'],
    warranty: '5 Years Manufacturer Warranty',
    isFeatured: true,
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 10, discountPercent: 5 },
      { minQty: 50, discountPercent: 10 },
      { minQty: 100, discountPercent: 14 }
    ]
  },
  {
    id: 'pr-wire-02',
    name: 'Finolex Flame Guard FRLS 4.0 sq.mm Single Core Copper Building Wire',
    slug: 'finolex-flame-guard-frls-4-0-sqmm-copper-wire',
    brand: 'Finolex',
    brandId: 'finolex',
    category: 'Wires & Cables',
    categoryId: 'wires-cables',
    sku: 'PWR-FIN-FRLS-40',
    price: 5420,
    originalPrice: 5950,
    unit: 'per 90m Coil',
    minOrderQty: 1,
    stock: 185,
    inStock: true,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy gauge 4.0 sq.mm electrolytic copper wire for main power risers, inverter inputs, and kitchen commercial appliances.',
    description: 'Manufactured with high purity bright annealed copper conductors bunched compactly for optimum flexibility and low electrical resistance. The specially designed PVC compound minimizes smoke density and corrosive hydrochloric gas generation during an outbreak.',
    features: [
      'Low smoke density (< 60% light transmittance)',
      'High temperature thermal endurance up to 85°C',
      'Ideal for heavy induction and motor loads',
      'Energy saving with ultra-low voltage drop'
    ],
    specifications: {
      'Conductor Material': 'Multi-strand Annealed Copper',
      'Cross Section Area': '4.0 sq.mm',
      'Voltage Grade': 'Up to 1100V',
      'Current Capacity': '28 Amperes',
      'Length': '90 Meters'
    },
    applications: ['Kitchen heating circuits', 'Main breaker to DB feeder', 'High capacity heat pumps', 'Commercial workshop outlets'],
    certifications: ['IS 694:2010', 'BIS Marked', 'RoHS'],
    warranty: '5 Years Manufacturer Guarantee',
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 10, discountPercent: 6 },
      { minQty: 30, discountPercent: 12 }
    ]
  },
  {
    id: 'pr-wire-03',
    name: 'KEI 4-Core 16 sq.mm Aluminium Armoured XLPE Heavy Power Cable',
    slug: 'kei-4-core-16-sqmm-aluminium-armoured-cable',
    brand: 'KEI',
    brandId: 'kei',
    category: 'Wires & Cables',
    categoryId: 'wires-cables',
    sku: 'PWR-KEI-ARM-4C16',
    price: 385,
    originalPrice: 420,
    unit: 'per Meter (Custom Cut)',
    minOrderQty: 10,
    stock: 1200,
    inStock: true,
    rating: 4.7,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial grade underground XLPE insulated galvanized steel wire armoured power transmission cable.',
    description: 'Designed for direct burial, cable tray ducting, and industrial substation power feeds. Features extruded cross-linked polyethylene (XLPE) dielectric for high thermal overload rating (90°C continuous / 250°C short circuit).',
    features: [
      'Heavy galvanized steel strip/wire mechanical armoring',
      'Weather, moisture, and chemical resistant outer sheath',
      'High short-circuit rating withstand capability',
      'Tested to IS 7098 (Part 1)'
    ],
    specifications: {
      'Conductor': 'High Grade EC Grade Aluminium Stranded',
      'Configuration': '4 Core x 16 sq.mm',
      'Insulation': 'XLPE (Cross-linked Polyethylene)',
      'Armour': 'Galvanized Steel Strip (IS 3975)',
      'Voltage Grade': '650/1100 Volts'
    },
    applications: ['Transformer to Main LT Panel Feeder', 'Factory machine floor supply', 'Underground power trenching', 'DG set connection'],
    certifications: ['IS 7098 Part 1', 'CPRI Tested', 'ISO 9001'],
    warranty: '3 Years Performance Guarantee',
    bulkDiscountTiers: [
      { minQty: 100, discountPercent: 8 },
      { minQty: 500, discountPercent: 15 }
    ]
  },

  // 2. Switches & Sockets
  {
    id: 'pr-switch-01',
    name: 'Schneider Electric AvatarOn 16A 1-Way Modular Switch with LED Locator',
    slug: 'schneider-avataron-16a-1-way-modular-switch',
    brand: 'Schneider Electric',
    brandId: 'schneider-electric',
    category: 'Switches & Sockets',
    categoryId: 'switches-sockets',
    sku: 'PWR-SCH-AVT-16A',
    price: 240,
    originalPrice: 285,
    unit: 'per Piece',
    minOrderQty: 5,
    stock: 500,
    inStock: true,
    rating: 4.9,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Frameless ultra-slim modular switch with patented “Slim Click” mechanism and soft fluorescent night locator.',
    description: 'Schneider AvatarOn delivers modern aesthetics with full-face boundary-less rocker plates. Constructed from virgin fire-resistant polycarbonate that resists UV degradation and yellowing over decades of high-load switching.',
    features: [
      'Patented SS-mechanism for smooth and quiet tactile actuation',
      'Silver nickel alloy contacts for 100,000+ switching cycles',
      'Self-extinguishing V0 grade flame retardant polycarbonate',
      'Universal modular fit for standard 1M grid plates'
    ],
    specifications: {
      'Rated Current': '16 Amperes',
      'Rated Voltage': '240V AC 50/60Hz',
      'Module Size': '1 Module (1M)',
      'Contact Material': 'Silver Cadmium / Silver Nickel Alloy',
      'Color Finish': 'Glossy White / Matte Crystal'
    },
    applications: ['Luxury residences', 'Commercial office conference rooms', '5-Star hospitality suites', 'High load power appliances'],
    certifications: ['IS 3854:1997', 'IEC 60669-1', 'RoHS Compliant'],
    warranty: '10 Years Replacement Guarantee',
    isBestSeller: true,
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 20, discountPercent: 8 },
      { minQty: 100, discountPercent: 15 }
    ]
  },
  {
    id: 'pr-switch-02',
    name: 'Legrand Arteor 6A/16A Universal Shuttered Heavy Power Socket (2M)',
    slug: 'legrand-arteor-6a-16a-universal-socket',
    brand: 'Legrand',
    brandId: 'legrand',
    category: 'Switches & Sockets',
    categoryId: 'switches-sockets',
    sku: 'PWR-LEG-ART-SKT',
    price: 360,
    originalPrice: 410,
    unit: 'per Piece',
    minOrderQty: 2,
    stock: 310,
    inStock: true,
    rating: 4.8,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Dual-rating universal combination socket with child-safety spring shutters and solid brass phosphor bronze terminals.',
    description: 'Legrand Arteor 6A/16A combined socket accommodates both standard 3-pin plugs and high-power appliances without arcing. Spring-loaded safety shutters prevent accidental foreign object insertion.',
    features: [
      'Automatic safety shutter interlock mechanism',
      'Heavy phosphor bronze terminal clamps for firm grip',
      'Accepts round 3-pin, 2-pin, and industrial small plugs',
      'Tested for 25,000 insertions under continuous load'
    ],
    specifications: {
      'Rating': '6A & 16A Combined Dual Rating',
      'Module Space': '2 Modules (2M)',
      'Voltage': '250V AC',
      'Material': 'UV Stabilized Virgin PC',
      'Terminal': 'Screw terminal with captive washer'
    },
    applications: ['Kitchen heavy appliances', 'Washing machines & geysers', 'Workstations & server racks', 'Residential bedrooms'],
    certifications: ['IS 1293', 'CE', 'ISO 9001'],
    warranty: '10 Years Replacement Guarantee',
    bulkDiscountTiers: [
      { minQty: 25, discountPercent: 7 },
      { minQty: 100, discountPercent: 14 }
    ]
  },
  {
    id: 'pr-switch-03',
    name: 'Anchor Roma Classic 8-Module Horizontal Cover Plate with Metal Grid',
    slug: 'anchor-roma-classic-8m-cover-plate',
    brand: 'Anchor',
    brandId: 'anchor',
    category: 'Switches & Sockets',
    categoryId: 'switches-sockets',
    sku: 'PWR-ANC-ROM-8M',
    price: 215,
    originalPrice: 250,
    unit: 'per Piece',
    minOrderQty: 2,
    stock: 450,
    inStock: true,
    rating: 4.7,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Sturdy steel inner mounting frame with snap-on high gloss anti-microbial outer plate.',
    description: 'The standard choice for large-scale housing complexes and commercial installations. Features anti-dust formulation and galvanized steel sub-frame that eliminates wall unevenness during screw fastening.',
    features: [
      'Galvanized 1.2mm steel inner grid frame',
      'Smooth snap-lock outer cover with zero screw visibility',
      'Scratch and chemical resistant glossy finish'
    ],
    specifications: {
      'Capacity': '8 Modules Horizontal',
      'Frame Material': 'Zinc Coated Rust-Resistant CRCA Steel',
      'Dimensions': '245mm x 90mm x 9mm',
      'Color': 'Polar White'
    },
    applications: ['Apartment switchboards', 'Hospital corridors', 'Commercial office workstations'],
    certifications: ['IS 3854', 'RoHS'],
    warranty: '5 Years Warranty',
    bulkDiscountTiers: [
      { minQty: 50, discountPercent: 10 },
      { minQty: 200, discountPercent: 18 }
    ]
  },

  // 3. MCB & MCCB
  {
    id: 'pr-mcb-01',
    name: 'Schneider Electric Acti9 iC60N 16A Single Pole (SP) C-Curve MCB',
    slug: 'schneider-acti9-ic60n-16a-sp-mcb',
    brand: 'Schneider Electric',
    brandId: 'schneider-electric',
    category: 'MCB & MCCB',
    categoryId: 'mcb-mccb',
    sku: 'PWR-SCH-MCB-16SP',
    price: 390,
    originalPrice: 460,
    unit: 'per Piece',
    minOrderQty: 1,
    stock: 620,
    inStock: true,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial-grade 10kA breaking capacity miniature circuit breaker with VisiTrip fault indicator and VisiSafe isolation.',
    description: 'Schneider Acti9 iC60N is the worldwide standard in high-reliability circuit protection. Features distinct red mechanical flag on the front face to instantly spot faulty circuits, along with class 3 current limitation to protect downstream wiring from thermal shock.',
    features: [
      '10,000A (10kA) short circuit breaking capacity to IEC 60898-1',
      'Patented VisiTrip mechanical red window indicates fault tripping',
      'VisiSafe green strip guarantees contact opening safety during maintenance',
      'Bi-connect terminals for dual busbar and cable connection'
    ],
    specifications: {
      'Poles': '1 Pole (SP)',
      'Rated Current (In)': '16 Amperes',
      'Tripping Curve': 'Type C (5-10 x In)',
      'Breaking Capacity (Icn)': '10kA at 240V AC',
      'Operating Voltage': '240V / 415V AC',
      'Mounting': '35mm DIN Rail'
    },
    applications: ['Lighting and power distribution circuits', 'Air conditioning compressor protection', 'Commercial retail panelboards'],
    certifications: ['IEC/EN 60898-1', 'IEC/EN 60947-2', 'CE Marked', 'BIS'],
    warranty: '3 Years Replacement Warranty',
    isBestSeller: true,
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 12, discountPercent: 8 },
      { minQty: 60, discountPercent: 15 },
      { minQty: 120, discountPercent: 20 }
    ]
  },
  {
    id: 'pr-mcb-02',
    name: 'Havells Euroload 32A Double Pole (DP) C-Curve MCB 10kA',
    slug: 'havells-euroload-32a-dp-mcb',
    brand: 'Havells',
    brandId: 'havells',
    category: 'MCB & MCCB',
    categoryId: 'mcb-mccb',
    sku: 'PWR-HAV-MCB-32DP',
    price: 840,
    originalPrice: 980,
    unit: 'per Piece',
    minOrderQty: 1,
    stock: 280,
    inStock: true,
    rating: 4.8,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Double pole breaker designed for main isolation and high-draw residential and commercial sub-mains.',
    description: 'Provides simultaneous disconnection of both live phase and neutral conductors, preventing reverse neutral electrocution during distribution faults. Features silver-graphite arc chutes with 13 de-ionizing plates for lightning-fast arc quenching.',
    features: [
      'Complete Phase + Neutral protection & isolation',
      '13-plate arc chute chamber for rapid suppression (< 3ms)',
      'Low watt loss design surpassing international green building norms',
      'Padlocking facility on toggle'
    ],
    specifications: {
      'Poles': '2 Poles (DP)',
      'Rated Current': '32 Amps',
      'Breaking Capacity': '10kA',
      'Tripping Characteristic': 'C Curve',
      'Rated Frequency': '50 Hz'
    },
    applications: ['Apartment main entrance isolation', 'Heavy 2-Ton inverter split ACs', 'EV charging sub-metering points'],
    certifications: ['IS/IEC 60898-1', 'CPRI Certified'],
    warranty: '2 Years Guarantee',
    bulkDiscountTiers: [
      { minQty: 10, discountPercent: 6 },
      { minQty: 50, discountPercent: 14 }
    ]
  },
  {
    id: 'pr-mcb-03',
    name: 'L&T Omega 100A 3-Pole 25kA Heavy Moulded Case Circuit Breaker (MCCB)',
    slug: 'l-t-omega-100a-3p-25ka-mccb',
    brand: 'L&T',
    brandId: 'l-t',
    category: 'MCB & MCCB',
    categoryId: 'mcb-mccb',
    sku: 'PWR-LNT-MCCB-100A',
    price: 6850,
    originalPrice: 7900,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 45,
    inStock: true,
    rating: 4.9,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial thermal-magnetic MCCB with adjustable thermal overload settings for main LT switchboards.',
    description: 'L&T Omega Series MCCBs offer superior protection against overload and short circuit currents in commercial buildings and manufacturing plants. Features rugged thermoset moulding casing and adjustable thermal release (0.8 - 1.0 x In).',
    features: [
      '25kA breaking capacity at 415V AC',
      'Adjustable thermal trip dial for fine load tuning',
      'High impulse withstand voltage (Uimp = 8kV)',
      'Compatible with rotary handle mechanism and undervoltage release'
    ],
    specifications: {
      'Configuration': '3 Pole (3P)',
      'Frame Size': '125A Frame',
      'Rated Current (In)': '100 Amperes',
      'Ultimate Breaking Capacity (Icu)': '25kA at 415V',
      'Rated Insulation Voltage (Ui)': '800V'
    },
    applications: ['Main incoming breaker for commercial towers', 'Industrial motor control centers', 'Solar inverters combiner LT panel'],
    certifications: ['IEC 60947-2', 'IS/IEC 60947-2', 'CE'],
    warranty: '3 Years Warranty',
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 3, discountPercent: 5 },
      { minQty: 10, discountPercent: 12 }
    ]
  },
  {
    id: 'pr-mcb-04',
    name: 'Siemens 40A 4-Pole 30mA Residual Current Circuit Breaker (RCCB/ELCB)',
    slug: 'siemens-40a-4p-30ma-rccb',
    brand: 'Siemens',
    brandId: 'siemens',
    category: 'MCB & MCCB',
    categoryId: 'mcb-mccb',
    sku: 'PWR-SIE-RCCB-40A30',
    price: 3250,
    originalPrice: 3750,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 92,
    inStock: true,
    rating: 4.9,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'High sensitivity 30mA 4-pole earth leakage circuit breaker providing life-saving human shock protection.',
    description: 'Essential for safety compliance across all 3-phase commercial and residential installations. Trips within 30 milliseconds when detecting microscopic leakage to earth, safeguarding against fatal electrocution and electrical fire hazards caused by insulation degradation.',
    features: [
      'True 30mA human life protection tripping threshold',
      'Electromechanical operation operates even with neutral loss',
      'High surge withstand to avoid nuisance tripping during lightning',
      'Push-to-test button for regular safety audits'
    ],
    specifications: {
      'Poles': '4 Pole (3 Phase + Neutral)',
      'Rated Current': '40 Amps',
      'Sensitivity (IΔn)': '30mA',
      'Tripping Time': '< 30 milliseconds',
      'Operating Voltage': '415V AC'
    },
    applications: ['Whole apartment/villa earth protection', 'Commercial kitchen machinery', 'Swimming pool pumps & outdoor landscape lighting'],
    certifications: ['IS 12640 Part 1', 'IEC 61008-1', 'VDE Certified'],
    warranty: '2 Years Manufacturer Warranty',
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 6 },
      { minQty: 20, discountPercent: 12 }
    ]
  },

  // 4. Distribution Boards
  {
    id: 'pr-db-01',
    name: 'Havells 8-Way SPN Double Door Enclosed Distribution Board (IP43)',
    slug: 'havells-8-way-spn-double-door-db',
    brand: 'Havells',
    brandId: 'havells',
    category: 'Distribution Boards',
    categoryId: 'distribution-boards',
    sku: 'PWR-HAV-DB-SPN8',
    price: 1450,
    originalPrice: 1720,
    unit: 'per Box',
    minOrderQty: 1,
    stock: 120,
    inStock: true,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Deep drawn CRCA sheet steel enclosure with top/bottom conduit knockouts and insulated copper busbar.',
    description: 'Precision fabricated from high-grade cold-rolled sheet steel with 7-tank phosphating and pure polyester powder coating for maximum corrosion resistance in humid environments. Features reversible front door and brass earth terminals.',
    features: [
      'IP43 ingress protection rating',
      '100A rated electrolytic tin-plated copper busbar',
      'Fully shrouded neutral link and earthing bars included',
      'Top and bottom detachable gland plates with knockouts'
    ],
    specifications: {
      'Capacity': '8 Ways Single Pole + Neutral',
      'Door Type': 'Double Door (Metal / Acrylic Window)',
      'Enclosure Material': '1.2mm CRCA Sheet Steel',
      'Paint Finish': 'RAL 9003 Powder Coated',
      'Dimensions': '260mm x 220mm x 95mm'
    },
    applications: ['2BHK/3BHK Residential apartments', 'Retail shop panels', 'Individual office suites'],
    certifications: ['IS 13032', 'IEC 61439-3'],
    warranty: '2 Years Manufacturer Warranty',
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 25, discountPercent: 16 }
    ]
  },
  {
    id: 'pr-db-02',
    name: 'Schneider Electric Acti9 6-Way TPN Vertical Double Door Distribution Board',
    slug: 'schneider-acti9-6-way-tpn-db',
    brand: 'Schneider Electric',
    brandId: 'schneider-electric',
    category: 'Distribution Boards',
    categoryId: 'distribution-boards',
    sku: 'PWR-SCH-DB-TPN6',
    price: 4850,
    originalPrice: 5600,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 65,
    inStock: true,
    rating: 4.9,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy commercial 3-phase TPN board with dedicated incomer compartment and insulated phase dividers.',
    description: 'Engineered for commercial spaces, hospitals, and luxury bungalows requiring balanced three-phase power distribution. Incorporates pan assembly design allowing off-wall pre-wiring and modular slide-in integration.',
    features: [
      'Removable pan assembly for easy bench wiring',
      'IK08 mechanical impact resistance',
      'Phase segregated insulated busbar system with safety shields',
      'Dedicated space for 8-pole incomer (MCCB/RCCB) + 18 outgoing poles'
    ],
    specifications: {
      'Type': 'TPN Double Door Vertical',
      'Incomer Slot': 'Up to 8-Pole MCB / Isolator / RCCB / MCCB',
      'Outgoing Capacity': '6-Way TPN (18 Outgoing SP Ways)',
      'Busbar Rating': '160A 415V AC',
      'IP Rating': 'IP43 / IP54'
    },
    applications: ['Commercial office floors', 'Factory sub-distribution', 'Villa 3-phase distribution'],
    certifications: ['IEC 61439-1 & 2', 'CE', 'RoHS'],
    warranty: '3 Years Warranty',
    bulkDiscountTiers: [
      { minQty: 3, discountPercent: 6 },
      { minQty: 10, discountPercent: 14 }
    ]
  },

  // 5. Electrical Conduits
  {
    id: 'pr-cnd-01',
    name: 'Polycab Heavy Duty High Impact Rigid PVC Conduit Pipe 25mm (3m Length)',
    slug: 'polycab-heavy-duty-pvc-conduit-pipe-25mm',
    brand: 'Polycab',
    brandId: 'polycab',
    category: 'Electrical Conduits',
    categoryId: 'electrical-conduits',
    sku: 'PWR-POL-CND-25HD',
    price: 88,
    originalPrice: 105,
    unit: 'per 3-Meter Pipe',
    minOrderQty: 25,
    stock: 2500,
    inStock: true,
    rating: 4.8,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy-gauge unplasticized PVC conduit designed for concealed slab casting and exposed wall routing.',
    description: 'Manufactured from specialized unplasticized polyvinyl chloride (uPVC) with high impact strength, able to withstand heavy concrete casting loads without deformation or crushing. Completely non-conductive, rust-proof, and flame self-extinguishing.',
    features: [
      'Heavy mechanical strength (exceeds 1250N compression load)',
      'Smooth internal bore for friction-free cable pulling',
      'Thermal stability up to +60°C',
      'Corrosion, termite, and acid resistant'
    ],
    specifications: {
      'Outer Diameter': '25mm',
      'Class': 'Heavy Duty (Mechanical Stress Resistant)',
      'Standard Length': '3 Meters (10 Feet)',
      'Material': 'Virgin uPVC (Lead-Free)',
      'Wall Thickness': '2.0mm Nominal'
    },
    applications: ['RCC Slab concealed piping', 'Brick wall chasing', 'Industrial surface conduit wiring'],
    certifications: ['IS 9537 Part 3', 'BIS Certified'],
    warranty: '5 Years Manufacturer Guarantee',
    bulkDiscountTiers: [
      { minQty: 100, discountPercent: 10 },
      { minQty: 500, discountPercent: 18 },
      { minQty: 1000, discountPercent: 24 }
    ]
  },
  {
    id: 'pr-cnd-02',
    name: 'PowerRun Galvanized Steel Flexible Conduit Pipe 32mm (1.25 Inch)',
    slug: 'powerrun-gi-flexible-conduit-32mm',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Electrical Conduits',
    categoryId: 'electrical-conduits',
    sku: 'PWR-CON-GIF-32',
    price: 1850,
    originalPrice: 2150,
    unit: 'per 25-Meter Coil',
    minOrderQty: 1,
    stock: 190,
    inStock: true,
    rating: 4.7,
    reviewsCount: 33,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Interlocked zinc-coated steel flexible conduit for motor vibrations and tight bend cable protection.',
    description: 'Constructed with helical wound galvanized steel strip providing extreme crush resistance and maximum bend flexibility. Protects power cables connected to vibrating machinery, transformers, and industrial motors from abrasive wear.',
    features: [
      'Helically wound interlocking steel structure',
      'Zero risk of kink formation under heavy bends',
      'Superior electromagnetic shielding (EMC protection)',
      'Continuous zinc coating prevents rust'
    ],
    specifications: {
      'Size (Internal)': '32mm (1.25")',
      'Material': 'Galvanized Steel Strip',
      'Length': '25 Meter Coil',
      'Temperature Range': '-45°C to +300°C'
    },
    applications: ['Electric motor terminals', 'CNC machinery connections', 'HVAC chiller cable routing'],
    certifications: ['IS 3480', 'CE'],
    warranty: '2 Years Warranty',
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 7 },
      { minQty: 20, discountPercent: 15 }
    ]
  },

  // 6. Switchgear
  {
    id: 'pr-swg-01',
    name: 'L&T MO 25A 3-Pole AC-3 Heavy Duty Power Contactor (240V Coil)',
    slug: 'l-t-mo-25a-3p-power-contactor-240v',
    brand: 'L&T',
    brandId: 'l-t',
    category: 'Switchgear',
    categoryId: 'switchgear',
    sku: 'PWR-LNT-CNT-25A',
    price: 1980,
    originalPrice: 2320,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 140,
    inStock: true,
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial grade 3-phase electromagnetic contactor for motor starting, HVAC chillers, and automated power switching.',
    description: 'The L&T MO series is the gold standard for reliable industrial motor starting. Designed to operate flawlessly under harsh electrical grid conditions with wide coil voltage tolerances (70% - 110% of rated voltage).',
    features: [
      'High electrical endurance: 1.5 million switching operations',
      'Built-in 1NO + 1NC auxiliary contact block',
      'Captive screw clamps for rapid terminal connection',
      'Direct clip-on mounting to 35mm DIN rail or screw mounting'
    ],
    specifications: {
      'Poles': '3 Main Power Poles',
      'Rated Operational Current (Ie AC-3)': '25 Amperes',
      'Motor Rating at 415V': '11 kW / 15 HP',
      'Control Coil Voltage': '240V AC 50Hz',
      'Auxiliary Contacts': '1NO + 1NC Built-in'
    },
    applications: ['Submersible pump motor starters', 'Industrial conveyor systems', 'Capacitor bank switching', 'AHU fan motors'],
    certifications: ['IEC 60947-4-1', 'IS 13947-4-1', 'CE'],
    warranty: '2 Years Guarantee',
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 6 },
      { minQty: 25, discountPercent: 14 }
    ]
  },
  {
    id: 'pr-swg-02',
    name: 'ABB 63A 4-Pole Manual Changeover Switch with Off Position',
    slug: 'abb-63a-4p-manual-changeover-switch',
    brand: 'ABB',
    brandId: 'abb',
    category: 'Switchgear',
    categoryId: 'switchgear',
    sku: 'PWR-ABB-COS-63A',
    price: 3450,
    originalPrice: 3950,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 58,
    inStock: true,
    rating: 4.8,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy-duty 4-pole changeover switch (Source 1 - OFF - Source 2) for Mains to Generator switching.',
    description: 'Compact modular DIN-rail mountable changeover switch ensuring complete electrical isolation between standard grid power and backup generator supply. Knife-type self-cleaning contacts prevent contact welding during switching.',
    features: [
      'Compact 4-module DIN-rail width saving panel space',
      'Center OFF position prevents flashover between power sources',
      'High short-time withstand current (Icw = 1.5kA for 1 sec)',
      'Padlockable in all 3 positions for technician safety'
    ],
    specifications: {
      'Configuration': '4 Pole (3P+N)',
      'Rated Current': '63 Amperes AC-22A',
      'Operational Voltage': '415V AC',
      'Mechanical Life': '20,000 Operations'
    },
    applications: ['Mains grid to DG backup transfer', 'Solar inverter to grid bypass', 'Commercial uninterrupted power supply'],
    certifications: ['IEC 60947-3', 'EN 60947-3', 'CE'],
    warranty: '2 Years Manufacturer Warranty',
    bulkDiscountTiers: [
      { minQty: 4, discountPercent: 6 },
      { minQty: 12, discountPercent: 12 }
    ]
  },

  // 7. LED Lighting
  {
    id: 'pr-led-01',
    name: 'Havells 36W 2x2 Recessed Commercial LED Panel Light (6500K Cool Day)',
    slug: 'havells-36w-2x2-commercial-led-panel',
    brand: 'Havells',
    brandId: 'havells',
    category: 'LED Lighting',
    categoryId: 'led-lighting',
    sku: 'PWR-HAV-LED-36W2X2',
    price: 1850,
    originalPrice: 2200,
    unit: 'per Unit',
    minOrderQty: 2,
    stock: 340,
    inStock: true,
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Ultra-slim backlit LED troffer delivering 3960 Lumens (110 lm/W) glare-free uniform office illumination.',
    description: 'Designed specifically for false ceiling grid tiles (595mm x 595mm). Incorporates high lumen efficacy SMD LEDs with a non-yellowing PMMA diffuser and isolated high-PF surge-protected driver (4kV).',
    features: [
      'High system efficacy: 110 Lumens/Watt (3960 Total Lumens)',
      'Low unified glare rating (UGR < 19) for zero eye strain',
      '4kV inbuilt surge protection against voltage spikes',
      '50,000 burning hours lifespan with constant current driver'
    ],
    specifications: {
      'Wattage': '36 Watts',
      'Dimensions': '595mm x 595mm x 35mm (2ft x 2ft)',
      'Color Temperature': '6500K (Cool Daylight)',
      'CRI (Color Rendering)': '> 80',
      'Power Factor': '> 0.95',
      'Input Voltage': '140V - 280V AC 50Hz'
    },
    applications: ['Corporate IT offices', 'Hospitals and diagnostic clinics', 'Educational classrooms & libraries', 'Retail showrooms'],
    certifications: ['BIS R-Number', 'BEE 5 Star Efficacy', 'CE', 'RoHS'],
    warranty: '2 Years Complete Replacement Guarantee',
    isBestSeller: true,
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 10, discountPercent: 8 },
      { minQty: 50, discountPercent: 16 },
      { minQty: 100, discountPercent: 22 }
    ]
  },
  {
    id: 'pr-led-02',
    name: 'Polycab 100W IP66 Waterproof Heavy Outdoor LED Floodlight',
    slug: 'polycab-100w-ip66-led-floodlight',
    brand: 'Polycab',
    brandId: 'polycab',
    category: 'LED Lighting',
    categoryId: 'led-lighting',
    sku: 'PWR-POL-FLD-100W',
    price: 2450,
    originalPrice: 2990,
    unit: 'per Piece',
    minOrderQty: 1,
    stock: 145,
    inStock: true,
    rating: 4.9,
    reviewsCount: 73,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy die-cast aluminium floodlight with 6kV surge protection for building facades and construction sites.',
    description: 'Features high grade toughened glass lens, corrosion-proof powder-coated aluminium heat sink, and high power Nichia/Osram LED chips delivering 10,000+ Lumens of intense wide-angle illumination.',
    features: [
      'IP66 waterproof and dust-tight heavy enclosure',
      '6kV surge protection for erratic outdoor power lines',
      '120-degree beam angle with adjustable mounting bracket',
      'Pressure die-cast aluminium housing for heat dissipation'
    ],
    specifications: {
      'Wattage': '100 Watts',
      'Luminous Flux': '10,000 Lumens',
      'Ingress Protection': 'IP66 Weatherproof',
      'Surge Protection': '6 kV',
      'Color Temp': '5700K Natural White'
    },
    applications: ['Construction project night lighting', 'Building facades & parking lots', 'Sports courts and perimeter security'],
    certifications: ['BIS Approved', 'CE', 'RoHS'],
    warranty: '2 Years Manufacturer Warranty',
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 7 },
      { minQty: 20, discountPercent: 15 }
    ]
  },

  // 8. Fans
  {
    id: 'pr-fan-01',
    name: 'Havells Ventil Air Heavy Duty Industrial Exhaust Fan 450mm (18 Inch)',
    slug: 'havells-ventil-air-heavy-duty-exhaust-fan-450mm',
    brand: 'Havells',
    brandId: 'havells',
    category: 'Fans',
    categoryId: 'fans',
    sku: 'PWR-HAV-FAN-EX450',
    price: 3890,
    originalPrice: 4500,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 75,
    inStock: true,
    rating: 4.8,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial grade 1400 RPM exhaust fan with steel aerofoil blades and double ball-bearing copper motor.',
    description: 'Engineered for continuous heavy air displacement in factory floors, commercial kitchens, chemical storage rooms, and large transformer sub-stations. Features dynamically balanced steel blades and vibration-absorbing rubber mountings.',
    features: [
      'High air delivery: 5100 m³/hr (Cubic Meters per Hour)',
      '100% Copper wound heavy induction motor (1400 RPM)',
      'Dual sealed deep groove ball bearings for quiet operation',
      'Epoxy polyester powder coated rust proof frame'
    ],
    specifications: {
      'Sweep Diameter': '450mm (18")',
      'Speed': '1400 RPM',
      'Air Delivery': '5100 m³/hr',
      'Power Consumption': '160 Watts',
      'Supply Voltage': '230V AC Single Phase 50Hz'
    },
    applications: ['Commercial restaurant kitchens', 'Transformer panel rooms', 'Industrial workshops & warehouses'],
    certifications: ['IS 2312', 'BIS Marked', 'ISO 9001'],
    warranty: '2 Years Comprehensive Warranty',
    bulkDiscountTiers: [
      { minQty: 4, discountPercent: 6 },
      { minQty: 16, discountPercent: 14 }
    ]
  },

  // 9. Electrical Accessories
  {
    id: 'pr-acc-01',
    name: 'PowerRun Heavy Duty Brass Double Compression Cable Glands (Pack of 10)',
    slug: 'powerrun-heavy-duty-brass-cable-glands-pack-10',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Electrical Accessories',
    categoryId: 'electrical-accessories',
    sku: 'PWR-ACC-GLD-DC25',
    price: 1650,
    originalPrice: 1950,
    unit: 'per Pack of 10',
    minOrderQty: 1,
    stock: 320,
    inStock: true,
    rating: 4.9,
    reviewsCount: 56,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Nickel-plated brass double compression weatherproof cable glands with neoprene sealing rings for armoured cables.',
    description: 'Engineered for weatherproof IP66 termination of multi-core steel wire armoured cables into junction boxes, switchboards, and motor terminal enclosures. Provides strong mechanical armor grip and double seal against dust and water ingress.',
    features: [
      'Precision machined from high grade CW614N Brass',
      'Corrosion resistant nickel electro-plating',
      'Includes brass locknut, neoprene inner/outer seal, and PVC shroud',
      'Rated IP66 / IP67 ingress protection'
    ],
    specifications: {
      'Thread Size': 'M25 x 1.5 Pitch',
      'Cable Diameter Range': '14.0mm to 20.0mm Over Armour',
      'Material': 'High Tensile Brass (Nickel Plated)',
      'Operating Temp': '-20°C to +100°C'
    },
    applications: ['Armoured cable termination', 'Motor terminal boxes', 'Outdoor junction boxes', 'Substation LT panels'],
    certifications: ['IS 12943', 'IEC 62444', 'CE'],
    warranty: '2 Years Warranty',
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 20, discountPercent: 16 }
    ]
  },
  {
    id: 'pr-acc-02',
    name: 'PowerRun High Conductivity Heavy Duty Copper Ring Terminal Lugs 50 sq.mm (Box of 50)',
    slug: 'powerrun-copper-ring-lugs-50sqmm-box-50',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Electrical Accessories',
    categoryId: 'electrical-accessories',
    sku: 'PWR-ACC-LUG-CU50',
    price: 2100,
    originalPrice: 2450,
    unit: 'per Box (50 Pcs)',
    minOrderQty: 1,
    stock: 210,
    inStock: true,
    rating: 4.8,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Electro-tinned pure electrolytic copper crimp lugs with inspection hole for heavy power terminations.',
    description: 'Forged from seamless pure electrolytic copper tube (99.9% Cu) and electro-tinned to prevent oxidation. Features chamfered barrel for seamless cable entry and inspection hole to verify full cable insertion before hydraulic crimping.',
    features: [
      '99.9% Pure high conductivity electrolytic copper',
      '100% tin plated for oxidation resistance',
      'Annealed to prevent cracking during hydraulic crimping',
      'Heavy wall thickness for vibration-proof connection'
    ],
    specifications: {
      'Cable Size': '50 sq.mm',
      'Stud Hole Diameter': 'M10 (10.5mm)',
      'Quantity': '50 Pieces per Box',
      'Material': 'E-Cu Copper (IS 1897)'
    },
    applications: ['Main breaker connections', 'Transformer terminations', 'Busbar link connections'],
    certifications: ['IS 8308', 'IEC 61238-1'],
    warranty: '1 Year Warranty',
    bulkDiscountTiers: [
      { minQty: 5, discountPercent: 7 },
      { minQty: 25, discountPercent: 15 }
    ]
  },
  {
    id: 'pr-acc-03',
    name: 'PowerRun Professional Flame Retardant PVC Electrical Insulation Tape 10-Pack Assorted',
    slug: 'powerrun-fr-pvc-insulation-tape-10-pack',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Electrical Accessories',
    categoryId: 'electrical-accessories',
    sku: 'PWR-ACC-TAPE-10PK',
    price: 280,
    originalPrice: 350,
    unit: 'per Pack (10 Rolls)',
    minOrderQty: 2,
    stock: 850,
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Industrial grade 0.13mm thickness pressure-sensitive adhesive PVC tape rated up to 600V and 80°C.',
    description: 'High-stretch, moisture and UV resistant PVC insulating tape with non-corrosive rubber adhesive. Meets ISI IS 7809 standards. Includes phase color codes (Red, Yellow, Blue, Black, Green) for immediate circuit identification.',
    features: [
      'Dielectric breakdown strength > 40 kV/mm',
      'Flame retardant self-extinguishing formula',
      'High elongation (180%) without tearing',
      '10 Rolls: 2 Red, 2 Yellow, 2 Blue, 2 Black, 2 Green'
    ],
    specifications: {
      'Width': '18mm',
      'Thickness': '0.13mm',
      'Length per Roll': '9.14 Meters',
      'Voltage Rating': 'Up to 600 Volts'
    },
    applications: ['Phase color identification', 'Cable splicing & joint insulation', 'Harness bundling'],
    certifications: ['IS 7809 (Part 3/Sec 1)', 'RoHS'],
    warranty: '1 Year Storage Guarantee',
    bulkDiscountTiers: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 50, discountPercent: 20 }
    ]
  },

  // 10. Industrial Electrical Products
  {
    id: 'pr-ind-01',
    name: 'Legrand Hypra IP67 32A 3-Phase 5-Pin Industrial Plug & Interlocked Socket Set',
    slug: 'legrand-hypra-ip67-32a-5pin-industrial-plug-socket',
    brand: 'Legrand',
    brandId: 'legrand',
    category: 'Industrial Electrical Products',
    categoryId: 'industrial-electrical-products',
    sku: 'PWR-LEG-IND-32A5P',
    price: 4650,
    originalPrice: 5400,
    unit: 'per Set (Plug + Socket)',
    minOrderQty: 1,
    stock: 48,
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Watertight heavy industrial plug & socket unit with mechanical interlock to prevent unplugging under load.',
    description: 'Designed for harsh industrial environments, construction sites, and maritime docks. Features mechanical switch interlock ensuring the socket cannot be turned ON without the plug fully inserted, and the plug cannot be removed while powered ON.',
    features: [
      'IP67 watertight protection against high pressure water jets and submersion',
      'Polyamide 6 (Nylon) housing with extreme chemical & oil resistance',
      'Nickel-plated brass self-cleaning pins for high current transfer',
      'Integrated earth lead connects first and breaks last for safety'
    ],
    specifications: {
      'Current Rating': '32 Amperes',
      'Pin Configuration': '3P + N + E (5 Pins)',
      'Voltage': '380V - 415V AC Red (6h Clock Position)',
      'Protection Class': 'IP67 / IK09'
    },
    applications: ['Mobile industrial generators', 'Welding stations & plasma cutters', 'Heavy construction cranes', 'Reefer containers'],
    certifications: ['IEC 60309-1 & 2', 'EN 60309', 'CE'],
    warranty: '3 Years Warranty',
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 3, discountPercent: 6 },
      { minQty: 10, discountPercent: 12 }
    ]
  },

  // 11. Tools & Safety Equipment
  {
    id: 'pr-tls-01',
    name: 'PowerRun Pro 1000V VDE Insulated Electrician Toolkit (18 Pieces)',
    slug: 'powerrun-pro-1000v-vde-insulated-toolkit-18pc',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Tools & Safety Equipment',
    categoryId: 'tools-safety-equipment',
    sku: 'PWR-TLS-VDE-18PC',
    price: 6450,
    originalPrice: 7500,
    unit: 'per Kit',
    minOrderQty: 1,
    stock: 60,
    inStock: true,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'GS/VDE certified 1000V AC insulated chrome-vanadium tool set in hard-shell EVA contractor carrying case.',
    description: 'Each individual tool is tested submerged in water at 10,000V AC to guarantee 100% dielectric safety for live-line work up to 1000V AC / 1500V DC. Includes combination pliers, diagonal cutters, wire strippers, insulated screwdrivers (Slotted & Phillips), and digital voltage tester.',
    features: [
      'Certified to IEC 60900:2018 & DIN EN 60900 VDE Standards',
      'Dual-component ergonomic grips with anti-slip finger guard',
      'Drop forged, oil-hardened Chrome-Vanadium (CrV) tool steel',
      'Heavy shockproof carrying case with modular EVA foam slots'
    ],
    specifications: {
      'Piece Count': '18 High-Grade Insulated Tools',
      'Voltage Rating': '1000V AC / 1500V DC Certified',
      'Standards': 'IEC 60900, VDE / GS Tested',
      'Weight': '3.8 kg'
    },
    applications: ['Live panel maintenance', 'Commercial electrical contractor work', 'Solar array inverter troubleshooting'],
    certifications: ['VDE GS Germany', 'IEC 60900', 'CE'],
    warranty: 'Lifetime Hand Tool Warranty',
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 3, discountPercent: 8 },
      { minQty: 10, discountPercent: 16 }
    ]
  },
  {
    id: 'pr-tls-02',
    name: 'PowerRun True RMS 600A AC/DC Digital Clamp Meter with Inrush & Temperature',
    slug: 'powerrun-true-rms-600a-clamp-meter',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Tools & Safety Equipment',
    categoryId: 'tools-safety-equipment',
    sku: 'PWR-TLS-CLM-600',
    price: 3850,
    originalPrice: 4600,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 82,
    inStock: true,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'CAT III 600V safety rated auto-ranging clamp multimeter with 100ms motor inrush current capture.',
    description: 'A vital diagnostic instrument for commercial electricians and HVAC engineers. True RMS ensures accurate current readings on noisy non-linear loads generated by VFDs, LED drivers, and switching power supplies.',
    features: [
      'Measures AC/DC Current up to 600A with 30mm jaw opening',
      'Inrush current mode captures startup surges of industrial motors',
      'Non-Contact Voltage (NCV) detection with optical LED beep alert',
      '6000 Count backlit LCD display with data hold and flashlight'
    ],
    specifications: {
      'AC/DC Current': '0.1A to 600A',
      'AC/DC Voltage': '600V Max (CAT III 600V)',
      'Resistance & Capacitance': '60MΩ / 60mF',
      'Temperature': '-40°C to +1000°C (K-type thermocouple included)'
    },
    applications: ['Motor startup load testing', 'Solar DC string balancing', 'Three-phase current balancing'],
    certifications: ['CAT III 600V', 'CE', 'RoHS'],
    warranty: '2 Years Replacement Guarantee',
    bulkDiscountTiers: [
      { minQty: 3, discountPercent: 6 },
      { minQty: 10, discountPercent: 12 }
    ]
  },

  // 12. Construction Electrical Materials
  {
    id: 'pr-con-01',
    name: 'PowerRun Hot-Dip Galvanized Perforated Cable Tray (150mm Width x 50mm Depth x 2.5m)',
    slug: 'powerrun-hdg-perforated-cable-tray-150mm',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Construction Electrical Materials',
    categoryId: 'construction-electrical-materials',
    sku: 'PWR-CON-TRY-150',
    price: 890,
    originalPrice: 1050,
    unit: 'per 2.5m Section',
    minOrderQty: 4,
    stock: 450,
    inStock: true,
    rating: 4.8,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Heavy-duty 1.6mm thickness hot-dip galvanized steel perforated cable tray for overhead plant routing.',
    description: 'Hot-dip galvanized to IS 2629 / IS 4759 with minimum 65 microns zinc coating thickness, ensuring 25+ years rust-free lifespan in industrial and coastal environments. Perforated slot design provides continuous cable ventilation and rapid tie-down.',
    features: [
      'Hot-dip galvanized (65+ microns zinc) for outdoor & industrial life',
      'Precision slotted holes allow flexible cable clamping at any position',
      'Burr-free rolled smooth edges protect cable jackets from abrasions',
      'Includes coupler plates and high-tensile zinc plated fastener sets'
    ],
    specifications: {
      'Width': '150mm (6")',
      'Flange Depth': '50mm (2")',
      'Standard Length': '2.5 Meters',
      'Sheet Thickness': '1.6mm Hot-Dip Galvanized CRCA Steel',
      'Load Capacity': '120 kg/meter uniform load'
    },
    applications: ['Data centers and server rooms', 'Industrial manufacturing plant ceiling routing', 'Basement commercial parking utility lines'],
    certifications: ['IS 2629', 'IS 4759', 'ISO 9001'],
    warranty: '5 Years Corrosion Guarantee',
    isFeatured: true,
    bulkDiscountTiers: [
      { minQty: 20, discountPercent: 10 },
      { minQty: 100, discountPercent: 20 },
      { minQty: 500, discountPercent: 28 }
    ]
  },
  {
    id: 'pr-con-02',
    name: 'PowerRun Maintenance-Free Copper Bonded Chemical Earthing Electrode (2m x 50mm)',
    slug: 'powerrun-copper-bonded-chemical-earthing-electrode',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Construction Electrical Materials',
    categoryId: 'construction-electrical-materials',
    sku: 'PWR-CON-ERT-50MM',
    price: 3250,
    originalPrice: 3800,
    unit: 'per Electrode + 25kg Compound Kit',
    minOrderQty: 1,
    stock: 95,
    inStock: true,
    rating: 4.9,
    reviewsCount: 61,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Complete pipe-in-pipe chemical earthing system with 250 microns copper bonding and 25kg carbon backfill compound.',
    description: 'Guarantees reliable earth fault dissipation and low earth resistance (< 1 Ohm) without requiring regular water pouring. Dual pipe-in-pipe technology filled with crystalline conductive mineral compounds that retain soil moisture indefinitely.',
    features: [
      '250+ Microns 99.9% electrolytic molecular copper bonding',
      'Includes 25kg specialized Earth Enhancing Backfill Compound (BFC)',
      'Dissipates lightning surges and short circuit fault currents safely',
      'Corrosion resistant with certified 20+ years subterranean life'
    ],
    specifications: {
      'Electrode Length': '2.0 Meters (2000mm)',
      'Outer Diameter': '50mm',
      'Terminal Type': 'Heavy Duty 50x6mm Solid Copper Terminal Strip with 2 M12 Holes',
      'Fault Current Rating': 'Up to 30kA for 1 sec'
    },
    applications: ['Commercial substations', 'Lightning protection down conductors', 'Hospital MRI/diagnostic labs', 'Residential building main grounding'],
    certifications: ['IS 3043:2018', 'IEEE 80', 'CPRI Tested'],
    warranty: '10 Years Performance Guarantee',
    isBestSeller: true,
    bulkDiscountTiers: [
      { minQty: 4, discountPercent: 8 },
      { minQty: 15, discountPercent: 16 }
    ]
  },
  // Additional Products across categories
  {
    id: 'pr-wire-04',
    name: 'Polycab 4 sq.mm Solar DC Cable TUV 2PfG 1169 Double Insulated (Cross-Linked)',
    slug: 'polycab-4-sqmm-solar-dc-cable-tuv',
    brand: 'Polycab',
    brandId: 'polycab',
    category: 'Wires & Cables',
    categoryId: 'wires-cables',
    sku: 'PWR-POL-SOL-4DC',
    price: 68,
    originalPrice: 78,
    unit: 'per Meter',
    minOrderQty: 20,
    stock: 3500,
    inStock: true,
    rating: 4.9,
    reviewsCount: 77,
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Tinned copper cross-linked polyolefin (XLPO) solar string cable engineered for 25-year rooftop UV exposure.',
    description: 'Designed specifically for connecting photovoltaic power modules to array combiners and solar inverters. Certified to withstand continuous 1500V DC operating voltages, ozone exposure, and extreme weather temperatures from -40°C to +120°C.',
    features: [
      'Electron-beam cross-linked halogen-free copolymer insulation & jacket',
      'UV, ozone, and hydrolysis resistant for 25+ years outdoor life',
      'High current capacity with tinned electrolytic copper strands',
      'Flame retardant to EN 60332-1-2'
    ],
    specifications: {
      'Conductor': 'Class 5 Flexible Tinned Copper (4 sq.mm)',
      'Voltage Grade': '1500V DC / 1000V AC',
      'Operating Temp': '-40°C to +120°C',
      'Certification': 'TUV 2PfG 1169 / EN 50618'
    },
    applications: ['Rooftop solar installations', 'Utility-scale solar farms', 'Solar water pump feeds'],
    certifications: ['TUV Rheinland', 'EN 50618', 'RoHS'],
    warranty: '25 Years Expected Lifespan',
    bulkDiscountTiers: [{ minQty: 100, discountPercent: 8 }, { minQty: 500, discountPercent: 16 }]
  },
  {
    id: 'pr-switch-04',
    name: 'Schneider Electric AvatarOn 400W 360-Degree Rotary Electronic Dimmer (1M)',
    slug: 'schneider-avataron-400w-rotary-dimmer',
    brand: 'Schneider Electric',
    brandId: 'schneider-electric',
    category: 'Switches & Sockets',
    categoryId: 'switches-sockets',
    sku: 'PWR-SCH-DIM-400W',
    price: 620,
    originalPrice: 710,
    unit: 'per Piece',
    minOrderQty: 2,
    stock: 140,
    inStock: true,
    rating: 4.8,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Hum-free triac electronic light dimmer for incandescent, halogen, and dimmable LED ceiling fittings.',
    description: 'Provides smooth 0-100% stepless brightness modulation without audible buzzing or flicker. Features soft-start circuitry and integrated thermal protection fuse.',
    features: ['Smooth 360-degree rotary knob', 'Thermal cut-off overload safety', 'Integrated RF noise filter'],
    specifications: { 'Load Capacity': '400 Watts Resistive', 'Voltage': '230V AC 50Hz', 'Module Space': '1M' },
    applications: ['Home theaters', 'Hotel ambient lighting', 'Restaurant dining rooms'],
    certifications: ['IS 3854', 'IEC 60669-2-1'],
    warranty: '2 Years Guarantee',
    bulkDiscountTiers: [{ minQty: 10, discountPercent: 8 }]
  },
  {
    id: 'pr-switch-05',
    name: 'Anchor Roma 100W 5-Step Hum-Free Modular Fan Speed Regulator (1M)',
    slug: 'anchor-roma-100w-5-step-fan-regulator',
    brand: 'Anchor',
    brandId: 'anchor',
    category: 'Switches & Sockets',
    categoryId: 'switches-sockets',
    sku: 'PWR-ANC-REG-5STP',
    price: 295,
    originalPrice: 340,
    unit: 'per Piece',
    minOrderQty: 2,
    stock: 380,
    inStock: true,
    rating: 4.7,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Capacitive step regulator delivering precision RPM control with zero motor humming noise.',
    description: 'High reliability capacitive step speed controller with distinct tactile clicks for 5 speed levels and OFF. Generates zero heat compared to conventional resistance regulators.',
    features: ['Zero motor hum capacitive technology', 'Heavy duty rotary switch rated for 50,000 steps', 'Flame retardant polycarbonate housing'],
    specifications: { 'Power Rating': '100 Watts', 'Speed Steps': '5 Steps + OFF', 'Module Size': '1 Module' },
    applications: ['Ceiling fan control in homes, classrooms, and offices'],
    certifications: ['IS 11037', 'BIS'],
    warranty: '2 Years Warranty',
    bulkDiscountTiers: [{ minQty: 20, discountPercent: 10 }]
  },
  {
    id: 'pr-mcb-05',
    name: 'Siemens 63A 4-Pole Main Isolator Disconnector Switch (DIN Rail)',
    slug: 'siemens-63a-4p-main-isolator-switch',
    brand: 'Siemens',
    brandId: 'siemens',
    category: 'MCB & MCCB',
    categoryId: 'mcb-mccb',
    sku: 'PWR-SIE-ISO-63A4P',
    price: 1120,
    originalPrice: 1320,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 160,
    inStock: true,
    rating: 4.9,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Heavy-duty 4-pole incoming isolation switch providing positive contact disconnection for maintenance.',
    description: 'Complies with isolation standards with large contact gap exceeding 4mm in OFF position. Accommodates padlock in open position for lockout-tagout (LOTO) procedures.',
    features: ['Positive break indication', 'Bi-connect terminal for dual busbar + cable', 'Padlockable toggle in OFF state'],
    specifications: { 'Poles': '4 Pole', 'Current': '63 Amps', 'Utilization Category': 'AC-22A', 'Voltage': '415V' },
    applications: ['Distribution board main incomer', 'Machinery isolation switch', 'Solar inverter AC disconnect'],
    certifications: ['IEC 60947-3', 'IS 13947-3'],
    warranty: '2 Years Guarantee',
    bulkDiscountTiers: [{ minQty: 5, discountPercent: 6 }]
  },
  {
    id: 'pr-db-03',
    name: 'Legrand Practibox S 12-Way Flush Mount Consumer Distribution Board (White Smoked Door)',
    slug: 'legrand-practibox-s-12-way-flush-db',
    brand: 'Legrand',
    brandId: 'legrand',
    category: 'Distribution Boards',
    categoryId: 'distribution-boards',
    sku: 'PWR-LEG-DB-PR12',
    price: 2150,
    originalPrice: 2550,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 85,
    inStock: true,
    rating: 4.9,
    reviewsCount: 37,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Architectural aesthetic flush mount DB with reversible smoked transparent door and integrated level bubble.',
    description: 'Designed for high-end residential interiors where the distribution board is installed in living spaces. Includes built-in spirit level for accurate alignment, terminal blocks, and blanking plates.',
    features: ['Built-in spirit level for effortless flush alignment', '180-degree opening reversible transparent smoked door', 'Insulated IP40 IK07 polycarbonate housing'],
    specifications: { 'Capacity': '12 Modules Single Row', 'Mounting': 'Flush In-Wall', 'Protection': 'IP40 / IK07' },
    applications: ['Luxury apartments', 'High-end retail boutiques', 'Modern villas'],
    certifications: ['IEC 60670-24', 'CE'],
    warranty: '2 Years Warranty',
    bulkDiscountTiers: [{ minQty: 4, discountPercent: 7 }]
  },
  {
    id: 'pr-swg-03',
    name: 'L&T Single Phase Submersible Pump Control Panel 1.5HP with Overload & Dry Run',
    slug: 'l-t-single-phase-submersible-pump-panel-1-5hp',
    brand: 'L&T',
    brandId: 'l-t',
    category: 'Switchgear',
    categoryId: 'switchgear',
    sku: 'PWR-LNT-PMP-15HP',
    price: 3650,
    originalPrice: 4200,
    unit: 'per Panel Box',
    minOrderQty: 1,
    stock: 50,
    inStock: true,
    rating: 4.8,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Pre-wired motor starter panel with heavy start/run capacitors, digital ammeter/voltmeter, and thermal protection.',
    description: 'Complete all-in-one starter control unit for 1.5HP single-phase deep well submersible water pumps. Features high-grade heavy duty contactor, push-button controls, and automatic dry-run prevention.',
    features: ['Digital display for live Voltage and Amperes', 'High capacitance starting & running capacitors', 'Sheet metal IP54 enclosure with lock'],
    specifications: { 'Motor Capacity': '1.5 HP (1.1 kW)', 'Supply': '220V/240V AC 50Hz', 'Capacitors': '120/150 MFD Start + 36 MFD Run' },
    applications: ['Borewell water pumps', 'Residential building water transfer', 'Agricultural pump sets'],
    certifications: ['IS 13947', 'CE'],
    warranty: '1 Year Warranty',
    bulkDiscountTiers: [{ minQty: 3, discountPercent: 6 }]
  },
  {
    id: 'pr-led-03',
    name: 'Havells 20W T5 Integrated LED Batten Tube Light 4ft (Cool Day 6500K)',
    slug: 'havells-20w-t5-integrated-led-batten-4ft',
    brand: 'Havells',
    brandId: 'havells',
    category: 'LED Lighting',
    categoryId: 'led-lighting',
    sku: 'PWR-HAV-LED-20WBAT',
    price: 320,
    originalPrice: 390,
    unit: 'per Piece',
    minOrderQty: 4,
    stock: 650,
    inStock: true,
    rating: 4.7,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Sleek polycarbonate batten delivering 2200 Lumens with 4kV surge resistance and zero dark spots.',
    description: 'High-efficacy energy-saving replacement for traditional 40W fluorescent tube lights. Extruded engineered plastic body provides uniform glare-free distribution along entire 4-foot length.',
    features: ['High lumen output: 110 lm/W (2200 Lumens)', 'Surge protection up to 4kV', 'Easy snap-in mounting clamps included'],
    specifications: { 'Wattage': '20 Watts', 'Length': '1200mm (4 Feet)', 'Efficacy': '110 lm/W', 'CRI': '> 80' },
    applications: ['Residential corridors & kitchens', 'Commercial retail back-offices', 'Underground parking bays'],
    certifications: ['BIS', 'BEE 5-Star', 'RoHS'],
    warranty: '2 Years Replacement Guarantee',
    bulkDiscountTiers: [{ minQty: 20, discountPercent: 10 }, { minQty: 100, discountPercent: 20 }]
  },
  {
    id: 'pr-fan-02',
    name: 'Polycab Superb 1200mm Commercial BLDC Energy Efficient Ceiling Fan',
    slug: 'polycab-superb-1200mm-bldc-ceiling-fan',
    brand: 'Polycab',
    brandId: 'polycab',
    category: 'Fans',
    categoryId: 'fans',
    sku: 'PWR-POL-FAN-BLDC',
    price: 3150,
    originalPrice: 3800,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 90,
    inStock: true,
    rating: 4.9,
    reviewsCount: 81,
    image: 'https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1565151448809-a9c29d0f3938?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Super energy efficient 28W Brushless DC motor ceiling fan with smart RF remote control and timer.',
    description: 'Saves up to 65% electricity compared to regular 75W induction ceiling fans. Operates smoothly on wide voltage variations (110V - 280V) without speed drop.',
    features: ['Consumes only 28 Watts on top speed', 'Point-anywhere RF remote with Boost mode and Sleep timer', 'High air delivery: 235 m³/min with aerodynamic blades'],
    specifications: { 'Sweep': '1200mm (48")', 'Power': '28W BLDC Motor', 'Speed': '360 RPM', 'BEE Star Rating': '5 Star Rating' },
    applications: ['Commercial office open bays', 'Educational institutions', 'Residential bedrooms'],
    certifications: ['BEE 5-Star Certified', 'IS 374', 'BIS'],
    warranty: '3 Years Warranty',
    bulkDiscountTiers: [{ minQty: 5, discountPercent: 7 }, { minQty: 20, discountPercent: 15 }]
  },
  {
    id: 'pr-acc-04',
    name: 'PowerRun DIN Rail Mounted Feed-Through Screw Terminal Blocks 6 sq.mm (Pack of 50)',
    slug: 'powerrun-din-rail-terminal-blocks-6sqmm-50pk',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Electrical Accessories',
    categoryId: 'electrical-accessories',
    sku: 'PWR-ACC-TRM-6MM',
    price: 1250,
    originalPrice: 1500,
    unit: 'per Pack of 50',
    minOrderQty: 1,
    stock: 420,
    inStock: true,
    rating: 4.8,
    reviewsCount: 35,
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Polyamide 6.6 flame-retardant modular terminal blocks for TS35 DIN rail control panels.',
    description: 'Hardened steel clamping yoke with captive screws ensures vibration-proof, high contact pressure wire terminations in industrial automation and power distribution panels.',
    features: ['Flame retardant PA6.6 V0 housing', 'Cross connection bridging capability', 'Fits standard 35mm DIN rail'],
    specifications: { 'Wire Range': '0.5 to 6.0 sq.mm', 'Rated Current': '41 Amps', 'Rated Voltage': '800V', 'Quantity': '50 Pcs' },
    applications: ['Automation control panels', 'Substation marshalling boxes', 'Motor junction boxes'],
    certifications: ['IEC 60947-7-1', 'UL94 V0', 'CE'],
    warranty: '2 Years Warranty',
    bulkDiscountTiers: [{ minQty: 5, discountPercent: 8 }, { minQty: 25, discountPercent: 18 }]
  },
  {
    id: 'pr-ind-02',
    name: 'Siemens 32A 3-Phase 3-Pole Rotary Cam Selector Switch (1-0-2)',
    slug: 'siemens-32a-3p-rotary-cam-selector-switch',
    brand: 'Siemens',
    brandId: 'siemens',
    category: 'Industrial Electrical Products',
    categoryId: 'industrial-electrical-products',
    sku: 'PWR-SIE-CAM-32A',
    price: 1890,
    originalPrice: 2200,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 75,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Industrial rotary cam switch with front panel escutcheon plate and ergonomic operating knob.',
    description: 'Features double-break silver alloy contact elements operated by independent cams for high electrical durability and precise switching between alternate power circuits.',
    features: ['High mechanical life (100,000 operations)', 'Finger-proof IP20 terminal shroud', 'IP65 front panel protection'],
    specifications: { 'Rating': '32 Amps AC-21A', 'Poles': '3 Pole', 'Positions': '1 - 0 - 2 (60 Degree Indexing)', 'Mounting': 'Door/Panel Front Mounting' },
    applications: ['Manual source selection', 'Motor forward-reverse control', 'Ammeter/Voltmeter phase selection'],
    certifications: ['IEC 60947-3', 'IS 13947-3'],
    warranty: '2 Years Warranty',
    bulkDiscountTiers: [{ minQty: 4, discountPercent: 6 }]
  },
  {
    id: 'pr-tls-03',
    name: 'PowerRun Heavy-Duty Ratchet Cable Cutter for Cu/Al Cables up to 240 sq.mm',
    slug: 'powerrun-heavy-duty-ratchet-cable-cutter-240sqmm',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Tools & Safety Equipment',
    categoryId: 'tools-safety-equipment',
    sku: 'PWR-TLS-CUT-240',
    price: 3200,
    originalPrice: 3800,
    unit: 'per Unit',
    minOrderQty: 1,
    stock: 55,
    inStock: true,
    rating: 4.9,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Precision ratchet mechanism cable shearing tool for clean, burr-free cuts on thick copper and aluminium cables.',
    description: 'Two-stage ratchet drive delivers extreme mechanical cutting force with one-handed operation. Induction hardened blades prevent cable deformation or crushing, making lug crimping effortless.',
    features: ['One-hand ratchet drive mechanism', 'Quick release lever to open blades at any cutting stage', 'Non-slip PVC coated safety grips'],
    specifications: { 'Cutting Capacity': 'Up to 240 sq.mm (Copper/Aluminium Cable)', 'Tool Length': '280mm', 'Weight': '800g' },
    applications: ['Electrical contractor cable preparation', 'Substation panel termination', 'Overhead distribution work'],
    certifications: ['DIN ISO 5743', 'CE'],
    warranty: '2 Years Tool Warranty',
    bulkDiscountTiers: [{ minQty: 3, discountPercent: 8 }]
  },
  {
    id: 'pr-con-03',
    name: 'PowerRun Heavy Duty Galvanized Steel Slotted Unistrut Channel (41mm x 41mm x 3m)',
    slug: 'powerrun-gi-slotted-unistrut-channel-41x41',
    brand: 'PowerRun',
    brandId: 'powerrun',
    category: 'Construction Electrical Materials',
    categoryId: 'construction-electrical-materials',
    sku: 'PWR-CON-STR-4141',
    price: 740,
    originalPrice: 880,
    unit: 'per 3-Meter Section',
    minOrderQty: 4,
    stock: 500,
    inStock: true,
    rating: 4.8,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    galleryImages: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'],
    shortDescription: 'Continuous slotted cold-rolled galvanized steel strut channel for supporting cable trays, pipes, and electrical panels.',
    description: 'Industry-standard modular framing channel with inward curled lips providing firm grip for spring channel nuts. Hot-dip galvanized for corrosion-free structural support across industrial ceilings.',
    features: ['2.0mm Heavy gauge pre-galvanized high-yield steel', 'Precision punched 14x28mm elongated slots', 'Compatible with all standard M6 to M12 channel spring nuts'],
    specifications: { 'Dimensions': '41mm x 41mm (1-5/8" x 1-5/8")', 'Length': '3.0 Meters', 'Thickness': '2.0mm', 'Finish': 'Galvanized Zinc' },
    applications: ['Cable tray ceiling trapeze hangers', 'Transformer panel framing', 'Solar panel mounting structures'],
    certifications: ['IS 1079', 'ISO 9001'],
    warranty: '5 Years Structural Warranty',
    bulkDiscountTiers: [{ minQty: 20, discountPercent: 10 }, { minQty: 100, discountPercent: 20 }]
  }
];
