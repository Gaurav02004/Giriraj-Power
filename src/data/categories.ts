import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'civil-interiors',
    name: 'Civil & Interiors',
    slug: 'civil-interiors',
    iconName: 'Building2',
    description: 'UltraTech Cement, Roff tile adhesives, Dr. Fixit waterproofing, Asian Paints, POP and gypsum ceiling materials.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 165,
    subcategories: ['Cement & Concrete (UltraTech/ACC)', 'Tile Adhesives (Roff T20/T03)', 'Paints & Wall Putty (Asian Paints)', 'Waterproofing & Admixtures', 'Gypsum & POP Sheets', 'Action TESA Plywood & HDHMR']
  },
  {
    id: 'furniture-hardware',
    name: 'Furniture & Architectural Hardware',
    slug: 'furniture-hardware',
    iconName: 'Hammer',
    description: 'Fevicol SH adhesives, soft-close hinges, mortise door handles, telescopic drawer slides, screws, and edge banding.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 120,
    subcategories: ['Fevicol SH Adhesives', 'Soft-Close Auto Hinges', 'Telescopic Drawer Channels', 'Mortise Handles & Locks', 'SS Screws & Anchor Fasteners', 'PVC Edge Banding Tapes']
  },
  {
    id: 'wires-cables',
    name: 'Electrical - Wires & Cables',
    slug: 'wires-cables',
    iconName: 'Cable',
    description: 'Polycab, Finolex, Havells FRLS Copper building wires, armoured cables, submersible and solar cables.',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 140,
    subcategories: ['Polycab FRLS House Wires', 'Finolex Flame Guard Wires', 'Armoured Power Cables', 'Submersible Cables', 'Solar DC Cables', 'Flexible Multi-Core Cables']
  },
  {
    id: 'switches-sockets',
    name: 'Electrical - Switches & Sockets',
    slug: 'switches-sockets',
    iconName: 'ToggleRight',
    description: 'Modular switches, power sockets, designer glass cover plates, stepped fan regulators, and hotel smart grids.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 95,
    subcategories: ['Modular Switches (Legrand/Schneider)', '6A / 16A Power Sockets', 'USB Charger Sockets', 'Cover Plates & Frames', 'Fan Regulators & Dimmers', 'Smart WiFi Switches']
  },
  {
    id: 'mcb-mccb',
    name: 'Electrical - MCB & MCCB',
    slug: 'mcb-mccb',
    iconName: 'ShieldAlert',
    description: 'Miniature circuit breakers, moulded case breakers, RCCB/ELCB earth leakage protection, and isolators.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 88,
    subcategories: ['Single Pole (SP) MCB', 'Double Pole (DP) MCB', 'Triple Pole (TP/TPN) MCB', 'Moulded Case Breakers (MCCB)', 'RCCB / ELCB (30mA / 100mA)', 'Main Isolators']
  },
  {
    id: 'plumbing-sanitary',
    name: 'Plumbing, Sanitary & Bath',
    slug: 'plumbing-sanitary',
    iconName: 'Droplets',
    description: 'Supreme & Astral CPVC/UPVC pipes, sanitary toilet commodes, countertop wash basins, brass faucets, and overhead tanks.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 115,
    subcategories: ['Ceramic Toilet Commodes (Hindware/Cera)', 'Countertop Wash Basins', 'CPVC & UPVC Pipes (Supreme/Astral)', 'Brass Bib Cocks & Pillar Taps', 'Overhead Water Tanks', 'Drainage Traps & Floor Drains']
  },
  {
    id: 'distribution-boards',
    name: 'Distribution Boards',
    slug: 'distribution-boards',
    iconName: 'LayoutGrid',
    description: 'Heavy duty IP43/IP65 single & double door distribution enclosures, vertical TPN DBs, and phase selector panels.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 42,
    subcategories: ['SPN DB (4-16 Way)', 'TPN Double Door DB (4-12 Way)', 'Vertical TPN DB', 'Phase Selector DB', 'Weatherproof Acrylic DBs', 'Busbar Chambers']
  },
  {
    id: 'electrical-conduits',
    name: 'Electrical Conduits & Bends',
    slug: 'electrical-conduits',
    iconName: 'Boxes',
    description: 'Rigid PVC conduits (medium/heavy), GI flexible metal conduits, corrugated sleeves, and installation bends/junctions.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 64,
    subcategories: ['Rigid PVC Conduits (20-32mm)', 'GI Flexible Metal Conduits', 'Corrugated Flexible Pipes', 'Conduit Bends & Couplers', 'Deep Junction Boxes', 'Saddle Clamps & Fasteners']
  },
  {
    id: 'switchgear',
    name: 'Switchgear & Automation',
    slug: 'switchgear',
    iconName: 'Zap',
    description: 'Heavy industrial contactors, thermal overload relays, motorized changeover switches, and automatic transfer switches.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 76,
    subcategories: ['Power Contactors', 'Thermal Overload Relays', 'Automatic Transfer Switches (ATS)', 'Manual Changeover Switches', 'Motor Starters (DOL & Star-Delta)', 'Busbar Isolators']
  },
  {
    id: 'led-lighting',
    name: 'LED Lighting',
    slug: 'led-lighting',
    iconName: 'Lightbulb',
    description: 'Commercial 2x2 LED panel troffers, industrial high bays, weatherproof floodlights, downlights, and flameproof fixtures.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 110,
    subcategories: ['2x2 Recessed LED Panels', 'Industrial High-Bay Lights', 'Outdoor Floodlights IP66', 'Commercial LED Batten 4ft', 'COB Downlights', 'Flameproof Well Glass Lights']
  },
  {
    id: 'tools-hardware',
    name: 'Tools & Construction Equipment',
    slug: 'tools',
    iconName: 'Wrench',
    description: 'Bosch & Stanley rotary hammer drills, angle grinders, laser distance meters, multimeters, and safety helmets.',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 85,
    subcategories: ['Rotary Hammer Drills', 'Heavy Angle Grinders', 'Laser Distance Measures', 'Digital Multimeters & Clamp Meters', 'Safety Helmets & Harnesses', 'Contractor Hand Tool Sets']
  },
  {
    id: 'new-launches',
    name: 'New Launches',
    slug: 'new-launches',
    iconName: 'Sparkles',
    description: 'Latest high-efficiency solar inverters, smart automated touch boards, and energy monitoring panels.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    featuredProductCount: 38,
    subcategories: ['Solar Hybrid Inverters', 'Smart IoT Touch Switchboards', 'Smart Energy Sub-Meters', 'Fire-Retardant Conduit Glues']
  }
];
