import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { SafeImage } from '../components/common/SafeImage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Zap,
  RotateCcw,
  CheckCircle2,
  FileText,
  MapPin,
  Clock,
  Banknote,
  PackageCheck,
  Sparkles,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    deliveryFee,
    isFreeDeliveryEligible,
    amountNeededForFreeDelivery,
    freeDeliveryThreshold,
    pincode,
    areaName,
    openPincodeModal,
    formatPrice,
    openQuoteModal,
    showToast,
  } = useShop();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'POWER10' || clean === 'CONTRACTOR10') {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      showToast('Coupon Applied!', '10% Contractor savings applied to your order subtotal.', 'success');
      setCouponCode('');
    } else if (clean === 'FIRST5') {
      setAppliedCoupon({ code: clean, discountPercent: 5 });
      showToast('Coupon Applied!', '5% New Contractor discount applied.', 'success');
      setCouponCode('');
    } else {
      showToast('Invalid Coupon', 'Please enter a valid contractor voucher code (e.g. POWER10)', 'error');
    }
  };

  const couponDiscountAmount = appliedCoupon
    ? (cartTotal * appliedCoupon.discountPercent) / 100
    : 0;

  const grandTotal = Math.max(0, cartTotal - couponDiscountAmount + deliveryFee);

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen pb-20 text-neutral-900">
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Breadcrumbs items={[{ label: 'Project Cart' }]} />
          </div>
        </div>

        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-100 text-black flex items-center justify-center mx-auto mb-5 shadow-xs border border-yellow-300">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-black tracking-tight">Your Project Cart is Empty</h2>
          <p className="text-sm text-neutral-600 mt-2 max-w-sm mx-auto leading-relaxed">
            You have not added any electrical or construction materials to your order yet. 
            Remember, we have <strong>no minimum order value</strong> and deliver in <strong>60 minutes</strong> across Kolkata!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm py-3 px-6 rounded-xl transition-colors shadow-md border border-yellow-500/30"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Explore 60-Min Catalog</span>
            </Link>
            <button
              onClick={() => openQuoteModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-100 text-black font-bold text-sm py-3 px-6 rounded-xl border border-neutral-300 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Request Custom BOQ Quote</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: 'Project Cart' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-1 gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight flex items-center gap-2">
                <span>Project Procurement Cart</span>
                <span className="text-sm font-bold bg-neutral-100 text-neutral-800 px-2.5 py-0.5 rounded-full border border-neutral-200">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)} Units
                </span>
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                ⚡ 60-Minute Site Delivery • Pay after you receive & verify
              </p>
            </div>

            {/* Delivery Location Widget */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openPincodeModal}
                className="inline-flex items-center gap-2 bg-yellow-50 hover:bg-yellow-100 border border-yellow-300 text-black text-xs font-bold px-3 py-1.5 rounded-xl transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Delivering to: {areaName || `Kolkata ${pincode}`}</span>
                <span className="text-[10px] text-emerald-800 bg-white px-1.5 py-0.5 rounded border border-neutral-200">Change</span>
              </button>

              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Free Delivery Threshold Alert */}
        <div className={`mb-6 p-4 rounded-2xl border transition-all ${
          isFreeDeliveryEligible 
            ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
            : 'bg-yellow-50 border-yellow-300 text-neutral-900'
        }`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                isFreeDeliveryEligible ? 'bg-emerald-600 text-white' : 'bg-yellow-400 text-black'
              }`}>
                {isFreeDeliveryEligible ? <CheckCircle2 className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
              </div>
              <div>
                {isFreeDeliveryEligible ? (
                  <>
                    <p className="text-sm font-black text-emerald-900">
                      🎉 Free Express Delivery Unlocked!
                    </p>
                    <p className="text-xs text-emerald-700">
                      Your order exceeds ₹{freeDeliveryThreshold}. 60-Minute express delivery fee is ₹0.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-black text-black">
                      Add {formatPrice(amountNeededForFreeDelivery)} more for Free Express Delivery!
                    </p>
                    <p className="text-xs text-neutral-600">
                      Orders above ₹{freeDeliveryThreshold} enjoy 100% Free 60-minute site delivery in Kolkata.
                    </p>
                  </>
                )}
              </div>
            </div>

            {!isFreeDeliveryEligible && (
              <Link
                to="/products"
                className="hidden sm:inline-flex items-center gap-1 bg-black hover:bg-neutral-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shrink-0"
              >
                <span>Add Items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-neutral-200/80 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeDeliveryEligible ? 'bg-emerald-600' : 'bg-yellow-500'
              }`}
              style={{
                width: `${Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map(({ product, quantity }) => {
              const lineTotal = product.price * quantity;

              return (
                <div
                  key={product.id}
                  id={`cart-item-${product.id}`}
                  className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shrink-0">
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-black bg-yellow-400 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">SKU: {product.sku}</span>
                      </div>
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-sm font-bold text-black hover:text-emerald-600 transition-colors line-clamp-1 mt-1 block"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                        <span>Unit: {formatPrice(product.price)} / {product.unit}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">⚡ 60-Min Dispatch</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity & Line Subtotal */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-3 sm:pt-0 border-t border-neutral-100 sm:border-t-0">
                    {/* Quantity Buttons */}
                    <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50 h-9">
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity - 1)}
                        className="px-2.5 h-full text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => updateCartQuantity(product.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center text-xs font-bold bg-white h-full border-x border-neutral-300 focus:outline-hidden text-black"
                      />
                      <button
                        onClick={() => updateCartQuantity(product.id, quantity + 1)}
                        className="px-2.5 h-full text-neutral-700 hover:bg-neutral-200 font-bold transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[80px]">
                      <div className="text-base font-bold text-black font-mono">
                        {formatPrice(lineTotal)}
                      </div>
                      <div className="text-[10px] text-neutral-400">excl. GST</div>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Continuous shopping row */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/products"
                className="text-xs font-bold text-black hover:text-emerald-600 flex items-center gap-1"
              >
                ← Continue Adding Materials
              </Link>
              <button
                onClick={() => openQuoteModal()}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span>Need Quote on this exact list?</span>
              </button>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-black pb-3 border-b border-neutral-100 flex items-center justify-between">
                <span>Order Billing Summary</span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ⚡ 60-Min Slot
                </span>
              </h3>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Materials Subtotal:</span>
                  <span className="font-semibold text-black font-mono">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Volume Slab Discount:</span>
                    <span>- {formatPrice(cartDiscount)}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Coupon ({appliedCoupon.code}):</span>
                    <span>- {formatPrice(couponDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>GST (18% Input Tax Credit):</span>
                  <span className="font-semibold text-black font-mono">{formatPrice(cartTax)}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <div className="flex items-center gap-1">
                    <span>60-Min Express Delivery:</span>
                    {isFreeDeliveryEligible && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        &gt;₹1000
                      </span>
                    )}
                  </div>
                  {isFreeDeliveryEligible ? (
                    <span className="font-bold text-emerald-700 uppercase">FREE</span>
                  ) : (
                    <span className="font-mono text-black font-semibold">{formatPrice(deliveryFee)}</span>
                  )}
                </div>

                <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-black">
                  <span>Estimated Total (Incl. GST):</span>
                  <span className="text-xl font-black text-black font-mono">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Pay on Delivery Highlight Banner */}
              <div className="p-3 bg-yellow-50 border border-yellow-300 rounded-xl space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-xs font-black text-black">
                  <Banknote className="w-4 h-4 text-emerald-800" />
                  <span>Pay on Delivery Available</span>
                </div>
                <p className="text-[11px] text-neutral-700 leading-tight">
                  Pay with UPI, Cash, or Card <strong>after you receive & verify</strong> materials at your site in Kolkata ({pincode}).
                </p>
              </div>

              {/* Promo code form */}
              <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-neutral-100">
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Contractor Coupon / Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. POWER10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg uppercase tracking-wider font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-black"
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Checkout Button */}
              <div className="pt-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm py-4 px-4 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 group cursor-pointer border border-yellow-500/30"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Proceed to 60-Min Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-black" />
                </button>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>60-Minute Delivery across Kolkata ({pincode})</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine BIS Manufacturer Materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
