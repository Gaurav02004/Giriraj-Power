import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import {
  Zap,
  ShieldCheck,
  Truck,
  Award,
  Users,
  Building,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'About Giriraj Power' }]} />
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              About Giriraj Power Electrical Supply
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Powering Every Project with certified electrical construction materials, transparent contractor pricing, and on-site crane logistics across India.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Our Founding Story & Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-snug">
              Transforming B2B Electrical Construction Procurement in India
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Founded to solve the persistent challenges faced by MEP contractors—delayed material dispatches, counterfeit cables, opaque markup tiers, and missing test certifications—Giriraj Power operates as a high-technology master electrical supplier.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We partner directly with world-class manufacturers like Polycab, Havells, Schneider Electric, Legrand, Siemens, and L&T to provide authentic, BIS-certified materials straight from factory floors to project basements.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200">
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 shadow-xs">
                <div className="text-2xl font-black text-black">500,000+</div>
                <div className="text-xs text-neutral-600 mt-0.5">Meters Cable Supplied</div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-xs">
                <div className="text-2xl font-black text-emerald-800">1,200+</div>
                <div className="text-xs text-neutral-600 mt-0.5">Contractor Clients</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
              <SafeImage
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Giriraj Power Central Electrical Hub"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 border border-neutral-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">The Giriraj Power Standard</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Built to support high-stakes infrastructure and residential projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white">100% Genuine Origin</h4>
              <p className="text-xs text-neutral-400 mt-1">Zero sub-standard conductors. Full batch traceability with original CPRI test certs.</p>
            </div>

            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <Truck className="w-8 h-8 text-yellow-400 mb-3" />
              <h4 className="font-bold text-sm text-white">Direct Site Offloading</h4>
              <p className="text-xs text-neutral-400 mt-1">Hydraulic crane and tail-lift trucks equipped for heavy cable drums.</p>
            </div>

            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <Award className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white">Transparent Slabs</h4>
              <p className="text-xs text-neutral-400 mt-1">Wholesale volume pricing published upfront with no hidden broker margins.</p>
            </div>

            <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800">
              <Cpu className="w-8 h-8 text-yellow-400 mb-3" />
              <h4 className="font-bold text-sm text-white">MEP Engineer Desk</h4>
              <p className="text-xs text-neutral-400 mt-1">In-house technical review of SLDs and BOQs to guarantee flawless breaker matching.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
