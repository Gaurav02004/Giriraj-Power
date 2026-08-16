import { Product } from '../types';

const STORAGE_KEY_PRODUCTS = 'giriraj_power_products';

/**
 * Fetch all products from local state or initial products list
 */
export const getFirestoreProducts = async (): Promise<Product[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error fetching local products:', error);
  }
  return [];
};

/**
 * Seed or update catalog products into local store
 */
export const syncProductsToFirestore = async (products: Product[]): Promise<number> => {
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    return products.length;
  } catch (error) {
    console.error('Error syncing products:', error);
    return 0;
  }
};

/**
 * Update stock for a product locally
 */
export const updateFirestoreProductStock = async (productId: string, newStock: number): Promise<void> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) {
      const products: Product[] = JSON.parse(raw);
      const idx = products.findIndex((p) => p.id === productId);
      if (idx !== -1) {
        products[idx].stock = newStock;
        products[idx].inStock = newStock > 0;
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
      }
    }
  } catch (error) {
    console.error(`Error updating stock for ${productId}:`, error);
  }
};
