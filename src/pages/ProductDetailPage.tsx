import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SafeImage } from '../components/common/SafeImage';
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
  FileText,
  CheckCircle2,
  Zap,
  Info,
  Clock,
  Layers,
  Award,
  ArrowRight,
  Package,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openQuoteModal,
  } = useShop();

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [products, slug]);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(product?.minOrderQty || 1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'certs' | 'reviews'>('specs');

  // Update quantity and selected image when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setQuantity(product.minOrderQty || 1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center bg-white text-neutral-900">
        <h2 className="text-2xl font-bold text-black">Product Not Found</h2>
        <p className="text-neutral-600 mt-2">The electrical material you requested does not exist or has been relocated.</p>
        <Link
          to="/products"
          className="inline-block mt-4 bg-black hover:bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Return to Product Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const currentImage = selectedImage || product.image;

  // Calculate bulk price per unit for current chosen quantity
  let appliedDiscount = 0;
  if (product.bulkDiscountTiers) {
    for (const tier of product.bulkDiscountTiers) {
      if (quantity >= tier.minQty) {
        appliedDiscount = tier.discountPercent;
      }
    }
  }

  const unitPriceAfterBulk = product.price * (1 - appliedDiscount / 100);
  const lineItemTotal = unitPriceAfterBulk * quantity;

  // Related products from same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.categoryId === product.categoryId || p.brandId === product.brandId))
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: product.category, path: `/products/${product.categorySlug}` },
    { label: product.name },
  ];

  // Google Merchant Center structured data (Schema.org/Product)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image, ...(product.galleryImages || [])],
    description: product.description || product.shortDescription,
    sku: product.sku,
    mpn: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Giriraj Power',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      {/* Google Merchant Center Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Top Breadcrumbs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Product Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-4 aspect-4/3 flex items-center justify-center overflow-hidden relative shadow-xs">
              <SafeImage
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  Bestseller
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 bg-white transition-all ${
                      currentImage === img
                        ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Trust Callout */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-xs text-neutral-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-black">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Contractor Guarantee & Verification</span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Every batch shipped is accompanied by an original manufacturer test certificate and traceable QR batch code.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing, Specs & Order Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Brand & Stock */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/products?brand=${product.brandSlug}`}
                    className="text-xs font-black uppercase text-black bg-yellow-400 px-2.5 py-1 rounded-md hover:bg-yellow-500 transition-colors"
                  >
                    {product.brand}
                  </Link>
                  <span className="text-xs text-neutral-400 font-mono">SKU: {product.sku}</span>
                  {product.specifications.hsnCode && (
                    <span className="text-xs text-neutral-600 font-mono bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                      HSN: {product.specifications.hsnCode}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  <span>{product.stock > 0 ? `${product.stock} in warehouse stock` : 'Pre-order available'}</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-3 leading-snug">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 mt-3 text-xs">
                <div className="flex items-center text-yellow-600 font-bold gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-500 font-normal">({product.reviewsCount} contractor reviews)</span>
                </div>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-700 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dispatches in 24 Hours</span>
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 pb-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-black tracking-tight">
                      {formatPrice(unitPriceAfterBulk)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-xs text-neutral-500 font-semibold uppercase">
                      / {product.unit} (excl. 18% GST)
                    </span>
                  </div>
                  {appliedDiscount > 0 && (
                    <span className="inline-block mt-1 text-xs font-bold text-black bg-yellow-300 px-2 py-0.5 rounded border border-yellow-400">
                      Active Tier Discount: {appliedDiscount}% Volume Off Applied!
                    </span>
                  )}
                </div>

                <div className="text-right sm:text-right text-xs text-neutral-500">
                  <span className="font-semibold text-black">Line Subtotal: </span>
                  <span className="text-base font-bold text-emerald-700 font-mono">
                    {formatPrice(lineItemTotal)}
                  </span>
                </div>
              </div>

              {/* Bulk Discount Tiers Table */}
              {product.bulkDiscountTiers && product.bulkDiscountTiers.length > 0 && (
                <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-black mb-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Contractor Volume Price Slabs</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {product.bulkDiscountTiers.map((tier, idx) => {
                      const tierActive = quantity >= tier.minQty && (idx === product.bulkDiscountTiers!.length - 1 || quantity < product.bulkDiscountTiers![idx + 1].minQty);
                      const slabUnitCost = product.price * (1 - tier.discountPercent / 100);
                      return (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border text-center transition-all ${
                            tierActive
                              ? 'bg-black text-white border-black shadow-xs'
                              : 'bg-white text-neutral-800 border-neutral-200'
                          }`}
                        >
                          <div className={`text-[10px] font-semibold ${tierActive ? 'text-yellow-400' : 'text-neutral-500'}`}>
                            {tier.minQty}+ {product.unit}
                          </div>
                          <div className="font-bold text-xs mt-0.5">
                            {formatPrice(slabUnitCost)}
                          </div>
                          <div className={`text-[10px] font-semibold mt-0.5 ${tierActive ? 'text-yellow-300' : 'text-emerald-600'}`}>
                            {tier.discountPercent}% Off
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Controls & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {/* Quantity input */}
                <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50 h-12 w-full sm:w-36 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(product.minOrderQty || 1, q - 1))}
                    className="w-10 h-full text-neutral-800 hover:bg-neutral-200 font-bold transition-colors text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQty || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQty || 1, parseInt(e.target.value) || 1))}
                    className="w-full text-center text-sm font-bold bg-white h-full border-x border-neutral-300 focus:outline-hidden text-black"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full text-neutral-800 hover:bg-neutral-200 font-bold transition-colors text-base"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 h-12 inline-flex items-center justify-center gap-2 bg-black hover:bg-emerald-600 text-white font-bold text-sm px-6 rounded-xl transition-all shadow-md active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4 text-yellow-400" />
                  <span>Add {quantity} to Project Cart</span>
                </button>

                {/* Wishlist Button */}
                <button
                  id="pdp-wishlist-btn"
                  onClick={() => toggleWishlist(product)}
                  className={`h-12 w-12 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
                    isWishlisted ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                  }`}
                  aria-label="Wishlist"
                  title="Add to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Quote Banner */}
              <div className="pt-2 flex items-center justify-between text-xs border-t border-neutral-100">
                <span className="text-neutral-600">Ordering more than 100+ units or full BOQ?</span>
                <button
                  id="pdp-request-quote-btn"
                  onClick={() => openQuoteModal(product)}
                  className="font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Request Custom Project Quotation</span>
                </button>
              </div>
            </div>

            {/* Highlights bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-black">100% Genuine BIS Verified</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Authentic factory batch warranty with authorized distributor seal.</p>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-black">Heavy Crane Site Delivery</h4>
                  <p className="text-neutral-500 text-[11px] mt-0.5">Direct to project floor unloading across major Indian metro corridors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specification Tabs Section */}
        <div className="mt-14 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-200 bg-neutral-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-3.5 px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'specs'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-neutral-600 hover:text-black'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3.5 px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'features'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-neutral-600 hover:text-black'
              }`}
            >
              Features & Applications
            </button>
            <button
              onClick={() => setActiveTab('certs')}
              className={`py-3.5 px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'certs'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-neutral-600 hover:text-black'
              }`}
            >
              Compliance & Test Standards
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-3.5 px-6 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'reviews'
                  ? 'border-black text-black bg-white'
                  : 'border-transparent text-neutral-600 hover:text-black'
              }`}
            >
              Contractor Reviews ({product.reviewsCount})
            </button>
          </div>

          {/* Tab Content Panels */}
          <div className="p-6 sm:p-8">
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-neutral-100 text-xs"
                    >
                      <span className="font-semibold text-neutral-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-bold text-black text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-black mb-3">Key Engineering Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-800 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <h3 className="text-sm font-bold text-black mb-2">Recommended Contractor Use Cases</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Designed specifically for high-reliability electrical installations in commercial towers, hospital sub-distribution boards, industrial control machinery, and modern residential infrastructure.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'certs' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-black">National & International Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {product.certifications?.map((cert, i) => (
                    <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 flex items-center gap-3">
                      <Award className="w-6 h-6 text-emerald-600 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-black">{cert}</h4>
                        <p className="text-[10px] text-neutral-500">Verified Factory Batch Compliance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <div>
                    <h3 className="text-base font-bold text-black">Contractor Verification & Feedback</h3>
                    <p className="text-xs text-neutral-500">Average Rating: {product.rating} out of 5 stars ({product.reviewsCount} verified purchases)</p>
                  </div>
                  <button
                    onClick={() => openQuoteModal(product)}
                    className="text-xs font-bold text-emerald-600 hover:underline"
                  >
                    Submit Project Feedback
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-black">Venkatesh Builders & MEP</span>
                      <div className="flex text-yellow-500 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700 pt-1">
                      “Exact specification matched our electrical consultant’s drawing. Cable resistance measured under tolerance. Will re-order for Phase 2.”
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight">
                Related Electrical Materials
              </h2>
              <Link
                to={`/products/${product.categorySlug}`}
                className="text-xs font-bold text-black hover:text-emerald-600 flex items-center gap-1 font-semibold"
              >
                <span>View more in {product.category}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
