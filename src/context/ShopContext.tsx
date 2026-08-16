import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, WishlistItem, QuoteRequest, Order, ToastNotification } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_ORDERS, INITIAL_QUOTES } from '../data/adminMock';
import {
  getFirestoreProducts,
  syncProductsToFirestore,
  updateFirestoreProductStock,
} from '../firebase/productService';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  orders: Order[];
  quotes: QuoteRequest[];
  toasts: ToastNotification[];
  // Location & Pincode (Kolkata 700039 Express 60-Min)
  pincode: string;
  city: string;
  areaName: string;
  setPincode: (pin: string, area?: string) => void;
  isPincodeModalOpen: boolean;
  openPincodeModal: () => void;
  closePincodeModal: () => void;
  // Free Delivery & Quick-commerce calculations
  freeDeliveryThreshold: number;
  deliveryFee: number;
  amountNeededForFreeDelivery: number;
  isFreeDeliveryEligible: boolean;
  getItemQuantityInCart: (productId: string) => number;
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartTotal: number;
  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
  // Quote Actions
  submitQuote: (quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => QuoteRequest;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  // Order Actions
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (id: string, status: Order['orderStatus']) => void;
  // Product & Inventory Actions (Admin)
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, newStock: number) => void;
  syncWithFirestore: () => Promise<void>;
  isFirestoreSynced: boolean;
  // UI Helpers
  showToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  formatPrice: (amount: number) => string;
  // Quote Modal State
  isQuoteModalOpen: boolean;
  selectedQuoteProduct: Product | null;
  openQuoteModal: (product?: Product) => void;
  closeQuoteModal: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'powerrun_cart_v1';
const WISHLIST_STORAGE_KEY = 'powerrun_wishlist_v1';
const ORDERS_STORAGE_KEY = 'powerrun_orders_v1';
const QUOTES_STORAGE_KEY = 'powerrun_quotes_v1';
const PRODUCTS_STORAGE_KEY = 'powerrun_products_v1';

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products state (defaults to PRODUCTS, persisted if modified)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [isFirestoreSynced, setIsFirestoreSynced] = useState(false);

  // Synchronize Firestore product catalog on application startup
  useEffect(() => {
    let isMounted = true;
    const initializeFirestoreProducts = async () => {
      try {
        const firestoreProds = await getFirestoreProducts();
        if (isMounted) {
          if (firestoreProds && firestoreProds.length > 0) {
            setProducts(firestoreProds);
            setIsFirestoreSynced(true);
          } else {
            // If Firestore is empty, seed initial catalog
            await syncProductsToFirestore(PRODUCTS);
            setIsFirestoreSynced(true);
          }
        }
      } catch (err) {
        console.warn('Firestore products initialization notice:', err);
        // Continue with local products gracefully
      }
    };

    initializeFirestoreProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const syncWithFirestore = async () => {
    try {
      await syncProductsToFirestore(products);
      setIsFirestoreSynced(true);
      showToast('Firestore Synced', `${products.length} catalog items updated in Cloud database.`, 'success');
    } catch (err: any) {
      showToast('Sync Error', err.message || 'Failed to sync with Firestore', 'error');
    }
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Quotes state
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem(QUOTES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Location & Quick-Commerce Delivery State (Defaulting to Kolkata 700039)
  const [pincode, setPincodeState] = useState<string>(() => {
    try {
      return localStorage.getItem('giriraj_pincode') || '700039';
    } catch {
      return '700039';
    }
  });

  const [areaName, setAreaName] = useState<string>(() => {
    try {
      return localStorage.getItem('giriraj_area') || 'Kolkata (Topsia / EM Bypass)';
    } catch {
      return 'Kolkata (Topsia / EM Bypass)';
    }
  });

  const city = 'Kolkata';
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);

  const setPincode = (newPin: string, newArea?: string) => {
    setPincodeState(newPin);
    const resolvedArea = newArea || (newPin === '700039' ? 'Kolkata (Topsia / EM Bypass)' : `Kolkata (${newPin})`);
    setAreaName(resolvedArea);
    try {
      localStorage.setItem('giriraj_pincode', newPin);
      localStorage.setItem('giriraj_area', resolvedArea);
    } catch (e) {
      console.error(e);
    }
    showToast('Delivery Location Updated', `Express 60-min delivery set to ${resolvedArea} - PIN ${newPin}`, 'info');
  };

  const openPincodeModal = () => setIsPincodeModalOpen(true);
  const closePincodeModal = () => setIsPincodeModalOpen(false);

  const getItemQuantityInCart = (productId: string): number => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Global Quote Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<Product | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
    } catch (e) {
      console.error('Failed to save quotes to localStorage', e);
    }
  }, [quotes]);

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  // Toast Helpers
  const showToast = (title: string, message: string, type: ToastNotification['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Price Formatter (INR Currency Format)
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Cart Calculations with Bulk Discount support
  const getProductDiscountedPrice = (product: Product, quantity: number): number => {
    let price = product.price;
    if (product.bulkDiscountTiers && product.bulkDiscountTiers.length > 0) {
      // Find highest eligible tier
      const tiers = [...product.bulkDiscountTiers].sort((a, b) => b.minQty - a.minQty);
      const matched = tiers.find((t) => quantity >= t.minQty);
      if (matched) {
        price = product.price * (1 - matched.discountPercent / 100);
      }
    }
    return price;
  };

  const cartSubtotal = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const cartDiscountedSubtotal = cart.reduce((sum, item) => {
    const discountedPrice = getProductDiscountedPrice(item.product, item.quantity);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const cartDiscount = Math.max(0, cartSubtotal - cartDiscountedSubtotal);
  const cartTax = Number(((cartDiscountedSubtotal) * 0.18).toFixed(2)); // Standard 18% GST on Electrical Goods
  const cartTotal = Number((cartDiscountedSubtotal + cartTax).toFixed(2));

  // Free delivery threshold (Free delivery on orders above ₹1000, no minimum order limit)
  const freeDeliveryThreshold = 1000;
  const isFreeDeliveryEligible = cartSubtotal >= freeDeliveryThreshold;
  const deliveryFee = cartSubtotal === 0 || isFreeDeliveryEligible ? 0 : 49;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart Operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(
      'Added to Project Cart',
      `${quantity}x ${product.name.substring(0, 40)}... added successfully.`,
      'success'
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast('Item Removed', `${item.product.name.substring(0, 30)} removed from cart.`, 'info');
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.product.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.product.id !== product.id));
      showToast('Removed from Wishlist', `${product.name.substring(0, 35)}... removed.`, 'info');
    } else {
      setWishlist((prev) => [...prev, { product, addedAt: new Date().toISOString() }]);
      showToast('Saved to Wishlist', `${product.name.substring(0, 35)}... saved for later.`, 'success');
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const wishlistCount = wishlist.length;

  // Quote Operations
  const submitQuote = (quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>): QuoteRequest => {
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `qt-${Date.now().toString().slice(-6)}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setQuotes((prev) => [newQuote, ...prev]);
    showToast(
      'Quotation Request Submitted',
      'Thank you. Our Giriraj Power technical sales team will contact you shortly with your custom B2B estimate.',
      'success'
    );
    return newQuote;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
    showToast('Quote Updated', `Quote #${id} marked as ${status}.`, 'info');
  };

  // Order Operations
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now().toString().slice(-6)}`,
      orderNumber: `PR-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(
      'Order Placed Successfully!',
      `Order ${newOrder.orderNumber} confirmed. Invoice dispatched to ${newOrder.email}.`,
      'success'
    );
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order['orderStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, orderStatus: status } : o)));
    showToast('Order Status Updated', `Order #${id} status changed to ${status}.`, 'info');
  };

  // Admin Product Actions
  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast('Product Added', `${newProd.name} added to catalog.`, 'success');
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProd.id ? updatedProd : p)));
    showToast('Product Updated', `${updatedProd.name} changes saved.`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product Deleted', 'Product removed from catalog.', 'warning');
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, stock: newStock, inStock: newStock > 0 } : p
      )
    );
    // Asynchronously update in Firestore
    updateFirestoreProductStock(productId, newStock).catch((err) => {
      console.warn(`Firestore stock sync note for ${productId}:`, err);
    });
    showToast('Stock Updated', `Inventory updated to ${newStock} units.`, 'info');
  };

  // Quote Modal Triggers
  const openQuoteModal = (product?: Product) => {
    setSelectedQuoteProduct(product || null);
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedQuoteProduct(null);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        quotes,
        toasts,
        pincode,
        city,
        areaName,
        setPincode,
        isPincodeModalOpen,
        openPincodeModal,
        closePincodeModal,
        freeDeliveryThreshold,
        deliveryFee,
        amountNeededForFreeDelivery,
        isFreeDeliveryEligible,
        getItemQuantityInCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartTotal,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount,
        submitQuote,
        updateQuoteStatus,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        syncWithFirestore,
        isFirestoreSynced,
        showToast,
        removeToast,
        formatPrice,
        isQuoteModalOpen,
        selectedQuoteProduct,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
