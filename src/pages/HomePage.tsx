import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import { SafeImage } from '../components/common/SafeImage';
import { ValuePropStrip } from '../components/home/ValuePropStrip';
import { HomeRunHero } from '../components/home/HomeRunHero';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  Building2,
  PhoneCall,
  Clock,
  Banknote,
  PackageCheck,
  Percent,
  Sparkles,
  Plus,
  Minus,
  CheckCircle2,
  FileText,
  Hammer,
  Droplets,
  Cable,
  Wrench,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    openQuoteModal,
    pincode,
    city,
    areaName,
    addToCart,
    getItemQuantityInCart,
    updateCartQuantity,
    formatPrice,
    showToast,
  } = useShop();

  const navigate = useNavigate();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'civil' | 'electrical' | 'plumbing' | 'hardware'>('all');

  // Filter products by tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'civil':
        return products.filter((p) => p.categoryId === 'civil-interiors').slice(0, 8);
      case 'electrical':
        return products.filter((p) => p.categoryId === 'wires-cables' || p.categoryId === 'switches-sockets' || p.categoryId === 'mcb-mccb').slice(0, 8);
      case 'plumbing':
        return products.filter((p) => p.categoryId === 'plumbing-sanitary').slice(0, 8);
      case 'hardware':
        return products.filter((p) => p.categoryId === 'furniture-hardware').slice(0, 8);
      default:
        return products.slice(0, 8);
    }
  };

  const displayedProducts = getFilteredProducts();

  return (
    <div className="bg-white min-h-screen text-neutral-900">
      {/* 1. TOP 3-CARD VALUE PROPOSITION STRIP (EXACT AS SCREENSHOT) */}
      <ValuePropStrip />

      {/* 2. MAIN HOMERUN HERO SECTION (EXACT AS SCREENSHOT) */}
      <HomeRunHero />

      {/* 3. QUICK-COMMERCE POPULAR CATEGORIES GRID */}
      <section className="py-8 sm:py-12 bg-[#fafafa] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5 fill-[#15803d]" />
                <span>60-Minute Fast Fulfillment Categories</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                Shop by Material Category
              </h2>
            </div>
            <Link
              to="/categories"
              className="text-xs sm:text-sm font-bold text-[#15803d] hover:text-emerald-800 flex items-center gap-1 group"
            >
              <span>Explore All 12 Categories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="p-4 rounded-2xl bg-white border border-neutral-200 hover:border-[#15803d] hover:shadow-md transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {cat.id === 'civil-interiors' && <Building2 className="w-7 h-7" />}
                  {cat.id === 'furniture-hardware' && <Hammer className="w-7 h-7" />}
                  {cat.id === 'wires-cables' && <Cable className="w-7 h-7" />}
                  {cat.id === 'plumbing-sanitary' && <Droplets className="w-7 h-7" />}
                  {cat.id === 'tools' && <Wrench className="w-7 h-7" />}
                  {cat.id !== 'civil-interiors' && cat.id !== 'furniture-hardware' && cat.id !== 'wires-cables' && cat.id !== 'plumbing-sanitary' && cat.id !== 'tools' && (
                    <Zap className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#15803d] leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-medium mt-1 inline-block">
                    ⚡ 60-Min Stock
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAST COMMERCE PRODUCT DISPATCH SECTION */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803d] animate-ping" />
                <span className="text-xs font-bold text-[#15803d] uppercase tracking-wider">
                  In Stock for 60-Min Site Dispatch ({pincode || '700039'})
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight mt-1">
                Wholesale Construction & MEP Essentials
              </h2>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto text-xs font-bold no-scrollbar">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'all' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                All Quick-Picks
              </button>
              <button
                onClick={() => setActiveTab('civil')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'civil' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Civil & Cement
              </button>
              <button
                onClick={() => setActiveTab('electrical')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'electrical' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Wires & MCB
              </button>
              <button
                onClick={() => setActiveTab('plumbing')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'plumbing' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Plumbing & Sanitary
              </button>
              <button
                onClick={() => setActiveTab('hardware')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'hardware' ? 'bg-white text-black shadow-xs' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Fevicol & Hardware
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#f2b808] hover:bg-[#e0a800] text-black font-black text-sm px-8 py-3.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <span>View Full 500+ Wholesale Materials Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TOP TRUSTED MANUFACTURERS & BRANDS */}
      <section className="py-10 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <p className="text-xs font-bold text-[#f2b808] uppercase tracking-wider">
                Direct Authorized Factory Supply
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Leading Construction & Electrical Brands
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-medium">
              100% Genuine Materials • BIS / ISI Certified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: 'UltraTech Cement', category: 'Cement & Concrete', color: 'border-amber-500/40 text-amber-300' },
              { name: 'Pidilite Roff', category: 'Tile Adhesives', color: 'border-emerald-500/40 text-emerald-300' },
              { name: 'Polycab', category: 'Wires & Cables', color: 'border-emerald-500/40 text-emerald-300' },
              { name: 'Asian Paints', category: 'Paints & Putty', color: 'border-rose-500/40 text-rose-300' },
              { name: 'Fevicol SH', category: 'Wood Adhesives', color: 'border-blue-500/40 text-blue-300' },
              { name: 'Action TESA', category: 'HDHMR Boards', color: 'border-yellow-500/40 text-yellow-300' },
            ].map((brand) => (
              <div
                key={brand.name}
                className={`p-3.5 rounded-2xl bg-neutral-800/80 border ${brand.color} text-center space-y-1`}
              >
                <div className="font-black text-sm text-white">{brand.name}</div>
                <div className="text-[10px] text-neutral-400 font-medium">{brand.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTRACTOR HELPLINE & BOM QUOTE BAR */}
      <section className="py-8 bg-[#f2b808] text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Need Instant 60-Minute Site Delivery for Bulk Project Materials?
            </h3>
            <p className="text-xs sm:text-sm font-medium text-neutral-900">
              Contractors & Builders Helpline: Call directly for live rider tracking and bulk proforma invoices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919007168561"
              className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#f2b808]" />
              <span>+91 9007168561</span>
            </a>
            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer border border-black/10"
            >
              <FileText className="w-4 h-4 text-[#15803d]" />
              <span>Upload Material List (BOM)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
