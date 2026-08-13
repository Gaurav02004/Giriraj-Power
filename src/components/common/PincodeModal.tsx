import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { MapPin, Zap, CheckCircle2, Search, X, Clock, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const POPULAR_KOLKATA_AREAS = [
  { pin: '700039', name: 'Topsia / Tangra / EM Bypass', hub: 'Central Warehouse Hub', fastest: true },
  { pin: '700001', name: 'Burrabazar / BBD Bagh', hub: 'North-Central Hub', fastest: true },
  { pin: '700019', name: 'Ballygunge / Gariahat', hub: 'South Hub', fastest: true },
  { pin: '700091', name: 'Salt Lake Sector V / Bidhannagar', hub: 'IT Park Hub', fastest: true },
  { pin: '700156', name: 'New Town / Rajarhat', hub: 'East Mega Hub', fastest: true },
  { pin: '700027', name: 'Alipore / New Alipore', hub: 'South-West Hub', fastest: true },
  { pin: '700007', name: 'Chandni Chowk / Ganesh Chandra Ave', hub: 'Central Market Hub', fastest: true },
  { pin: '700054', name: 'Phoolbagan / Kankurgachi', hub: 'EM Bypass North Hub', fastest: true },
  { pin: '700032', name: 'Jadavpur / Dhakuria', hub: 'South Kolkata Hub', fastest: true },
  { pin: '700084', name: 'Garia / Patuli / Bypass', hub: 'South Metro Hub', fastest: true },
  { pin: '711101', name: 'Howrah / Shibpur Industrial', hub: 'Howrah Express Hub', fastest: true },
];

export const PincodeModal: React.FC = () => {
  const { pincode, isPincodeModalOpen, closePincodeModal, setPincode, showToast } = useShop();
  const [inputPin, setInputPin] = useState(pincode || '700039');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isPincodeModalOpen) return null;

  const handleApply = (pinToSet: string, areaName?: string) => {
    const cleanPin = pinToSet.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    if (cleanPin.startsWith('700') || cleanPin.startsWith('711') || cleanPin.startsWith('712')) {
      setPincode(cleanPin, areaName || `Kolkata (${cleanPin})`);
      closePincodeModal();
    } else {
      // Allow any Indian pincode with notification
      setPincode(cleanPin, `India Site (${cleanPin})`);
      showToast('Location Updated', `Delivery location updated to PIN ${cleanPin}. (Standard 24-48h for outside Kolkata)`, 'info');
      closePincodeModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 relative overflow-hidden text-neutral-900">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow-xs font-bold">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-black tracking-tight">Select Delivery Location</h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  ⚡ 60 Mins Active
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-medium">
                Serving Kolkata & surrounding construction sites in 60 minutes
              </p>
            </div>
          </div>
          <button
            onClick={closePincodeModal}
            className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-400 hover:text-black transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Form */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-800 mb-1.5 flex items-center justify-between">
              <span>Enter Kolkata PIN Code</span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> 60-Minute Site Delivery
              </span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  maxLength={6}
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value.replace(/\D/g, ''));
                    setErrorMsg('');
                  }}
                  placeholder="e.g. 700039"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono font-bold text-black focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => handleApply(inputPin)}
                className="bg-black hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs active:scale-95 flex items-center gap-1.5"
              >
                <span>Apply</span>
              </button>
            </div>
            {errorMsg && <p className="text-xs text-rose-600 mt-1">{errorMsg}</p>}
          </div>

          {/* Quick Commerce Guarantees */}
          <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-700">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
              <span><strong>60 Mins Delivery</strong> to Kolkata sites</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Free Delivery</strong> on orders &gt; ₹1000</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Pay on Delivery</strong> (Verify first)</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span><strong>No Minimum</strong> order quantity</span>
            </div>
          </div>

          {/* Popular Areas in Kolkata */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                Popular Express Zones in Kolkata
              </span>
              <span className="text-[10px] text-neutral-500">Instant Hub Dispatch</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {POPULAR_KOLKATA_AREAS.map((loc) => {
                const isSelected = pincode === loc.pin;
                return (
                  <button
                    key={loc.pin}
                    type="button"
                    onClick={() => handleApply(loc.pin, `Kolkata (${loc.name})`)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-yellow-50 border-yellow-400 text-black ring-1 ring-yellow-400'
                        : 'bg-white border-neutral-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-neutral-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-black">{loc.pin}</span>
                        {loc.pin === '700039' && (
                          <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 truncate max-w-[170px] mt-0.5">
                        {loc.name}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        ⚡ 60 Mins
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
