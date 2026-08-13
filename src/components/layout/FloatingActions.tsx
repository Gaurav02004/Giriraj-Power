import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowUp, MessageCircle, FileText } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const { openQuoteModal } = useShop();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      'Namaste Giriraj Power Team, kindly share wholesale rates and material availability for our electrical project.'
    );
    window.open(`https://wa.me/919007168561?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* Floating WhatsApp Button */}
      <button
        id="btn-floating-whatsapp"
        onClick={handleWhatsApp}
        className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
        aria-label="Chat on WhatsApp"
        title="Chat with Giriraj Power Helpline on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-bold text-xs">WhatsApp Direct</span>
      </button>

      {/* Floating Quick Quote (Mobile/Compact) */}
      <button
        id="btn-floating-quote"
        onClick={() => openQuoteModal()}
        className="sm:hidden flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-xl"
        aria-label="Request Quote"
        title="Request Quote"
      >
        <FileText className="w-5 h-5" />
      </button>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={scrollToTop}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-black text-white shadow-lg border border-neutral-700 backdrop-blur-xs transition-all hover:scale-110"
          aria-label="Scroll back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
