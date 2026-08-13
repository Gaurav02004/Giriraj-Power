import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  User,
  Zap,
  ArrowRight,
  Printer,
  FileCheck,
  Clock,
  Banknote,
  MapPin,
  PhoneCall,
  PackageCheck,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTax,
    cartTotal,
    deliveryFee,
    isFreeDeliveryEligible,
    freeDeliveryThreshold,
    pincode: currentPin,
    areaName,
    city: currentCity,
    formatPrice,
    placeOrder,
  } = useShop();

  const navigate = useNavigate();

  // Form State initialized to Kolkata defaults
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [city, setCity] = useState(currentCity || 'Kolkata');
  const [state, setState] = useState('West Bengal');
  const [pincode, setPincode] = useState(currentPin || '700039');
  const [siteContactPerson, setSiteContactPerson] = useState('');
  const [siteContactPhone, setSiteContactPhone] = useState('');
  const [needsCraneOffloading, setNeedsCraneOffloading] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState<'60_mins' | 'scheduled'>('60_mins');
  const [paymentMethod, setPaymentMethod] = useState<'pod' | 'upi_online' | 'bank_rtgs' | 'net30_credit'>('pod');

  // Checkout Completion State
  const [isPlaced, setIsPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const grandTotal = cartTotal + deliveryFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        customerName,
        companyName: companyName || 'Kolkata Contractor / Builder',
        email,
        phone,
        gstin: gstNumber,
        shippingAddress: {
          street: siteAddress,
          city,
          state,
          pincode,
          landmark: siteContactPerson ? `Supervisor: ${siteContactPerson} (${siteContactPhone})` : '',
        },
        deliveryType: deliverySpeed === '60_mins' ? 'express_site' : 'standard',
        paymentMethod: paymentMethod === 'pod' ? 'cod' : paymentMethod === 'upi_online' ? 'upi_card' : paymentMethod,
        paymentStatus: paymentMethod === 'pod' || paymentMethod === 'net30_credit' ? 'Pending' : 'Paid',
        orderStatus: 'Processing',
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          sku: item.product.sku,
          unitPrice: item.product.price,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
          image: item.product.image,
        })),
        subtotal: cartSubtotal,
        tax: cartTax,
        shippingCost: deliveryFee,
        discount: 0,
        total: grandTotal,
      });

      setIsProcessing(false);
      setPlacedOrderId(order.orderNumber);
      setIsPlaced(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Safe fallback
      }
    }, 800);
  };

  if (isPlaced) {
    return (
      <div className="bg-white min-h-screen pb-20 pt-8 text-neutral-900">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-10 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>60-Minute Express Dispatch Confirmed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-1">
                Thank You, {customerName}!
              </h1>
              <p className="text-sm text-neutral-600 mt-1 max-w-lg mx-auto">
                Your construction & electrical materials order <strong className="text-black font-mono">{placedOrderId}</strong> is now packed at our Kolkata Central Hub (PIN {pincode}).
              </p>
            </div>

            {/* Pay on Delivery Highlight */}
            {paymentMethod === 'pod' && (
              <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-2xl text-left space-y-1">
                <div className="flex items-center gap-2 text-sm font-black text-black">
                  <Banknote className="w-5 h-5 text-emerald-800" />
                  <span>Pay on Delivery: Pay After You Receive & Verify</span>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Our delivery vehicle is en route to your Kolkata site. Please inspect all wire gauges, MCB test marks, and seals upon arrival. You can pay <strong>{formatPrice(grandTotal)}</strong> via UPI (GPay/PhonePe), Cash, or Card to our delivery partner.
                </p>
              </div>
            )}

            {/* Order snapshot */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 text-left text-xs text-neutral-700 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-3 border-b border-neutral-200">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Order Reference</span>
                  <span className="font-bold text-black font-mono">{placedOrderId}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Payment Mode</span>
                  <span className="font-bold text-black uppercase">{paymentMethod === 'pod' ? 'Pay on Delivery' : paymentMethod}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Total (Incl. GST)</span>
                  <span className="font-bold text-black font-mono text-sm">{formatPrice(grandTotal)}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Guaranteed ETA</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-700" /> Within 60 Minutes
                  </span>
                </div>
              </div>

              <div>
                <span className="text-neutral-400 block text-[11px]">Kolkata Site Delivery Destination:</span>
                <p className="font-semibold text-black mt-0.5">
                  {siteAddress}, {city}, {state} - {pincode}
                </p>
                {gstNumber && (
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    GSTIN for Tax Invoice: <strong className="text-black">{gstNumber}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Helpline contact */}
            <div className="p-3 bg-neutral-100 rounded-xl text-xs text-neutral-600 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> Need urgent assistance with your rider?
              </span>
              <a href="tel:+919007168561" className="font-bold text-black hover:text-emerald-700 underline">
                Contractor Helpline: +91 9007168561 / 9874569712
              </a>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-bold py-3 px-5 rounded-xl transition-colors border border-neutral-300 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Dispatch Slip</span>
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black py-3 px-6 rounded-xl transition-colors shadow-sm border border-yellow-500/30"
              >
                <span>Back to Giriraj Power</span>
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-black underline"
              >
                <span>View in Supplier Admin Dashboard →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: 'Project Cart', path: '/cart' }, { label: 'Site Delivery Checkout' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                60-Minute Site Delivery Checkout
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Serving Kolkata & PIN 700039 • Pay after you receive & verify • No minimum order value
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 px-3 py-1 rounded-xl text-xs font-bold text-black">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Slot: 60-Minute Express Site Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Left Side */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Contractor & Billing Info */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-black flex items-center gap-2 pb-3 border-b border-neutral-100">
                <User className="w-5 h-5 text-emerald-600" />
                <span>1. Contractor & Receiving Contact</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Contact Person / Receiver Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amitava Ghosh"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Firm / Contracting Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ghosh Electrical Projects LLP"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone Number for Rider Updates <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9007168561"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Invoice Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="site@ghoshelectrical.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    GSTIN (For 18% Input Tax Credit)
                  </label>
                  <input
                    type="text"
                    placeholder="19ABCDE1234F1Z5"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl uppercase font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Project Site Delivery Address */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>2. Kolkata Project Site Address</span>
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  ⚡ 60 Mins Active
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Project Site Street Address & Floor / Machine Room <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tower 3 Basement / Ground Gate, EM Bypass Near Science City, Topsia"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    PIN Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Site Supervisor / Engineer on Site
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Subhashish (Site Electrical Incharge)"
                    value={siteContactPerson}
                    onChange={(e) => setSiteContactPerson(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Supervisor Mobile
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9874569712"
                    value={siteContactPhone}
                    onChange={(e) => setSiteContactPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white text-black"
                  />
                </div>
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-2 border-t border-neutral-100">
                <label className="block text-xs font-bold text-neutral-900 mb-2">
                  Select Delivery Speed:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    deliverySpeed === '60_mins' ? 'border-yellow-400 bg-yellow-50' : 'border-neutral-200'
                  }`}>
                    <input
                      type="radio"
                      name="speed"
                      checked={deliverySpeed === '60_mins'}
                      onChange={() => setDeliverySpeed('60_mins')}
                      className="mt-1 text-black"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 font-black text-xs text-black">
                        <Zap className="w-3.5 h-3.5 fill-black" />
                        <span>60-Minute Express Delivery</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 mt-0.5">
                        Dispatched immediately from Kolkata Central Hub (700039).
                      </p>
                    </div>
                  </label>

                  <label className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    deliverySpeed === 'scheduled' ? 'border-yellow-400 bg-yellow-50' : 'border-neutral-200'
                  }`}>
                    <input
                      type="radio"
                      name="speed"
                      checked={deliverySpeed === 'scheduled'}
                      onChange={() => setDeliverySpeed('scheduled')}
                      className="mt-1 text-black"
                    />
                    <div>
                      <div className="font-bold text-xs text-black">Scheduled Tomorrow Slot</div>
                      <p className="text-[11px] text-neutral-600 mt-0.5">
                        Arrives tomorrow between 9:00 AM - 12:00 PM.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method (Emphasizing Pay on Delivery) */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-black flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-emerald-600" />
                  <span>3. Payment Method</span>
                </h3>
                <span className="text-[11px] font-bold text-neutral-700 bg-yellow-100 px-2 py-0.5 rounded border border-yellow-300">
                  Pay After Verification
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Pay on Delivery (Featured) */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'pod'
                      ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pod'}
                        onChange={() => setPaymentMethod('pod')}
                        className="text-emerald-700"
                      />
                      <span className="font-black text-xs text-black">Pay on Delivery (POD)</span>
                    </div>
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      POPULAR
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-600 leading-relaxed">
                    <strong>Pay after you receive & verify materials</strong> at your site. Cash, Google Pay, PhonePe UPI, or Card.
                  </div>
                </label>

                {/* 2. Instant UPI Online */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'upi_online'
                      ? 'border-black bg-yellow-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi_online'}
                        onChange={() => setPaymentMethod('upi_online')}
                        className="text-black"
                      />
                      <span className="font-black text-xs text-black">Instant UPI / QR / NetBanking</span>
                    </div>
                    <Zap className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-600 leading-relaxed">
                    Instant payment via GPay, PhonePe, Paytm, Debit/Credit Card or NetBanking with instant tax receipt.
                  </div>
                </label>

                {/* 3. Corporate RTGS / NEFT */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'bank_rtgs'
                      ? 'border-black bg-yellow-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank_rtgs'}
                        onChange={() => setPaymentMethod('bank_rtgs')}
                        className="text-black"
                      />
                      <span className="font-bold text-xs text-black">RTGS / NEFT Direct</span>
                    </div>
                    <Building className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-500 leading-relaxed">
                    Corporate Bank Transfer directly to Giriraj Power company account with Proforma Invoice.
                  </div>
                </label>

                {/* 4. 30-Day Contractor Credit */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'net30_credit'
                      ? 'border-black bg-yellow-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'net30_credit'}
                        onChange={() => setPaymentMethod('net30_credit')}
                        className="text-black"
                      />
                      <span className="font-bold text-xs text-black">30-Day Contractor Credit</span>
                    </div>
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-2 text-[11px] text-neutral-500 leading-relaxed">
                    Pre-approved credit line for Kolkata MEP contractors linked to monthly R.A. bills.
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side: Order Review & Place Order Button */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-black">
                  Order Review ({cart.length} Items)
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ⚡ 60 Mins
                </span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-bold text-black truncate">{product.name}</p>
                      <p className="text-[10px] text-neutral-500">
                        {quantity} {product.unit} × {formatPrice(product.price)}
                      </p>
                    </div>
                    <span className="font-bold text-black font-mono">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price summary */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Materials Subtotal:</span>
                  <span className="font-semibold text-black font-mono">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% ITC):</span>
                  <span className="font-semibold text-black font-mono">{formatPrice(cartTax)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>60-Min Site Delivery:</span>
                  {isFreeDeliveryEligible ? (
                    <span className="font-bold text-emerald-700 uppercase">FREE (&gt;₹1000)</span>
                  ) : (
                    <span className="font-mono text-black font-semibold">{formatPrice(deliveryFee)}</span>
                  )}
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-black">
                  <span>Total Payable:</span>
                  <span className="text-xl font-black text-black font-mono">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Pay on Delivery Notice */}
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-[11px] text-neutral-700 space-y-1">
                <div className="font-black text-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Giriraj Power 60-Minute Guarantee</span>
                </div>
                <p>
                  Delivering to <strong>Kolkata PIN {pincode}</strong> in 60 minutes. Pay after you inspect materials on site.
                </p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm py-4 px-4 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer border border-yellow-500/30"
              >
                {isProcessing ? (
                  <span>Dispatching to Site...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Place Order (60-Min Delivery)</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Genuine BIS Manufacturer Dispatch</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
