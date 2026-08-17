import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { ToastContainer } from './components/common/ToastContainer';
import { QuoteModal } from './components/common/QuoteModal';
import { PincodeModal } from './components/common/PincodeModal';
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BrandsPage } from './pages/BrandsPage';
import { QuotePage } from './pages/QuotePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-white text-neutral-900 selection:bg-yellow-300 selection:text-black font-sans antialiased">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:categorySlug" element={<ProductListingPage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/brands" element={<BrandsPage />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
            <FloatingActions />
            <QuoteModal />
            <PincodeModal />
            <ToastContainer />
          </div>
        </BrowserRouter>
      </ShopProvider>
    </AuthProvider>
  );
}

