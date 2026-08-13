import React, { useState } from 'react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { SafeImage } from './SafeImage';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Check, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist, formatPrice, openQuoteModal } = useShop();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const currentImage = selectedImage || product.image;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        id={`quickview-modal-${product.id}`}
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-neutral-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors shadow-xs border border-neutral-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left Media */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200">
              <SafeImage
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      currentImage === img ? 'border-emerald-600 scale-95' : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {product.brand}
                </span>
                <span className="text-xs text-neutral-400">•</span>
                <span className="text-xs text-neutral-500 font-mono">SKU: {product.sku}</span>
              </div>

              <h2 className="text-lg font-bold text-neutral-900 mt-2 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center text-yellow-500 text-sm font-semibold gap-1">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="text-neutral-900 font-bold">{product.rating}</span>
                  <span className="text-neutral-500 font-normal text-xs">({product.reviewsCount} contractor reviews)</span>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {product.stock > 0 ? 'Ready for Dispatch' : 'Special Order'}
                </span>
              </div>

              <div className="mt-4 pb-4 border-b border-neutral-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-black tracking-tight">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-neutral-500 font-medium">({product.unit})</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Exclusive of 18% GST • Standard site freight calculated at checkout</p>
              </div>

              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Key Features bullets */}
              <ul className="mt-3 space-y-1 text-xs text-neutral-700">
                {product.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & CTA */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-semibold bg-white border-x border-neutral-300 py-1.5 focus:outline-hidden"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-neutral-700 hover:bg-neutral-200 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  id="quickview-add-cart-btn"
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-black hover:bg-emerald-600 text-white font-bold text-sm py-2.5 px-4 rounded-lg transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Project Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isWishlisted ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => {
                    onClose();
                    openQuoteModal(product);
                  }}
                  className="text-neutral-900 bg-yellow-100 hover:bg-yellow-200 px-2.5 py-1 rounded font-bold transition-colors inline-flex items-center gap-1 border border-yellow-300/40"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-700 fill-yellow-700" />
                  Request Custom Volume Quote
                </button>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-emerald-700 hover:text-emerald-800 underline font-semibold"
                >
                  Full Technical Specs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
