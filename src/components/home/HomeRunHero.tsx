import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { GirirajPowerLogo } from '../common/GirirajPowerLogo';
import {
  MapPin,
  Truck,
  ShieldCheck,
  Percent,
  Banknote,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const HomeRunHero: React.FC = () => {
  const { pincode, city, areaName, openPincodeModal } = useShop();

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-2 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-[#fafafa] border border-neutral-200/80 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px]">
            {/* Left Content Area (Columns 1 to 6/7) */}
            <div className="lg:col-span-6 p-6 sm:p-8 lg:p-12 flex flex-col justify-center space-y-6 z-10">
              {/* Location Badge (Serving Kolkata) */}
              <div className="inline-flex items-center gap-1.5 self-start bg-[#e8f5e9] text-[#15803d] font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full border border-emerald-200">
                <MapPin className="w-4 h-4 text-[#15803d] fill-[#15803d]/20" />
                <span>Serving {city || 'Kolkata'}</span>
              </div>

              {/* Main Headline (Exact Typography as Screenshot) */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 tracking-tight leading-[1.12]">
                  Construction materials <br />
                  delivered in <span className="text-[#15803d]">60 minutes.</span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 font-medium pt-1">
                  Everything on wholesale prices.
                </p>
              </div>

              {/* 4 Feature Cards (2x2 Grid Exact as Screenshot) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* 1. Pay on Delivery */}
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
                    {/* Hand with Rupee Coin */}
                    <Banknote className="w-5 h-5 text-[#b45309]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-neutral-900 leading-tight">
                      Pay on Delivery
                    </h4>
                  </div>
                </div>

                {/* 2. No minimum order value */}
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#15803d]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-neutral-900 leading-tight">
                      No minimum <br className="hidden sm:inline" /> order value
                    </h4>
                  </div>
                </div>

                {/* 3. Free Delivery */}
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#15803d] flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-[#15803d]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-neutral-900 leading-tight">
                      Free Delivery
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      on orders above ₹1000
                    </p>
                  </div>
                </div>

                {/* 4. Upto 2% Cashback */}
                <div className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                  <div className="w-10 h-10 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0">
                    <Percent className="w-5 h-5 text-[#b45309]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-neutral-900 leading-tight">
                      Upto 2% Cashback
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-medium">
                      on every order
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#f2b808] hover:bg-[#e0a800] text-black font-black text-sm px-6 py-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Shop 60-Min Materials</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <span>Upload BOM / Get Wholesale Quote</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Area: Delivery Truck Loaded with Materials (Columns 7 to 12) */}
            <div className="lg:col-span-6 relative overflow-hidden bg-neutral-900 min-h-[380px] lg:min-h-[460px] flex items-center justify-center">
              {/* Construction Site Background Photo */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d0fbb180c5f7?auto=format&fit=crop&w=1200&q=80')`,
                }}
              />

              {/* Angled Polygon Accent Cut (Yellow & Green Stripes matching screenshot) */}
              <div className="absolute inset-y-0 -left-12 w-28 bg-[#fafafa] -skew-x-12 z-1 hidden lg:block border-r-8 border-[#15803d]" />
              <div className="absolute inset-y-0 -left-4 w-6 bg-[#f2b808] -skew-x-12 z-2 hidden lg:block" />

              {/* Truck Payload Composition Container */}
              <div className="relative z-10 w-full max-w-lg px-4 py-6 flex flex-col items-center">
                {/* Truck Bed & Cargo Presentation */}
                <div className="w-full bg-neutral-900/90 rounded-2xl border-2 border-neutral-700/80 p-4 shadow-2xl backdrop-blur-xs space-y-3">
                  {/* Top Truck Cabin Badge */}
                  <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center p-0.5 border border-neutral-700">
                        <GirirajPowerLogo className="w-full h-full" withBg={false} />
                      </div>
                      <span className="text-xs font-black text-white tracking-wide">
                        Giriraj <span className="text-[#4ade80]">Power</span> Express Fleet
                      </span>
                    </div>
                    <span className="bg-[#15803d] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full animate-pulse">
                      ⚡ 60 MINS DISPATCH
                    </span>
                  </div>

                  {/* Visual Cargo Payload Grid (UltraTech, Roff, Action TESA, Polycab, Asian Paints, Fevicol, Hindware) */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    {/* UltraTech Cement */}
                    <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-left">
                      <div className="text-[10px] font-black text-amber-300">UltraTech</div>
                      <div className="text-[9px] text-neutral-300">CEMENT 50KG</div>
                      <div className="text-[8px] text-amber-200/80 font-mono">The Engineer's Choice</div>
                    </div>

                    {/* Roff T20 Tile Adhesive */}
                    <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-400/40 text-left">
                      <div className="text-[10px] font-black text-emerald-300">Roff T20</div>
                      <div className="text-[9px] text-neutral-300">Tile Adhesive</div>
                      <div className="text-[8px] text-emerald-200/80 font-mono">Pidilite Matik</div>
                    </div>

                    {/* Action TESA Strong-Board */}
                    <div className="p-2 rounded-xl bg-yellow-600/20 border border-yellow-400/40 text-left">
                      <div className="text-[10px] font-black text-yellow-300">Action TESA</div>
                      <div className="text-[9px] text-neutral-300">HDHMR Board</div>
                      <div className="text-[8px] text-yellow-200/80 font-mono">Classic 8x4</div>
                    </div>

                    {/* Polycab Green Wire */}
                    <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-left">
                      <div className="text-[10px] font-black text-emerald-300">POLYCAB</div>
                      <div className="text-[9px] text-neutral-300">FRLS 90m Wire</div>
                      <div className="text-[8px] text-emerald-200/80 font-mono">Green Wire Box</div>
                    </div>

                    {/* Asian Paints Royale */}
                    <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-left">
                      <div className="text-[10px] font-black text-rose-300">asianpaints</div>
                      <div className="text-[9px] text-neutral-300">Royale Luxury</div>
                      <div className="text-[8px] text-rose-200/80 font-mono">Emulsion 4L</div>
                    </div>

                    {/* Fevicol SH & Commode */}
                    <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/40 text-left">
                      <div className="text-[10px] font-black text-blue-300">FEVICOL SH</div>
                      <div className="text-[9px] text-neutral-300">& Hindware WC</div>
                      <div className="text-[8px] text-blue-200/80 font-mono">Resin 5kg + Basin</div>
                    </div>
                  </div>

                  {/* Truck Tailgate Brand Plate */}
                  <div className="bg-neutral-950 rounded-xl p-2.5 flex items-center justify-between border border-neutral-800">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center p-0.5 border border-neutral-700">
                        <GirirajPowerLogo className="w-full h-full" withBg={false} />
                      </div>
                      <span className="text-xs font-black text-white tracking-widest font-sans uppercase">
                        Giriraj Power
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      WB-01-GP-6001 • EXPRESS
                    </span>
                  </div>
                </div>

                {/* Micro Guarantee caption */}
                <p className="text-[11px] text-neutral-300 mt-2 text-center">
                  🚚 100% Genuine Materials with Factory Sealed Test Certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
