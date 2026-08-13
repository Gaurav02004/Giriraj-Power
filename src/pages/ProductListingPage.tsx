import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { BRANDS } from '../data/brands';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Product } from '../types';
import {
  SlidersHorizontal,
  Grid,
  List,
  Search,
  X,
  ChevronDown,
  RotateCcw,
  Check,
  Zap,
  Filter,
} from 'lucide-react';

export const ProductListingPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useShop();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Search, brand, category, in-stock, price filters from state/URL
  const currentSearch = searchParams.get('search') || '';
  const currentBrand = searchParams.get('brand') || '';
  const currentSort = searchParams.get('sort') || 'featured';
  const inStockOnly = searchParams.get('instock') === 'true';
  const minPriceParam = Number(searchParams.get('minPrice')) || 0;
  const maxPriceParam = Number(searchParams.get('maxPrice')) || 50000;

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    currentBrand ? [currentBrand] : []
  );
  const [inStock, setInStock] = useState<boolean>(inStockOnly);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPriceParam, maxPriceParam]);

  // Current category object if URL has categorySlug
  const currentCategory = useMemo(() => {
    if (!categorySlug) return null;
    return CATEGORIES.find((c) => c.slug === categorySlug);
  }, [categorySlug]);

  // Update query params helper
  const updateQueryParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleBrandToggle = (brandSlug: string) => {
    let updated: string[];
    if (selectedBrands.includes(brandSlug)) {
      updated = selectedBrands.filter((b) => b !== brandSlug);
    } else {
      updated = [...selectedBrands, brandSlug];
    }
    setSelectedBrands(updated);
    updateQueryParam('brand', updated.length > 0 ? updated[0] : null);
  };

  const handleClearAll = () => {
    setSelectedBrands([]);
    setInStock(false);
    setPriceRange([0, 50000]);
    setSearchParams({});
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (categorySlug && product.categoryId !== categorySlug && !product.category.toLowerCase().includes(categorySlug.replace(/-/g, ' '))) {
        return false;
      }

      // Search term
      if (currentSearch) {
        const query = currentSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesSku && !matchesCategory) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrands.length > 0) {
        const match = selectedBrands.some(
          (b) => b.toLowerCase() === product.brandId.toLowerCase() || b.toLowerCase() === product.brand.toLowerCase()
        );
        if (!match) return false;
      }

      // In-stock filter
      if (inStock && product.stock <= 0) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'rating') return b.rating - a.rating;
      if (currentSort === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, categorySlug, currentSearch, selectedBrands, inStock, priceRange, currentSort]);

  // Breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: 'Products', path: '/products' }];
    if (currentCategory) {
      items.push({ label: currentCategory.name, path: `/products/${currentCategory.slug}` });
    } else if (currentSearch) {
      items.push({ label: `Search: "${currentSearch}"`, path: `/products?search=${encodeURIComponent(currentSearch)}` });
    }
    return items;
  }, [currentCategory, currentSearch]);

  return (
    <div className="bg-white min-h-screen pb-16 text-neutral-900">
      {/* Header Bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                {currentCategory
                  ? currentCategory.name
                  : currentSearch
                  ? `Search Results for "${currentSearch}"`
                  : 'All Electrical Construction Materials'}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
                {currentCategory
                  ? currentCategory.description
                  : 'Certified wires, heavy switchgear, distribution boards, LED troffers, and industrial accessories with wholesale bulk pricing.'}
              </p>
            </div>

            {/* Total Results Counter */}
            <div className="text-xs text-neutral-600 font-medium bg-neutral-100 px-3 py-1.5 rounded-lg shrink-0 self-start md:self-auto border border-neutral-200">
              Showing <span className="font-bold text-black">{filteredProducts.length}</span> of {products.length} Products
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="font-bold text-sm text-black flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
              </span>
              {(selectedBrands.length > 0 || inStock || currentSearch || priceRange[1] < 50000) && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Categories Quick Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                Categories
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                <Link
                  to="/products"
                  className={`block px-2.5 py-1.5 rounded-lg transition-colors ${
                    !categorySlug
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  All Categories ({products.length})
                </Link>
                {CATEGORIES.map((cat) => {
                  const isSelected = categorySlug === cat.slug;
                  return (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.slug}`}
                      className={`block px-2.5 py-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-yellow-400 text-black font-bold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                Authorized Brands
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
                {BRANDS.map((brand) => {
                  const isChecked = selectedBrands.includes(brand.slug);
                  return (
                    <label
                      key={brand.id}
                      className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBrandToggle(brand.slug)}
                        className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="flex-1">{brand.name}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">({brand.productCount})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Stock Availability */}
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                Availability
              </h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-700 font-medium">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    updateQueryParam('instock', e.target.checked ? 'true' : null);
                  }}
                  className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>In Stock & Ready for Dispatch</span>
              </label>
            </div>

            {/* Price Range Slider */}
            <div className="pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                <span>Max Unit Price</span>
                <span className="text-black font-mono font-bold">₹{priceRange[1].toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
            </div>
          </aside>

          {/* Right Main Grid */}
          <main className="flex-1 min-w-0">
            {/* Control Bar (Sort, View Toggles, Filter Drawer Trigger) */}
            <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-xs mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold px-3 py-2 rounded-lg"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {/* Active Filter Badges */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap text-xs">
                  {selectedBrands.map((b) => (
                    <span
                      key={b}
                      className="bg-yellow-100 text-black font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-yellow-300"
                    >
                      <span>Brand: {b}</span>
                      <button onClick={() => handleBrandToggle(b)} className="hover:text-black">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {inStock && (
                    <span className="bg-emerald-50 text-emerald-800 font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-emerald-200">
                      <span>In Stock</span>
                      <button onClick={() => setInStock(false)} className="hover:text-emerald-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {currentSearch && (
                    <span className="bg-neutral-100 text-black font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-neutral-200">
                      <span>Search: "{currentSearch}"</span>
                      <button onClick={() => updateQueryParam('search', null)} className="hover:text-neutral-700">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <span className="hidden sm:inline font-semibold text-neutral-800">Sort By:</span>
                  <select
                    value={currentSort}
                    onChange={(e) => updateQueryParam('sort', e.target.value)}
                    className="bg-white border border-neutral-300 text-black text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value="featured">Featured / Bestsellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Contractor Rated</option>
                    <option value="newest">Newly Added Products</option>
                  </select>
                </div>

                {/* Grid / List View Toggle */}
                <div className="flex items-center border border-neutral-200 rounded-lg p-0.5 bg-neutral-100">
                  <button
                    onClick={() => setLayout('grid')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'grid' ? 'bg-white text-black shadow-xs' : 'text-neutral-400 hover:text-neutral-800'
                    }`}
                    title="Grid View"
                    aria-label="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      layout === 'list' ? 'bg-white text-black shadow-xs' : 'text-neutral-400 hover:text-neutral-800'
                    }`}
                    title="List View"
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Listing Display */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    layout={layout}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-lg mx-auto my-8">
                <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-black">No matching materials found</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Try adjusting your price range, clearing brand filters, or search for another electrical SKU.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-5 bg-black hover:bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Slideout Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="bg-white w-full max-w-sm h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <h3 className="font-bold text-black text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-600" />
                  <span>Filter Products</span>
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Brands in Mobile */}
              <div className="py-4 border-b border-neutral-100">
                <h4 className="text-xs font-bold uppercase text-neutral-500 mb-3">Brands</h4>
                <div className="space-y-2.5 text-xs">
                  {BRANDS.map((brand) => (
                    <label key={brand.id} className="flex items-center gap-2.5 text-neutral-800 font-medium">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.slug)}
                        onChange={() => handleBrandToggle(brand.slug)}
                        className="rounded border-neutral-300 text-emerald-600"
                      />
                      <span>{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability in Mobile */}
              <div className="py-4 border-b border-neutral-100">
                <label className="flex items-center gap-2.5 text-xs font-medium text-neutral-800">
                  <input
                    type="checkbox"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="rounded border-neutral-300 text-emerald-600"
                  />
                  <span>Show In-Stock Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 flex gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 border border-neutral-300 text-neutral-700 rounded-xl text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-black hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
