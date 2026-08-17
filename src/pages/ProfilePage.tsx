import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import { isSupabaseConfigured } from '../lib/supabase';
import {
  fetchSupabaseProfile,
  updateSupabaseProfile,
  saveAddressToSupabaseProfile,
  deleteAddressFromSupabaseProfile,
  setDefaultAddressInSupabaseProfile,
  fetchSupabaseUserOrders,
} from '../services/supabaseProfileService';
import { UserProfileData, SavedAddress, Order } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  User,
  Phone,
  Building2,
  MapPin,
  Package,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Truck,
  LogOut,
  Save,
  RefreshCw,
  Check,
  X,
  Building,
  HardHat,
  Database,
  ArrowRight,
  ShoppingBag,
  Download,
  Calendar,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout, isAdmin, updateUserProfile } = useAuth();
  const { orders: shopOrders, quotes: shopQuotes, showToast, formatPrice, addToCart } = useShop();

  // Active Tab: 'profile' | 'addresses' | 'orders' | 'quotes'
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'quotes'>('profile');

  // Profile Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstin, setGstin] = useState('');
  const [businessType, setBusinessType] = useState('Electrical Contractor / MEP Firm');
  const [billingAddress, setBillingAddress] = useState('');

  // Saved Addresses State
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Address Form Modal State
  const [addrLabel, setAddrLabel] = useState('Project Site #1');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrLandmark, setAddrLandmark] = useState('');
  const [addrCity, setAddrCity] = useState('Kolkata');
  const [addrState, setAddrState] = useState('West Bengal');
  const [addrPincode, setAddrPincode] = useState('700039');
  const [addrContactPerson, setAddrContactPerson] = useState('');
  const [addrContactPhone, setAddrContactPhone] = useState('');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  // Orders State
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [orderFilter, setOrderFilter] = useState<'all' | 'Processing' | 'Dispatched' | 'Delivered'>('all');

  // Loading & Action States
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load and populate user profile data from Supabase / AuthContext
  useEffect(() => {
    let isMounted = true;

    const loadProfileData = async () => {
      if (!currentUser) {
        setIsLoadingData(false);
        return;
      }

      setIsLoadingData(true);
      const userId = currentUser.uid;
      const userPhone = currentUser.phoneNumber || userProfile?.phoneNumber || '';
      const userEmail = currentUser.email || userProfile?.email || '';

      // Initialize form from current AuthContext state first
      setFullName(userProfile?.name || currentUser.displayName || 'Contractor Partner');
      setPhone(userPhone);
      setEmail(userEmail);
      setCompanyName(userProfile?.name?.includes('MEP') ? userProfile.name : 'Giriraj MEP Contractor Services');
      setGstin('19AAACG1234F1Z5');

      // Fetch fresh data from Supabase 'profiles' table
      const profileData = await fetchSupabaseProfile(userId, userPhone, userEmail);

      if (isMounted && profileData) {
        if (profileData.fullName) setFullName(profileData.fullName);
        if (profileData.phone) setPhone(profileData.phone);
        if (profileData.email) setEmail(profileData.email);
        if (profileData.companyName) setCompanyName(profileData.companyName);
        if (profileData.gstin) setGstin(profileData.gstin);
        if (profileData.businessType) setBusinessType(profileData.businessType);
        if (profileData.billingAddress) setBillingAddress(profileData.billingAddress);

        if (profileData.savedAddresses && profileData.savedAddresses.length > 0) {
          setSavedAddresses(profileData.savedAddresses);
        } else {
          // Provide default initial site address if empty
          const initialAddress: SavedAddress = {
            id: 'site-addr-1',
            label: 'Central Warehouse & Site',
            street: 'Topsia Industrial Area, Near EM Bypass',
            landmark: 'Opposite Science City Hub',
            city: 'Kolkata',
            state: 'West Bengal',
            pincode: '700039',
            contactPerson: profileData.fullName || 'Site Incharge',
            contactPhone: userPhone || '+91 9007168561',
            isDefault: true,
          };
          setSavedAddresses([initialAddress]);
        }
      } else if (isMounted) {
        // Fallback default address
        const fallbackAddress: SavedAddress = {
          id: 'site-addr-1',
          label: 'Primary Project Site',
          street: 'Topsia Industrial Area, Near EM Bypass',
          landmark: 'Kolkata Construction Corridor',
          city: 'Kolkata',
          state: 'West Bengal',
          pincode: '700039',
          contactPerson: currentUser.displayName || 'Site Supervisor',
          contactPhone: userPhone || '+91 9007168561',
          isDefault: true,
        };
        setSavedAddresses([fallbackAddress]);
      }

      // Fetch user's orders from Supabase / local shop context
      const orders = await fetchSupabaseUserOrders(userId, userPhone, userEmail, shopOrders);
      if (isMounted) {
        setUserOrders(orders);
        setIsLoadingData(false);
      }
    };

    loadProfileData();

    return () => {
      isMounted = false;
    };
  }, [currentUser, userProfile, shopOrders]);

  // Handle Profile Update Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSavingProfile(true);
    setSaveSuccessMsg(null);

    const payload: UserProfileData = {
      uid: currentUser.uid,
      id: currentUser.uid,
      phone: phone.trim(),
      phoneNumber: phone.trim(),
      fullName: fullName.trim(),
      name: fullName.trim(),
      email: email.trim(),
      companyName: companyName.trim(),
      gstin: gstin.trim().toUpperCase(),
      businessType,
      billingAddress: billingAddress.trim(),
      savedAddresses,
      isAdmin: Boolean(isAdmin),
    };

    // 1. Update in Supabase 'profiles' table
    const result = await updateSupabaseProfile(payload);

    // 2. Sync with local AuthContext
    await updateUserProfile({
      name: fullName.trim(),
      phoneNumber: phone.trim(),
      email: email.trim(),
      addresses: savedAddresses.map((a) => `${a.street}, ${a.city} - ${a.pincode}`),
    });

    setIsSavingProfile(false);

    if (result.success) {
      setSaveSuccessMsg('Profile and contractor details saved successfully to Supabase database.');
      showToast('Profile Updated', 'Your contact info and GST credentials have been saved.', 'success');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } else {
      showToast('Update Notice', result.error || 'Saved locally to contractor cache.', 'info');
    }
  };

  // Open modal to add new address
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddrLabel(`Site Project #${savedAddresses.length + 1}`);
    setAddrStreet('');
    setAddrLandmark('');
    setAddrCity('Kolkata');
    setAddrState('West Bengal');
    setAddrPincode('700039');
    setAddrContactPerson(fullName || 'Site Manager');
    setAddrContactPhone(phone || '+91 9007168561');
    setAddrIsDefault(savedAddresses.length === 0);
    setIsAddressModalOpen(true);
  };

  // Open modal to edit existing address
  const handleOpenEditAddress = (addr: SavedAddress) => {
    setEditingAddressId(addr.id);
    setAddrLabel(addr.label);
    setAddrStreet(addr.street);
    setAddrLandmark(addr.landmark || '');
    setAddrCity(addr.city);
    setAddrState(addr.state);
    setAddrPincode(addr.pincode);
    setAddrContactPerson(addr.contactPerson || '');
    setAddrContactPhone(addr.contactPhone || '');
    setAddrIsDefault(Boolean(addr.isDefault));
    setIsAddressModalOpen(true);
  };

  // Save Address (Add or Edit)
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!addrStreet.trim() || !addrPincode.trim()) {
      showToast('Missing Fields', 'Please provide a valid street address and 6-digit pincode.', 'warning');
      return;
    }

    const newAddr: SavedAddress = {
      id: editingAddressId || `site-addr-${Date.now()}`,
      label: addrLabel.trim() || 'Project Site',
      street: addrStreet.trim(),
      landmark: addrLandmark.trim(),
      city: addrCity.trim() || 'Kolkata',
      state: addrState.trim() || 'West Bengal',
      pincode: addrPincode.trim(),
      contactPerson: addrContactPerson.trim() || fullName,
      contactPhone: addrContactPhone.trim() || phone,
      isDefault: addrIsDefault,
    };

    const { addresses } = await saveAddressToSupabaseProfile(currentUser.uid, newAddr, savedAddresses);
    setSavedAddresses(addresses);
    setIsAddressModalOpen(false);

    showToast(
      editingAddressId ? 'Site Address Updated' : 'New Project Site Added',
      `${newAddr.label} has been saved to your Supabase contractor profile.`,
      'success'
    );
  };

  // Delete Address
  const handleDeleteAddress = async (addrId: string, label: string) => {
    if (!currentUser) return;
    if (savedAddresses.length <= 1) {
      showToast('Cannot Remove', 'You must maintain at least one default delivery site address.', 'warning');
      return;
    }

    const { addresses } = await deleteAddressFromSupabaseProfile(currentUser.uid, addrId, savedAddresses);
    setSavedAddresses(addresses);
    showToast('Address Removed', `${label} was removed from your saved locations.`, 'info');
  };

  // Set Default Address
  const handleSetDefaultAddress = async (addrId: string) => {
    if (!currentUser) return;
    const { addresses } = await setDefaultAddressInSupabaseProfile(currentUser.uid, addrId, savedAddresses);
    setSavedAddresses(addresses);
    showToast('Default Site Updated', 'This site is now selected as your primary 60-min delivery address.', 'success');
  };

  // Re-order materials from an existing order
  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(
        {
          id: item.productId || `prod-${item.sku}`,
          name: item.productName,
          slug: item.sku.toLowerCase().replace(/\s+/g, '-'),
          brand: 'Giriraj Power',
          brandId: 'brand-gp',
          category: 'Cables & Switchgear',
          categoryId: 'cat-cables',
          sku: item.sku,
          price: item.unitPrice,
          unit: 'per piece',
          minOrderQty: 1,
          stock: 50,
          inStock: true,
          rating: 4.9,
          reviewsCount: 12,
          image: item.image || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80',
          galleryImages: [],
          shortDescription: item.productName,
          description: item.productName,
          features: ['IS/IEC Certified', 'Heavy-Duty Grade'],
          specifications: { Grade: 'Industrial' },
          applications: ['MEP Sites'],
          certifications: ['BIS', 'CPRI'],
          warranty: '1 Year Manufacturer Warranty',
        },
        item.quantity
      );
    });
    showToast('Items Added to Cart', `${order.items.length} items from ${order.orderNumber} added to cart.`, 'success');
    navigate('/cart');
  };

  // Filtered Orders
  const filteredOrders = userOrders.filter((order) => {
    if (orderFilter === 'all') return true;
    return order.orderStatus === orderFilter;
  });

  // If user is not logged in, show login prompt
  if (!currentUser && !isLoadingData) {
    return (
      <div className="min-h-[75vh] bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl border border-neutral-200 p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-yellow-800">
            <HardHat className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-neutral-900 tracking-tight">Contractor Account Required</h2>
          <p className="text-sm text-neutral-600 mt-2">
            Sign in with your mobile number or contractor email to view your saved project sites, GST profile, and site dispatch history.
          </p>
          <div className="mt-6 space-y-3">
            <Link
              to="/login"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Sign In with Mobile OTP</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs py-3 px-4 rounded-xl transition-all block"
            >
              Continue Browsing Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Contractor Portal', path: '/login' },
              { label: 'My Profile & Sites' },
            ]}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* CONTRACTOR IDENTITY HERO CARD */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Left: Avatar & Contractor Info */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-neutral-900 text-yellow-400 flex items-center justify-center font-black text-2xl shadow-md border-2 border-yellow-400">
                  {fullName ? fullName.charAt(0).toUpperCase() : 'G'}
                </div>
                <div
                  className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-xs"
                  title="Phone OTP Verified"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                    {fullName || 'Contractor Partner'}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-yellow-100 text-yellow-900 px-2.5 py-0.5 rounded-full border border-yellow-300">
                    <ShieldCheck className="w-3 h-3 text-yellow-800" />
                    Tier-1 Contractor
                  </span>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full border border-rose-300">
                      Master Admin
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-neutral-600 mt-1.5 font-medium">
                  {phone && (
                    <span className="flex items-center gap-1 text-neutral-800 font-mono font-bold">
                      <Phone className="w-3.5 h-3.5 text-[#15803d]" />
                      {phone}
                    </span>
                  )}
                  {email && (
                    <span className="flex items-center gap-1 text-neutral-600">
                      <FileText className="w-3.5 h-3.5 text-neutral-400" />
                      {email}
                    </span>
                  )}
                  {companyName && (
                    <span className="flex items-center gap-1 text-neutral-700 font-semibold">
                      <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                      {companyName}
                    </span>
                  )}
                </div>

                {/* In-Memory Session & Gateway Status Pill */}
                <div className="flex items-center gap-2 mt-2.5">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md border bg-emerald-50 text-emerald-800 border-emerald-200"
                  >
                    <Database className="w-3 h-3 text-emerald-600" />
                    <span>In-Memory Session & Fast2SMS Gateway: Active</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-neutral-900 hover:bg-black text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Building className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Admin Dispatch Hub</span>
                </Link>
              )}
              <button
                onClick={async () => {
                  await logout();
                  showToast('Logged Out', 'You have been signed out safely.', 'info');
                  navigate('/login');
                }}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-neutral-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* 4 KPI METRIC TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-neutral-100">
            <div
              onClick={() => setActiveTab('orders')}
              className="bg-neutral-50 hover:bg-neutral-100/80 p-3.5 rounded-xl border border-neutral-200/80 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
                <Package className="w-4 h-4 text-[#15803d]" />
              </div>
              <p className="text-xl font-black text-neutral-900 font-mono">{userOrders.length}</p>
              <span className="text-[10px] text-neutral-500">Live Session Synced</span>
            </div>

            <div
              onClick={() => setActiveTab('addresses')}
              className="bg-neutral-50 hover:bg-neutral-100/80 p-3.5 rounded-xl border border-neutral-200/80 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">Saved Sites</span>
                <MapPin className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-xl font-black text-neutral-900 font-mono">{savedAddresses.length}</p>
              <span className="text-[10px] text-neutral-500">60-Min Express Hubs</span>
            </div>

            <div
              onClick={() => setActiveTab('quotes')}
              className="bg-neutral-50 hover:bg-neutral-100/80 p-3.5 rounded-xl border border-neutral-200/80 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">BOQ Quotes</span>
                <FileText className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-xl font-black text-neutral-900 font-mono">{shopQuotes.length}</p>
              <span className="text-[10px] text-neutral-500">Tender estimates</span>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/80">
              <div className="flex items-center justify-between text-neutral-500 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">GST Status</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs font-black text-emerald-700 truncate">{gstin || '19AAACG1234F1Z5'}</p>
              <span className="text-[10px] text-emerald-600 font-bold">18% ITC Eligible</span>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION BUTTONS */}
        <div className="flex items-center gap-2 border-b border-neutral-200 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-yellow-400 text-neutral-950 bg-white rounded-t-xl'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Business Details</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'addresses'
                ? 'border-yellow-400 text-neutral-950 bg-white rounded-t-xl'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>Saved Project Sites ({savedAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'orders'
                ? 'border-yellow-400 text-neutral-950 bg-white rounded-t-xl'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Package className="w-4 h-4 text-[#15803d]" />
            <span>Order History & Dispatches ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'quotes'
                ? 'border-yellow-400 text-neutral-950 bg-white rounded-t-xl'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>Tender BOQ Quotes ({shopQuotes.length})</span>
          </button>
        </div>

        {/* TAB 1: PROFILE & BUSINESS DETAILS */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-lg font-black text-neutral-900">Contractor Information</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update your contact phone, firm name, and GSTIN registered to your contractor profile.
                </p>
              </div>
              <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">
                UID: {currentUser?.uid.slice(0, 12)}...
              </span>
            </div>

            {saveSuccessMsg && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Contact Person / Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="e.g. Gaurav Giri"
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Mobile Phone Number (OTP Primary) *
                  </label>
                  <div className="flex rounded-xl border border-neutral-300 overflow-hidden focus-within:border-[#15803d]">
                    <span className="bg-neutral-100 px-3 py-2.5 text-xs font-bold text-neutral-600 border-r border-neutral-300 flex items-center">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="9007168561"
                      className="flex-1 px-3 py-2.5 text-sm font-mono font-bold text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Company / Contractor Firm Name */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Firm / Business Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. Mahavir MEP & Electrical Contractors"
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Invoice Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. contractor@girirajpower.com"
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                {/* GSTIN */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    GSTIN Number (for 18% Input Tax Credit)
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    maxLength={15}
                    placeholder="19AAACG1234F1Z5"
                    className="w-full px-3.5 py-2.5 text-sm font-mono font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none uppercase"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Primary Business Category
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none bg-white"
                  >
                    <option value="Electrical Contractor / MEP Firm">Electrical Contractor / MEP Firm</option>
                    <option value="Builder / Real Estate Developer">Builder / Real Estate Developer</option>
                    <option value="Industrial Plant / Infrastructure EPC">Industrial Plant / Infrastructure EPC</option>
                    <option value="Panel Builder & Switchgear Assembler">Panel Builder & Switchgear Assembler</option>
                    <option value="Hardware & Electrical Retailer">Hardware & Electrical Retailer</option>
                  </select>
                </div>
              </div>

              {/* Billing Address */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Official Registered Billing Address
                </label>
                <textarea
                  rows={2}
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="e.g. Topsia Industrial Area, Near EM Bypass, Kolkata, West Bengal - 700039"
                  className="w-full px-3.5 py-2.5 text-sm font-medium rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingProfile ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Contractor Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: SAVED PROJECT SITES / ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200">
              <div>
                <h2 className="text-lg font-black text-neutral-900">Saved Construction Sites & Warehouses</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Manage active site delivery locations for 60-minute express material dispatches across Kolkata & WB.
                </p>
              </div>
              <button
                onClick={handleOpenAddAddress}
                className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Project Site</span>
              </button>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white rounded-2xl border p-5 transition-all relative ${
                    addr.isDefault
                      ? 'border-[#15803d] shadow-sm ring-1 ring-[#15803d]/30'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                        <MapPin className="w-4 h-4 text-rose-600" />
                      </div>
                      <span className="font-bold text-sm text-neutral-900">{addr.label}</span>
                    </div>

                    {addr.isDefault ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-300">
                        <Check className="w-3 h-3 stroke-[3]" />
                        Default Site
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[11px] font-bold text-neutral-500 hover:text-[#15803d] cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  {/* Street & Location */}
                  <div className="text-xs text-neutral-700 space-y-1 mb-4">
                    <p className="font-medium">{addr.street}</p>
                    {addr.landmark && <p className="text-neutral-500">Landmark: {addr.landmark}</p>}
                    <p className="font-semibold text-neutral-900">
                      {addr.city}, {addr.state} - <span className="font-mono">{addr.pincode}</span>
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100 text-xs text-neutral-600 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Site Contact</span>
                      <span className="font-semibold text-neutral-900">{addr.contactPerson || 'Site Incharge'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 uppercase font-bold block">Phone</span>
                      <span className="font-mono font-bold text-neutral-900">{addr.contactPhone || phone}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
                    <button
                      onClick={() => handleOpenEditAddress(addr)}
                      className="text-xs font-bold text-neutral-700 hover:text-black flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(addr.id, addr.label)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDER HISTORY & LIVE DISPATCHES */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200">
              <div>
                <h2 className="text-lg font-black text-neutral-900">Order History & Live Dispatches</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Track material deliveries, GST tax invoices, and live warehouse dispatches.
                </p>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['all', 'Processing', 'Dispatched', 'Delivered'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer whitespace-nowrap ${
                      orderFilter === filter
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {filter === 'all' ? 'All Orders' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-xs hover:border-neutral-300 transition-all"
                  >
                    {/* Header: Order Number, Date, Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-base text-neutral-950">{order.orderNumber}</span>
                          <span
                            className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : order.orderStatus === 'Dispatched' || order.orderStatus === 'Out for Site Delivery'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : 'bg-yellow-50 text-yellow-800 border-yellow-200'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-neutral-500 block">Total B2B Amount</span>
                        <span className="text-lg font-black text-neutral-950 font-mono">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar for Delivery */}
                    <div className="my-4 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-700 mb-2">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#15803d]" />
                          <span>60-Min Express Site Dispatch</span>
                        </span>
                        <span className="text-[11px] text-neutral-500 font-mono">
                          Pincode: {order.shippingAddress.pincode}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            order.orderStatus === 'Delivered'
                              ? 'w-full bg-emerald-600'
                              : order.orderStatus === 'Dispatched'
                              ? 'w-3/4 bg-sky-500'
                              : 'w-1/3 bg-yellow-400'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-neutral-100 my-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt=""
                              className="w-11 h-11 object-cover rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
                            />
                            <div>
                              <p className="text-xs font-bold text-neutral-900 line-clamp-1">{item.productName}</p>
                              <p className="text-[11px] text-neutral-500 font-mono">
                                SKU: {item.sku} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-neutral-900 font-mono shrink-0">
                            {formatPrice(item.totalPrice)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                      <div className="text-xs text-neutral-500">
                        <span>Delivery to: </span>
                        <strong className="text-neutral-800">
                          {order.shippingAddress.street}, {order.shippingAddress.city}
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            showToast(
                              'Downloading GST Invoice',
                              `Invoice for order ${order.orderNumber} generated with 18% Input Tax Credit breakdown.`,
                              'info'
                            );
                          }}
                          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-neutral-500" />
                          <span>GST Tax Invoice</span>
                        </button>
                        <button
                          onClick={() => handleReorder(order)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Re-Order Materials</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <Package className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-neutral-800">No Orders Found</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  You have not placed any orders matching the current filter.
                </p>
                <Link
                  to="/products"
                  className="mt-4 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Explore Electrical Materials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BOQ QUOTATION REQUESTS */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-neutral-200">
              <div>
                <h2 className="text-lg font-black text-neutral-900">Tender & BOQ Estimations</h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Track project quotations, bulk electrical pricing estimates, and tender approvals.
                </p>
              </div>
              <Link
                to="/quote"
                className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Submit New BOQ</span>
              </Link>
            </div>

            {shopQuotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shopQuotes.map((quote) => (
                  <div key={quote.id} className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-black text-xs text-neutral-900">Ref: {quote.id.slice(0, 10)}</span>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded-md">
                        {quote.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 mb-1">{quote.projectType} Project Supply</h3>
                    <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                      {quote.productInterest} • Qty: {quote.quantity}
                    </p>

                    <div className="bg-neutral-50 rounded-xl p-2.5 border border-neutral-100 text-xs text-neutral-600 space-y-1 mb-4">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Site Location:</span>
                        <span className="font-semibold text-neutral-900">{quote.deliveryLocation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Target Date:</span>
                        <span className="font-semibold text-neutral-900">{quote.targetDeliveryDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-[#15803d] font-bold">Sales Engineer Assigned ✓</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-neutral-800">No Quotation Requests</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                  Submit your Bill of Quantities (BOQ) or large project requirement for special wholesale pricing.
                </p>
                <Link
                  to="/quote"
                  className="mt-4 inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs"
                >
                  <span>Request Custom Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ADD / EDIT SITE ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl border border-neutral-200 max-w-lg w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-neutral-900">
                    {editingAddressId ? 'Edit Project Site Location' : 'Add New Project Site'}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Saved to your contractor project delivery locations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Site Name / Label *
                </label>
                <input
                  type="text"
                  value={addrLabel}
                  onChange={(e) => setAddrLabel(e.target.value)}
                  placeholder="e.g. EM Bypass Site Phase 2, Warehouse 3"
                  required
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Street Address & Site Gate *
                </label>
                <textarea
                  rows={2}
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  placeholder="Plot No. 42, Sector V, Near Metro Pillar 110"
                  required
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={addrLandmark}
                    onChange={(e) => setAddrLandmark(e.target.value)}
                    placeholder="Opposite Science City"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    6-Digit Pincode *
                  </label>
                  <input
                    type="text"
                    value={addrPincode}
                    onChange={(e) => setAddrPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    placeholder="700039"
                    required
                    className="w-full px-3.5 py-2 text-sm font-mono font-bold rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">City</label>
                  <input
                    type="text"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">State</label>
                  <input
                    type="text"
                    value={addrState}
                    onChange={(e) => setAddrState(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Site Contact Person
                  </label>
                  <input
                    type="text"
                    value={addrContactPerson}
                    onChange={(e) => setAddrContactPerson(e.target.value)}
                    placeholder="Site Supervisor"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Site Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={addrContactPhone}
                    onChange={(e) => setAddrContactPhone(e.target.value)}
                    placeholder="+91 9007168561"
                    className="w-full px-3.5 py-2 text-sm font-mono rounded-xl border border-neutral-300 focus:border-[#15803d] focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-neutral-800 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={addrIsDefault}
                  onChange={(e) => setAddrIsDefault(e.target.checked)}
                  className="w-4 h-4 rounded text-[#15803d] focus:ring-[#15803d] border-neutral-300"
                />
                <span>Set as default delivery site for quick 1-click checkout</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {editingAddressId ? 'Update Site Address' : 'Save Site Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
