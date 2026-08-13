import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { SafeImage } from './SafeImage';
import {
  Heart,
  ShoppingCart,
  FileText,
  Star,
  Eye,
  Zap,
  ShieldCheck,
  Plus,
  Minus,
  Truck,
  CheckCircle,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  layout = 'grid',
}) => {
  const {
    addToCart,
    updateCartQuantity,
    getItemQuantityInCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openQuoteModal,
    pincode,
  } = useShop();

  const isWishlisted = isInWishlist(product.id);
  const cartQty = getItemQuantityInCart(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (layout === 'list') {
    return (
      <div
        id={`product-card-${product.id}`}
        className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-yellow-400 shadow-xs hover:shadow-lg transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between text-neutral-900"
      >
        {/* Left: Image */}
        <div className="relative w-full sm:w-48 h-44 sm:h-36 rounded-xl overflow-hidden bg-neutral-50 shrink-0 border border-neutral-100 flex items-center justify-center">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            <span className="bg-yellow-400 text-black font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-black" />
              60 MINS
            </span>
            {discountPercent > 0 && (
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/90 text-neutral-400 hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Center: Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              {product.brand}
            </span>
            <span className="text-xs text-neutral-300">•</span>
            <span className="text-[11px] text-neutral-500 font-mono">SKU: {product.sku}</span>
            <span className="text-xs text-neutral-300">•</span>
            <div className="flex items-center text-yellow-500 text-xs font-semibold gap-0.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span className="text-neutral-800 font-bold">{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="text-base font-bold text-neutral-900 hover:text-emerald-700 transition-colors line-clamp-1 group-hover:underline decoration-emerald-500/40"
          >
            {product.name}
          </Link>

          <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex items-center gap-2.5 mt-2 text-[11px] text-neutral-600 flex-wrap">
            <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <Zap className="w-3 h-3 text-emerald-700 fill-emerald-700" /> 60-Min Delivery to {pincode}
            </span>
            <span className="text-neutral-600 font-medium flex items-center gap-1 bg-neutral-100 px-2 py-0.5 rounded">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Pay on Delivery
            </span>
          </div>
        </div>

        {/* Right: Pricing & CTAs */}
        <div className="w-full sm:w-56 shrink-0 sm:border-l sm:border-neutral-200 sm:pl-5 flex flex-col justify-between h-full pt-3 sm:pt-0 border-t border-neutral-100 sm:border-t-0">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-black tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">{product.unit} (excl. GST)</p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            {cartQty === 0 ? (
              <button
                id={`btn-cart-${product.id}`}
                onClick={() => addToCart(product, 1)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-black hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-between bg-emerald-700 text-white rounded-xl font-bold text-xs p-1 shadow-xs">
                <button
                  onClick={() => updateCartQuantity(product.id, cartQty - 1)}
                  className="p-1 hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-xs px-2">{cartQty} in cart</span>
                <button
                  onClick={() => updateCartQuantity(product.id, cartQty + 1)}
                  className="p-1 hover:bg-emerald-800 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <button
              id={`btn-quote-${product.id}`}
              onClick={() => openQuoteModal(product)}
              className="inline-flex items-center justify-center p-2 rounded-xl border border-neutral-200 bg-yellow-50 text-neutral-800 hover:bg-yellow-100 transition-colors"
              title="Request Project Quote"
              aria-label="Request Quote"
            >
              <FileText className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout default
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-yellow-400 shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden text-neutral-900"
    >
      {/* Top Media */}
      <div className="relative w-full aspect-4/3 bg-neutral-50 overflow-hidden border-b border-neutral-100">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <SafeImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="bg-yellow-400 text-black font-black text-[10px] px-2 py-0.5 rounded-md shadow-xs border border-yellow-500/30 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-black" />
            60 MINS
          </span>
          {discountPercent > 0 && (
            <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-black text-white font-bold text-[10px] px-2 py-0.5 rounded-md shadow-xs">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist & QuickView action buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            id={`btn-wishlist-${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-white/90 text-neutral-500 hover:text-rose-500 hover:bg-white shadow-xs'
            }`}
            aria-label="Wishlist toggle"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
          {onQuickView && (
            <button
              id={`btn-quickview-${product.id}`}
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="p-1.5 rounded-full bg-white/90 text-neutral-600 hover:text-emerald-700 hover:bg-white shadow-xs transition-all opacity-0 group-hover:opacity-100 hidden sm:flex"
              title="Quick view"
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category Row */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tracking-wide uppercase">
              {product.brand}
            </span>
            <span className="text-neutral-400 font-mono text-[10px]">
              SKU: {product.sku.split('-').slice(-2).join('-')}
            </span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="text-sm font-bold text-neutral-900 hover:text-emerald-700 transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* 60 Min & Stock Line */}
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center text-yellow-500 font-semibold gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              <span className="text-neutral-800 font-bold">{product.rating}</span>
              <span className="text-neutral-400 font-normal text-[11px]">({product.reviewsCount})</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-emerald-700" /> 60m ETA
            </span>
          </div>
        </div>

        {/* Price & Actions Bottom */}
        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-black tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-neutral-500">{product.unit}</span>
            </div>
            <button
              id={`btn-quote-${product.id}`}
              onClick={() => openQuoteModal(product)}
              className="text-[11px] font-bold text-yellow-900 bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded-lg transition-colors border border-yellow-300/40"
            >
              Get Quote
            </button>
          </div>

          {/* Blinkit Style Quick Add / Counter */}
          {cartQty === 0 ? (
            <button
              id={`btn-cart-${product.id}`}
              onClick={() => addToCart(product, 1)}
              className="w-full inline-flex items-center justify-center gap-2 bg-black hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs active:scale-[0.98]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add in 60 Mins</span>
            </button>
          ) : (
            <div className="flex items-center justify-between bg-emerald-700 text-white rounded-xl font-bold text-xs p-1 shadow-xs">
              <button
                onClick={() => updateCartQuantity(product.id, cartQty - 1)}
                className="p-1 hover:bg-emerald-800 rounded-lg transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-xs px-2">{cartQty} in cart</span>
              <button
                onClick={() => updateCartQuantity(product.id, cartQty + 1)}
                className="p-1 hover:bg-emerald-800 rounded-lg transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
