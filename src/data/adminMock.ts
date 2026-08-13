import { Order, QuoteRequest } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'PR-2026-8891',
    customerName: 'Rajesh Sharma',
    companyName: 'Apex Infra & MEP Contractors',
    email: 'r.sharma@apexinfra.in',
    phone: '+91 98230 44551',
    gstin: '27AABCA1234F1Z8',
    shippingAddress: {
      street: 'Tower B, Project Site 4, IT Corridor Rd',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411057',
      landmark: 'Near Phase 2 Metro Pillar 140'
    },
    deliveryType: 'express_site',
    paymentMethod: 'net30_credit',
    paymentStatus: 'Authorized (Net 30)',
    orderStatus: 'Out for Site Delivery',
    items: [
      {
        productId: 'pr-wire-01',
        productName: 'Polycab Maxima FRLS Copper Wire 2.5 sq.mm',
        sku: 'PWR-POL-FRLS-25',
        unitPrice: 3105,
        quantity: 20,
        totalPrice: 62100,
        image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'pr-mcb-01',
        productName: 'Schneider Electric Acti9 iC60N 16A SP MCB',
        sku: 'PWR-SCH-MCB-16SP',
        unitPrice: 331.5,
        quantity: 40,
        totalPrice: 13260,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'pr-cnd-01',
        productName: 'Polycab Heavy Duty Rigid PVC Conduit 25mm',
        sku: 'PWR-POL-CND-25HD',
        unitPrice: 79.2,
        quantity: 120,
        totalPrice: 9504,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 84864,
    tax: 15275.52,
    shippingCost: 0,
    discount: 4500,
    total: 95639.52,
    createdAt: '2026-08-12T14:20:00Z'
  },
  {
    id: 'ord-102',
    orderNumber: 'PR-2026-8890',
    customerName: 'Sunil Mehta',
    companyName: 'Mehta Commercial Electricals',
    email: 'sunil@mehtaelectricals.com',
    phone: '+91 94451 22301',
    gstin: '33AABCM9876Q1ZG',
    shippingAddress: {
      street: 'Plot 45, Guindy Industrial Estate',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600032'
    },
    deliveryType: 'standard',
    paymentMethod: 'bank_rtgs',
    paymentStatus: 'Paid',
    orderStatus: 'Dispatched',
    items: [
      {
        productId: 'pr-led-01',
        productName: 'Havells 36W 2x2 Recessed LED Panel',
        sku: 'PWR-HAV-LED-36W2X2',
        unitPrice: 1554,
        quantity: 50,
        totalPrice: 77700,
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'pr-con-01',
        productName: 'PowerRun HDG Perforated Cable Tray 150mm',
        sku: 'PWR-CON-TRY-150',
        unitPrice: 712,
        quantity: 24,
        totalPrice: 17088,
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 94788,
    tax: 17061.84,
    shippingCost: 850,
    discount: 3200,
    total: 109499.84,
    createdAt: '2026-08-11T09:45:00Z'
  },
  {
    id: 'ord-103',
    orderNumber: 'PR-2026-8889',
    customerName: 'Kavita Iyer',
    companyName: 'Iyer Residency Developers',
    email: 'kavita@iyerbuilders.org',
    phone: '+91 99882 11090',
    shippingAddress: {
      street: 'Flat 402, Green Meadows',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102'
    },
    deliveryType: 'standard',
    paymentMethod: 'upi_card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    items: [
      {
        productId: 'pr-switch-01',
        productName: 'Schneider Electric AvatarOn 16A Switch',
        sku: 'PWR-SCH-AVT-16A',
        unitPrice: 220.8,
        quantity: 24,
        totalPrice: 5299.2,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80'
      },
      {
        productId: 'pr-tls-01',
        productName: 'PowerRun Pro 1000V VDE Insulated Toolkit',
        sku: 'PWR-TLS-VDE-18PC',
        unitPrice: 6450,
        quantity: 1,
        totalPrice: 6450,
        image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 11749.2,
    tax: 2114.85,
    shippingCost: 0,
    discount: 0,
    total: 13864.05,
    createdAt: '2026-08-10T16:10:00Z'
  }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'qt-201',
    fullName: 'Vikramaditya Rao',
    companyName: 'Larsen Green Tech EPC Ltd',
    email: 'v.rao@larsengreentech.com',
    phone: '+91 98200 11982',
    projectType: 'Commercial',
    productInterest: '1000V Armoured XLPE Cables, 250A MCCBs, TPN Distribution Boards, 2x2 LED Troffers',
    quantity: 'Full Bill of Materials (BOM) for 14-Story Commercial Tower (350+ Points)',
    estimatedBudget: '₹ 15,00,000 - ₹ 25,00,000',
    targetDeliveryDate: '2026-09-15',
    deliveryLocation: 'Bandra Kurla Complex, Mumbai, MH',
    additionalRequirements: 'Require CPRI / ERDA test reports for cables and MCCB compliance with IEC 60947-2. Staggered dispatch over 3 weeks.',
    hasBOMFile: true,
    status: 'Pending',
    createdAt: '2026-08-13T10:15:00Z'
  },
  {
    id: 'qt-202',
    fullName: 'Anand Kulkarni',
    companyName: 'SmartGrid Manufacturing Plant',
    email: 'kulkarni.a@smartgridind.com',
    phone: '+91 97654 33219',
    projectType: 'Industrial',
    productInterest: '3-Phase Heavy Power Contactors, Motor Starters, GI Perforated Cable Trays 300mm, IP67 Plugs',
    quantity: 'Machine Floor Expansion (6 Assembly Lines)',
    estimatedBudget: '₹ 8,00,000 - ₹ 12,00,000',
    targetDeliveryDate: '2026-09-01',
    deliveryLocation: 'Sanand Industrial GIDC, Ahmedabad, Gujarat',
    additionalRequirements: 'Schneider or L&T switchgear only. Schneider warranty letter needed on delivery.',
    hasBOMFile: false,
    status: 'Reviewing',
    createdAt: '2026-08-12T17:30:00Z'
  },
  {
    id: 'qt-203',
    fullName: 'Deepak Verma',
    companyName: 'Verma Residency Projects',
    email: 'deepak@vermadevelopers.in',
    phone: '+91 98111 88421',
    projectType: 'Residential',
    productInterest: 'Polycab FRLS Copper Wires (1.5, 2.5, 4.0, 6.0 sq.mm), Modular Roma Switches, Double Door DBs',
    quantity: '84 Luxury Residential Apartments',
    estimatedBudget: '₹ 30,00,000 - ₹ 40,00,000',
    targetDeliveryDate: '2026-09-30',
    deliveryLocation: 'Sector 62, Noida, Uttar Pradesh',
    additionalRequirements: 'Need contractor credit terms (30 Days PDC) with doorstep crane unloading.',
    hasBOMFile: true,
    status: 'Quoted',
    createdAt: '2026-08-11T11:00:00Z'
  }
];
