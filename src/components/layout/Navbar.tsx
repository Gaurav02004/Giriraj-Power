import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { GirirajPowerLogo } from '../common/GirirajPowerLogo';
import {
  Search,
  Zap,
  ChevronDown,
  User,
  ShoppingBag,
  MapPin,
  Menu,
  X,
  PhoneCall,
  LayoutDashboard,
  Flame,
  Truck,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    pincode,
    areaName,
    city,
    openPincodeModal,
    products,
    formatPrice,
  } = useShop();

  const { currentUser, userProfile } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Rotating placeholder keywords
  const searchPlaceholders = [
    'Materials (e.g. UltraTech Cement, Wires, Roff...)',
    'Polycab & Finolex Wires',
    'Modular Switches & Sockets',
    'Roff T20 & Tile Adhesives',
    'Action TESA HDHMR Boards',
    'Fevicol SH & Hardware',
    'CPVC Pipes & Sanitary Ware',
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchFocused(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for autocomplete
  const searchSuggestions = searchQuery.trim()
    ? products
        .filter((p) => {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const selectSuggestion = (slug: string) => {
    navigate(`/product/${slug}`);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  // Nav menus
  const menuItems = [
    { label: 'Home', path: '/', hasDropdown: false },
    {
      id: 'civil-interiors',
      label: 'Civil & Interiors',
      path: '/products?category=civil-interiors',
      hasDropdown: true,
      subcategories: [
        { name: 'Cement & Concrete (UltraTech/ACC)', path: '/products?search=Cement' },
        { name: 'Tile Adhesives (Roff T20/T03)', path: '/products?search=Roff' },
        { name: 'Paints & Wall Putty (Asian Paints)', path: '/products?search=Paint' },
        { name: 'Action TESA Plywood & HDHMR', path: '/products?search=TESA' },
        { name: 'Waterproofing & Admixtures', path: '/products?search=Waterproofing' },
      ],
    },
    {
      id: 'furniture-hardware',
      label: 'Furniture & Architectural Hardware',
      path: '/products?category=furniture-hardware',
      hasDropdown: true,
      subcategories: [
        { name: 'Fevicol SH & Synthetic Resins', path: '/products?search=Fevicol' },
        { name: 'Soft-Close Auto Hinges & Slides', path: '/products?search=Hinges' },
        { name: 'Mortise Handles & Smart Locks', path: '/products?search=Locks' },
        { name: 'SS Fasteners, Screws & Anchor Bolts', path: '/products?search=Screws' },
      ],
    },
    {
      id: 'electrical',
      label: 'Electrical',
      path: '/products?category=wires-cables',
      hasDropdown: true,
      subcategories: [
        { name: 'Polycab & Finolex FRLS Wires', path: '/products?category=wires-cables' },
        { name: 'Modular Switches & Glass Plates', path: '/products?category=switches-sockets' },
        { name: 'MCB, RCCB & Distribution Boards', path: '/products?category=mcb-mccb' },
        { name: 'LED Panels, Battens & High Bays', path: '/products?category=led-lighting' },
        { name: 'Heavy Industrial Switchgear & ATS', path: '/products?category=switchgear' },
      ],
    },
    {
      id: 'plumbing-sanitary',
      label: 'Plumbing, Sanitary & Bath',
      path: '/products?category=plumbing-sanitary',
      hasDropdown: true,
      subcategories: [
        { name: 'Ceramic Toilet Commodes & Basins', path: '/products?search=Commode' },
        { name: 'CPVC & UPVC Plumbing Pipes & Fittings', path: '/products?search=Pipes' },
        { name: 'Brass Faucets, Bib Cocks & Taps', path: '/products?search=Faucets' },
        { name: 'Overhead Tanks & Drainage Traps', path: '/products?search=Tanks' },
      ],
    },
    {
      id: 'new-launches',
      label: 'New Launches',
      path: '/products?category=new-launches',
      hasDropdown: true,
      subcategories: [
        { name: 'Solar Hybrid Power Inverters', path: '/products?search=Solar' },
        { name: 'Smart Touch Home Automation Boards', path: '/products?search=Smart' },
        { name: 'Energy Sub-Meters & Fire Panels', path: '/products?search=Meters' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      path: '/products?category=tools',
      hasDropdown: true,
      subcategories: [
        { name: 'Heavy Rotary Hammer Drills', path: '/products?search=Drill' },
        { name: 'Angle Grinders & Marble Cutters', path: '/products?search=Grinder' },
        { name: 'Laser Distance Meters & Levels', path: '/products?search=Laser' },
        { name: 'Safety Helmets & Contractor Kits', path: '/products?search=Safety' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-neutral-900 shadow-xs">
      {/* 1. MAIN NAVBAR ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-100 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Left: Brand & Location Column Block */}
          <div className="flex flex-col items-start gap-1 shrink-0">
            {/* Top row of block: Logo on left, Business name GIRIRAJ POWER in SOLID TOTAL BLACK to the right of logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group cursor-pointer"
              title="Giriraj Power - Powering Every Project"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform overflow-hidden p-0.5 border border-neutral-800 shrink-0">
                <GirirajPowerLogo className="w-full h-full" withBg={false} />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black text-black tracking-tight uppercase leading-none">
                  GIRIRAJ POWER
                </span>
                <span className="text-[10px] font-bold text-neutral-600 tracking-wider uppercase mt-0.5">
                  Powering Every Project
                </span>
              </div>
            </Link>

            {/* Bottom row of block: Location picker shifted below logo & store name (Swiggy app modal trigger) */}
            <button
              type="button"
              onClick={openPincodeModal}
              id="nav-location-picker"
              className="flex items-center gap-1.5 text-left group/loc cursor-pointer py-0.5 px-2 -ml-1 rounded-lg hover:bg-neutral-100 border border-transparent hover:border-neutral-200 transition-all select-none"
              title="Click to select delivery area / PIN (Swiggy style)"
            >
              <div className="bg-[#15803d] text-white font-black text-[9px] px-1.5 py-0.5 rounded leading-tight flex items-center gap-0.5 shadow-2xs">
                <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                <span>60 Mins</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-neutral-900 group-hover/loc:text-[#15803d] transition-colors">
                <MapPin className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                <span className="truncate max-w-[125px] sm:max-w-[170px]">
                  {pincode ? `${pincode} (${areaName ? areaName.split('/')[0] : 'Kolkata'})` : '700039 (Topsia)'}
                </span>
                <ChevronDown className="w-3 h-3 text-neutral-600 group-hover/loc:translate-y-0.5 transition-transform shrink-0" />
              </div>
            </button>
          </div>

          {/* Center Search Bar */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder={`Search for ${searchPlaceholders[placeholderIndex]}`}
                  className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 text-sm pl-11 pr-24 py-3 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-[#15803d] focus:ring-2 focus:ring-emerald-50 transition-all shadow-2xs"
                />
                {searchQuery.trim() && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-16 text-neutral-400 hover:text-neutral-600 text-xs cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 bg-neutral-900 hover:bg-[#15803d] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neutral-200 rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                <div className="p-2 border-b border-neutral-100 text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex justify-between bg-neutral-50">
                  <span>Quick Construction Matches</span>
                  <span>Press Enter</span>
                </div>
                {searchSuggestions.length > 0 ? (
                  <div className="divide-y divide-neutral-100 max-h-80 overflow-y-auto">
                    {searchSuggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => selectSuggestion(item.slug)}
                        className="w-full p-2.5 text-left hover:bg-neutral-50 flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-200"
                          />
                          <div>
                            <p className="text-xs font-bold text-neutral-900 group-hover:text-[#15803d] line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-neutral-500 font-mono">
                              {item.brand} • SKU: {item.sku}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-neutral-950 font-mono shrink-0 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded">
                          {formatPrice(item.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-neutral-500">
                    No products directly matching "{searchQuery}". Try searching for Cement, Wires, Roff, Fevicol, or Switches.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons (Login, Cart, Mobile Menu) */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Login / Profile Link */}
            <Link
              to="/login"
              id="nav-login-btn"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#15803d] transition-colors py-1.5"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700">
                <User className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">
                {currentUser ? (userProfile?.name?.split(' ')[0] || 'Account') : 'Login'}
              </span>
            </Link>

            {/* Shopping Bag Icon with Cart Count */}
            <Link
              to="/cart"
              id="nav-cart-btn"
              className="relative p-2 text-neutral-900 hover:text-[#15803d] transition-colors flex items-center justify-center bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 rounded-full bg-[#15803d] text-white text-[10px] font-black flex items-center justify-center px-1 border-2 border-white shadow-xs">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-neutral-800 hover:bg-neutral-100 border border-neutral-200 cursor-pointer"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pt-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials (Cement, Wires, Roff, Fevicol...)"
              className="w-full bg-neutral-50 text-neutral-900 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:bg-white"
            />
          </form>
        </div>
      </div>

      {/* 2. CATEGORY NAVIGATION ROW (Home, Civil, Furniture, Electrical, etc.) */}
      <div ref={navContainerRef} className="hidden md:block border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-6 lg:gap-8 py-2.5 text-[13px] text-neutral-800 font-bold whitespace-nowrap">
            {menuItems.map((item) => {
              const isOpen = activeDropdown === item.id;
              return (
                <div key={item.label} className="relative group">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : (item.id || null))}
                      onMouseEnter={() => setActiveDropdown(item.id || null)}
                      className={`flex items-center gap-1 hover:text-[#15803d] transition-colors py-1 cursor-pointer ${
                        isOpen ? 'text-[#15803d] font-black' : ''
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-[#15803d]' : 'text-neutral-500'}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`hover:text-[#15803d] transition-colors py-1 ${
                        location.pathname === item.path ? 'text-[#15803d] font-black' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && isOpen && (
                    <div
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-neutral-200 rounded-xl shadow-xl p-2 z-50 animate-fadeIn"
                    >
                      <div className="p-2 border-b border-neutral-100 text-[11px] font-black text-neutral-500 uppercase tracking-wider bg-neutral-50 rounded-t-lg">
                        {item.label}
                      </div>
                      <div className="divide-y divide-neutral-100 py-1">
                        {item.subcategories?.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-3 py-2 text-xs text-neutral-700 hover:text-neutral-950 hover:bg-emerald-50/60 rounded-lg transition-colors font-medium"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                      <div className="p-2 border-t border-neutral-100">
                        <Link
                          to={item.path}
                          className="block text-center text-xs font-bold text-[#15803d] hover:underline"
                        >
                          View All {item.label} →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. RUNNING NEWS / MESSAGE LINE DIRECTLY BELOW NAVBAR (SHIFTED FROM TOP, RUNNING RIGHT TO LEFT) */}
      <div className="bg-[#f2b808] border-b border-amber-400 py-2 overflow-hidden select-none relative shadow-2xs">
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-8 animate-marquee whitespace-nowrap text-xs sm:text-[13px] font-bold text-neutral-950 tracking-normal">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Open 8 AM to 9 PM All Days • Guaranteed 60-Min Express Site Delivery</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Today's Most Sold Items: UltraTech 53 Grade Cement • Polycab 2.5 sq mm FRLS Wires • Roff T20 Adhesive • Fevicol SH 50kg • CPVC Heavy Pipes • Havells MCBs</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-neutral-900" />
              <span>Bulk Contractor Pricing & Instant GST Input Tax Credit Invoices Available</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-900" />
              <span>Free Delivery on Site Orders Above ₹1,000 across Kolkata & Hubs</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-900" />
              <span>Contractor On-Site Support: +91 9007168561 / +91 9874569712</span>
            </span>
          </div>

          {/* Duplicate loop for seamless infinite marquee */}
          <div className="flex shrink-0 items-center gap-8 animate-marquee whitespace-nowrap text-xs sm:text-[13px] font-bold text-neutral-950 tracking-normal ml-8" aria-hidden="true">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Open 8 AM to 9 PM All Days • Guaranteed 60-Min Express Site Delivery</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Today's Most Sold Items: UltraTech 53 Grade Cement • Polycab 2.5 sq mm FRLS Wires • Roff T20 Adhesive • Fevicol SH 50kg • CPVC Heavy Pipes • Havells MCBs</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-neutral-900" />
              <span>Bulk Contractor Pricing & Instant GST Input Tax Credit Invoices Available</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-neutral-900" />
              <span>Free Delivery on Site Orders Above ₹1,000 across Kolkata & Hubs</span>
            </span>
            <span className="text-amber-900 font-normal">✦</span>
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-neutral-900" />
              <span>Contractor On-Site Support: +91 9007168561 / +91 9874569712</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-32 bg-white z-50 border-t border-neutral-200 overflow-y-auto p-4 space-y-4">
          <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-neutral-900">
            <span className="font-bold flex items-center gap-1.5 text-black">
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>60-Minute Site Delivery Active</span>
            </span>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              Delivering to PIN: <strong>{pincode || '700039'}</strong> ({areaName || city})
            </p>
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-neutral-100 py-2">
                <Link
                  to={item.path}
                  className="block font-bold text-sm text-neutral-900 hover:text-[#15803d]"
                >
                  {item.label}
                </Link>
                {item.subcategories && (
                  <div className="pl-3 mt-1.5 space-y-1">
                    {item.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block text-xs text-neutral-600 hover:text-black py-0.5"
                      >
                        • {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-200 space-y-2 text-xs">
            <Link to="/login" className="block py-2 text-center font-bold bg-neutral-900 text-white rounded-xl">
              Contractor Login / Register
            </Link>
            <Link to="/quote" className="block py-2 text-center font-bold bg-[#f2b808] text-black rounded-xl">
              Get Project BOM Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
