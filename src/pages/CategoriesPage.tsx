import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import { Layers, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={[{ label: 'Categories Hub' }]} />
          <div className="mt-2">
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Electrical Material Categories
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
              Complete inventory breakdown from primary power distribution and cabling to fine finish wiring accessories and test instruments.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-neutral-200 hover:border-black p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden bg-neutral-100 mb-4 border border-neutral-200">
                  <SafeImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {cat.featuredProductCount}+ SKUs
                  </span>
                </div>

                <h3 className="text-base font-bold text-black group-hover:text-emerald-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                  {cat.description}
                </p>

                {/* Subcategories list */}
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-wider block mb-2">
                    Key Subcategories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-yellow-50 text-neutral-800 border border-yellow-200/60 px-2.5 py-1 rounded-md font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100">
                <Link
                  to={`/products/${cat.slug}`}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-black group-hover:text-emerald-600 py-1 transition-colors"
                >
                  <span>Explore {cat.name} Products</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-600" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
