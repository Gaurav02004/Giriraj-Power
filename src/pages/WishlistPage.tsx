import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Heart, ArrowRight, ShoppingCart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart, showToast } = useShop();

  const handleAddAllToCart = () => {
    wishlist.forEach((item) => {
      addToCart(item.product, item.product.minOrderQty || 1);
    });
    showToast('All Added', 'Added all wishlist items to your project cart.', 'success');
  };

  const handleClearWishlist = () => {
    wishlist.forEach((item) => {
      removeFromWishlist(item.product.id);
    });
    showToast('Wishlist Cleared', 'All saved items removed.', 'info');
  };

  return (
    <div className="bg-white min-h-screen pb-20 text-neutral-900">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: 'Saved Materials Wishlist' }]} />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                Project Wishlist ({wishlist.length} Items)
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Saved electrical specifications and items for future project phases.
              </p>
            </div>

            {wishlist.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="inline-flex items-center gap-1.5 bg-black hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-yellow-400" />
                  <span>Add All to Cart</span>
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="text-xs text-neutral-500 hover:text-rose-600 transition-colors py-2 px-3 border border-neutral-200 rounded-xl bg-white"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto py-16 text-center bg-white rounded-2xl border border-neutral-200 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-black">Your wishlist is empty</h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
              Save cables, switchgear, and modular components while browsing to compare specs or request quotes later.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 bg-black hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors shadow-xs"
            >
              <span>Explore Materials</span>
              <ArrowRight className="w-4 h-4 text-yellow-400" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
