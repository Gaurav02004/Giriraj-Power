import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { GirirajPowerLogo } from '../common/GirirajPowerLogo';
import {
  Zap,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Truck,
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast, openQuoteModal } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      showToast(
        'Newsletter Subscribed',
        'Thank you! You will receive our monthly contractor pricing updates and new product alerts.',
        'success'
      );
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-800 text-sm">
      {/* Top Value Proposition Bar */}
      <div className="border-b border-neutral-800 bg-neutral-900/90 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Genuine Materials</h4>
              <p className="text-xs text-neutral-400 mt-1">Direct authorized brand distribution with manufacturer test certificates.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Project Site Delivery</h4>
              <p className="text-xs text-neutral-400 mt-1">Scheduled heavy truckloads and crane offloading directly to project sites.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Tiered Bulk Discounts</h4>
              <p className="text-xs text-neutral-400 mt-1">Volume slab savings up to 28% for electrical contractors and builders.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Dispatch Support</h4>
              <p className="text-xs text-neutral-400 mt-1">Dedicated MEP estimation engineers and on-demand replenishment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-lg border border-neutral-800 p-0.5 group-hover:scale-105 transition-transform overflow-hidden">
                <GirirajPowerLogo className="w-full h-full" withBg={false} />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Giriraj Power
                </span>
                <p className="text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">
                  Construction Materials in 60 Minutes
                </p>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Giriraj Power delivers wholesale civil, electrical, hardware, sanitary, and interior construction materials directly to contractor job sites in 60 minutes. Free delivery above ₹1,000, Pay on Delivery with zero minimum order limit.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-neutral-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kolkata Central 60-Min Hub: Topsia Industrial Area, Near EM Bypass, Kolkata - 700039, West Bengal</span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Phone className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>Contractor Helpline: <a href="tel:+919007168561" className="text-yellow-400 hover:underline font-bold">+91 90071 68561</a> / <a href="tel:+919874569712" className="text-yellow-400 hover:underline font-bold">+91 98745 69712</a></span>
              </div>
              <div className="flex items-center gap-2.5 text-neutral-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>B2B Quotations Desk: supply@girirajpower.com</span>
              </div>
            </div>

            {/* Compliance badges */}
            <div className="pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                Certified Testing & Standards Compliance
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-neutral-300">
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">IS 694 / IS 7098</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">IEC 60947-2</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">ISO 9001:2015</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">CPRI Tested</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">RoHS Compliant</span>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Material Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className="hover:text-yellow-300 transition-colors inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/categories" className="text-emerald-400 font-semibold hover:underline">
                  View All 12 Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Authorized Brands & Solutions */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Authorized Brands
            </h4>
            <ul className="space-y-2 text-xs">
              {BRANDS.slice(0, 7).map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={`/products?brand=${brand.slug}`}
                    className="hover:text-yellow-300 transition-colors inline-block"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/brands" className="text-emerald-400 font-semibold hover:underline">
                  All 10+ Brand Partners →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Quote & Contractor Links */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Contractor Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => openQuoteModal()}
                  className="text-yellow-300 hover:text-yellow-200 font-semibold flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Project Quote / BOM</span>
                </button>
              </li>
              <li>
                <Link to="/quote" className="hover:text-emerald-400 transition-colors">
                  Upload Bill of Materials (Excel)
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-yellow-300 hover:underline font-semibold">
                  Contractor Portal Login / Register
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Giriraj Power Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Regional Godowns & Yard Pickup
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-emerald-400 transition-colors">
                  Supplier Admin Portal
                </Link>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs font-semibold text-white mb-2">Contractor Price Bulletins</h5>
              <p className="text-[11px] text-neutral-400 mb-2">
                Receive weekly copper price trends and wholesale discount updates.
              </p>
              {isSubscribed ? (
                <div className="p-2 bg-emerald-950/80 border border-emerald-700 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed to weekly bulletins!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter business email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-800 text-xs text-white px-3 py-2 rounded-lg focus:outline-hidden focus:border-yellow-400"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black px-3 py-2 rounded-lg text-xs font-bold shrink-0 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} Giriraj Power Supply Solutions Pvt. Ltd. All rights reserved. “Powering Every Project.”
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>GSTIN: 27AABCP1982K1Z9</span>
            <span>•</span>
            <Link to="/about" className="hover:text-neutral-200">ISO 9001 Certified</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-neutral-200">Contractor Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
