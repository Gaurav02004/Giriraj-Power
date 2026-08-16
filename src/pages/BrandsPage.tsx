import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Authorized Brand Partners' }]} />
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Authorized Manufacturer Partners
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Giriraj Power is an authorized Tier-1 master distributor for India and the world's most trusted electrical equipment manufacturers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-neutral-200 hover:border-black p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-yellow-400 border border-yellow-500/30 flex items-center justify-center font-black text-black text-sm">
                      {brand.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black">{brand.name}</h3>
                      <p className="text-xs text-neutral-500">Origin: {brand.origin} • Est. {brand.established}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct OEM</span>
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {brand.description}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap gap-2 text-xs">
                  {brand.certifications.map((cert, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-yellow-50 text-neutral-800 border border-yellow-200 px-2.5 py-1 rounded-md text-[11px] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  {brand.productCount}+ Active SKUs in Catalog
                </span>
                <Link
                  to={`/products?brand=${brand.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-emerald-600 transition-colors"
                >
                  <span>Browse {brand.name} Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
