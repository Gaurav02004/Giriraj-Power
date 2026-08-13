export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  sku: string;
  price: number;
  originalPrice?: number;
  unit: string; // e.g. "per 90m coil", "per piece", "per box (10 pcs)", "per meter"
  minOrderQty: number;
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  shortDescription: string;
  description: string;
  features: string[];
  specifications: ProductSpecification;
  applications: string[];
  certifications: string[];
  warranty: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  bulkDiscountTiers?: { minQty: number; discountPercent: number }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  image: string;
  featuredProductCount: number;
  subcategories: string[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  origin: string;
  established: string;
  description: string;
  certifications: string[];
  productCount: number;
  featured: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedUnit?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure/EPC' | 'Contractor Supply';
  productInterest: string;
  quantity: string;
  estimatedBudget?: string;
  targetDeliveryDate: string;
  deliveryLocation: string;
  additionalRequirements: string;
  hasBOMFile?: boolean;
  status: 'Pending' | 'Reviewing' | 'Quoted' | 'Approved';
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone: string;
  gstin?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  deliveryType: 'standard' | 'express_site' | 'warehouse_pickup';
  paymentMethod: 'cod' | 'bank_rtgs' | 'net30_credit' | 'upi_card';
  paymentStatus: 'Pending' | 'Paid' | 'Authorized (Net 30)';
  orderStatus: 'Processing' | 'Dispatched' | 'Out for Site Delivery' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  createdAt: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  ratingMin: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
}
