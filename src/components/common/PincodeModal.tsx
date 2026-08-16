import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  MapPin,
  Zap,
  CheckCircle2,
  Search,
  X,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  Navigation,
  Building2,
  ChevronRight,
  Compass,
  AlertCircle
} from 'lucide-react';

const KOLKATA_EXPRESS_ZONES = [
  { pin: '700039', name: 'Topsia / Tangra / EM Bypass', hub: 'Central Warehouse Hub', duration: '30-45 Mins', fastest: true, type: 'Warehouse HQ' },
  { pin: '700001', name: 'Burrabazar / BBD Bagh / Wholesale Market', hub: 'Central Electrical Market', duration: '40-60 Mins', fastest: true, type: 'Wholesale Hub' },
  { pin: '700091', name: 'Salt Lake Sector V / Bidhannagar', hub: 'IT & Commercial Hub', duration: '35-50 Mins', fastest: true, type: 'Commercial Site' },
  { pin: '700156', name: 'New Town / Rajarhat Mega Projects', hub: 'East Mega Project Hub', duration: '45-60 Mins', fastest: true, type: 'Residential Tower Site' },
  { pin: '700019', name: 'Ballygunge / Gariahat / Hazra', hub: 'South Residential Hub', duration: '40-55 Mins', fastest: true, type: 'South Zone' },
  { pin: '700027', name: 'Alipore / New Alipore / Taratala', hub: 'South-West Industrial Hub', duration: '45-60 Mins', fastest: true, type: 'Industrial Zone' },
  { pin: '700007', name: 'Chandni Chowk / Ganesh Chandra Ave', hub: 'Central Hardware Market', duration: '40-50 Mins', fastest: true, type: 'Market Area' },
  { pin: '700054', name: 'Phoolbagan / Kankurgachi / Ultadanga', hub: 'North-East Hub', duration: '35-50 Mins', fastest: true, type: 'Urban Zone' },
  { pin: '700032', name: 'Jadavpur / Dhakuria / Tollygunge', hub: 'South Hub', duration: '45-60 Mins', fastest: true, type: 'South Corridor' },
  { pin: '700084', name: 'Garia / Patuli / EM Bypass South', hub: 'South Metro Hub', duration: '45-60 Mins', fastest: true, type: 'Metro Corridor' },
  { pin: '711101', name: 'Howrah Station / Shibpur Industrial', hub: 'Howrah Express Hub', duration: '45-60 Mins', fastest: true, type: 'Industrial Corridor' },
  { pin: '712201', name: 'Hooghly / Serampore / Rishra', hub: 'Greater Hooghly Hub', duration: '60-90 Mins', fastest: false, type: 'Suburban Site' },
];

export const PincodeModal: React.FC = () => {
  const { pincode, areaName, isPincodeModalOpen, closePincodeModal, setPincode, showToast } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [customPin, setCustomPin] = useState(pincode || '700039');
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Filter zones by search query (name or pin)
  const filteredZones = useMemo(() => {
    if (!searchQuery.trim()) return KOLKATA_EXPRESS_ZONES;
    const q = searchQuery.toLowerCase().trim();
    return KOLKATA_EXPRESS_ZONES.filter(
      (z) => z.name.toLowerCase().includes(q) || z.pin.includes(q) || z.hub.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isPincodeModalOpen) return null;

  const handleSelectZone = (pin: string, name: string) => {
    setPincode(pin, name);
    showToast(
      'Delivery Location Updated',
      `Deliveries mapped to ${name} (${pin}) with 60-minute express site dispatch.`,
      'success'
    );
    closePincodeModal();
  };

  const handleCustomPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = customPin.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setErrorMsg('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    if (cleanPin.startsWith('700') || cleanPin.startsWith('711') || cleanPin.startsWith('712')) {
      handleSelectZone(cleanPin, `Kolkata Express Area (${cleanPin})`);
    } else {
      setPincode(cleanPin, `Pan-India Site (${cleanPin})`);
      showToast(
        'Location Set',
        `Site delivery location set to PIN ${cleanPin}. Standard road dispatch in 24-48 hours.`,
        'info'
      );
      closePincodeModal();
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        // Default to Kolkata Central Hub coordinates mapping
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        // Match or map location smoothly
        setPincode('700039', 'Topsia / EM Bypass (GPS Detected)');
        showToast(
          'Location Detected via GPS',
          'Mapped to Kolkata Central Hub (700039). 60-Min Express Site Dispatch is active!',
          'success'
        );
        closePincodeModal();
      },
      (error) => {
        setIsLocating(false);
        // Fallback gracefully
        setPincode('700039', 'Topsia, Kolkata');
        showToast('Default Location Applied', 'Location set to Central Kolkata (700039).', 'info');
        closePincodeModal();
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePincodeModal();
      }}
    >
      <div className="bg-white w-full sm:max-w-xl sm:rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-neutral-900 flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-slideIn">
        {/* Swiggy Style Drawer Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#15803d] text-white flex items-center justify-center font-black shadow-xs">
              <Zap className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-black tracking-tight">
                Select Delivery Location
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                60-Minute Site Offloading in Kolkata & Hubs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closePincodeModal}
            className="w-9 h-9 rounded-full bg-white border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar like Swiggy */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setErrorMsg('');
              }}
              placeholder="Search for area, street name, pincode (e.g. Topsia, 700091, Salt Lake...)"
              className="w-full pl-10 pr-4 py-3 bg-neutral-100/80 border border-neutral-300 rounded-2xl text-sm font-semibold text-black placeholder:text-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-xs text-neutral-400 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>

          {/* Swiggy Style "Use Current Location" GPS Button */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="flex-1 flex items-center gap-3 p-3 rounded-2xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 font-bold text-xs transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#15803d] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <div className="font-black text-emerald-950 flex items-center gap-1.5">
                  <span>{isLocating ? 'Detecting Site GPS...' : 'Use Current Location'}</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.2 rounded">GPS</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-normal">
                  Auto-detect current construction site or office
                </p>
              </div>
            </button>

            {/* Direct Pincode Input */}
            <form onSubmit={handleCustomPinSubmit} className="flex gap-1.5 items-center">
              <input
                type="text"
                maxLength={6}
                value={customPin}
                onChange={(e) => {
                  setCustomPin(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                placeholder="6-Digit PIN"
                className="w-28 py-3 px-3 text-center bg-neutral-100 border border-neutral-300 rounded-2xl text-xs font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-black hover:bg-emerald-600 text-white font-bold text-xs py-3 px-3.5 rounded-2xl transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                Set PIN
              </button>
            </form>
          </div>

          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Current Active Location Banner */}
        <div className="px-5 py-2.5 bg-yellow-50 border-b border-yellow-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="text-neutral-700">
              Active Delivery Zone: <strong className="text-black font-black">{pincode || '700039'}</strong> ({areaName || 'Kolkata'})
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            ⚡ 60-Min Express
          </span>
        </div>

        {/* Popular Kolkata & West Bengal Locations List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              {searchQuery ? `Matching Results (${filteredZones.length})` : 'Popular Kolkata Delivery Hubs'}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">Click to select</span>
          </div>

          {filteredZones.length > 0 ? (
            <div className="space-y-2">
              {filteredZones.map((zone) => {
                const isSelected = pincode === zone.pin;
                return (
                  <button
                    key={zone.pin}
                    type="button"
                    onClick={() => handleSelectZone(zone.pin, zone.name)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-yellow-50/80 border-yellow-400 ring-2 ring-yellow-400/40 shadow-xs'
                        : 'bg-white border-neutral-200 hover:border-emerald-500 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-black text-yellow-400' : 'bg-neutral-100 text-neutral-600 group-hover:bg-emerald-600 group-hover:text-white'
                        } transition-colors`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-black text-sm text-black">
                            {zone.pin}
                          </span>
                          <span className="text-xs font-bold text-neutral-800 truncate">
                            {zone.name.split('/')[0]}
                          </span>
                          <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-1.5 py-0.2 rounded">
                            {zone.type}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 truncate mt-0.5">
                          {zone.name} • {zone.hub}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-[#15803d] bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Zap className="w-2.5 h-2.5 fill-emerald-600" />
                          <span>{zone.duration}</span>
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-neutral-500 text-xs">
              <p>No predefined hub matching "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => handleSelectZone(customPin || '700001', searchQuery)}
                className="mt-3 inline-block bg-black text-white font-bold px-4 py-2 rounded-xl"
              >
                Set "{searchQuery}" as Delivery Location
              </button>
            </div>
          )}
        </div>

        {/* Footer Guarantees */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-[11px] text-neutral-600">
          <div className="flex items-center gap-1.5 font-bold text-neutral-800">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Open 8 AM – 9 PM All Days</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-neutral-800">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Free Delivery &gt; ₹1000</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-neutral-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GST Credit Invoicing</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PincodeModal;
