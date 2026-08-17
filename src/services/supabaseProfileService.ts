import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { UserProfileData, SavedAddress, Order } from '../types';

const LOCAL_STORAGE_PROFILES_KEY = 'giriraj_power_supabase_profiles_cache';

/**
 * Helper to get local cached profiles
 */
const getLocalProfileCache = (): Record<string, UserProfileData> => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Helper to update local profile cache
 */
const setLocalProfileCache = (cache: Record<string, UserProfileData>) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(cache));
  } catch (err) {
    console.warn('Failed to update local profile cache:', err);
  }
};

/**
 * Fetch profile for an authenticated user from In-Memory Server & Local Cache
 */
export const fetchSupabaseProfile = async (
  userId: string,
  userPhone?: string | null,
  userEmail?: string | null
): Promise<UserProfileData | null> => {
  const cache = getLocalProfileCache();
  let cached = cache[userId] || (userPhone && cache[userPhone]) || (userEmail && cache[userEmail]);

  // 1. Try In-Memory Backend Server first
  try {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (userPhone) params.append('phone', userPhone);
    if (userEmail) params.append('email', userEmail);

    const res = await fetch(`/api/user/profile?${params.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.profile) {
        cached = { ...cached, ...json.profile };
        cache[userId] = cached!;
        if (cached?.phone) cache[cached.phone] = cached;
        setLocalProfileCache(cache);
        return cached;
      }
    }
  } catch {
    // In-memory backend fallback to local cache
  }

  // 2. If Supabase is explicitly configured, query Supabase
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('profiles').select('*');
      if (userId) {
        query = query.eq('id', userId);
      } else if (userPhone) {
        query = query.eq('phone', userPhone);
      }

      const { data } = await query.maybeSingle();
      if (data) {
        const mapped: UserProfileData = {
          id: data.id,
          uid: data.id,
          phone: data.phone || userPhone || '',
          phoneNumber: data.phone || userPhone || '',
          fullName: data.full_name || data.name || 'Contractor Partner',
          name: data.full_name || data.name || 'Contractor Partner',
          email: data.email || userEmail || '',
          companyName: data.company_name || '',
          gstin: data.gstin || '',
          businessType: data.business_type || 'Electrical Contractor / MEP Firm',
          billingAddress: data.billing_address || '',
          savedAddresses: Array.isArray(data.shipping_addresses)
            ? data.shipping_addresses
            : (cached?.savedAddresses || []),
          addresses: Array.isArray(data.addresses) ? data.addresses : (cached?.addresses || []),
          isAdmin: Boolean(data.is_admin),
          is_admin: Boolean(data.is_admin),
          createdAt: data.created_at || new Date().toISOString(),
          created_at: data.created_at || new Date().toISOString(),
          updatedAt: data.updated_at || new Date().toISOString(),
        };

        cache[userId] = mapped;
        if (mapped.phone) cache[mapped.phone] = mapped;
        setLocalProfileCache(cache);
        return mapped;
      }
    } catch {
      // Ignored for zero-dependency operation
    }
  }

  return cached || null;
};

/**
 * Upsert or update a user's profile in the In-Memory store & Local Cache
 */
export const updateSupabaseProfile = async (
  profile: UserProfileData
): Promise<{ success: boolean; data?: UserProfileData; error?: string }> => {
  const userId = profile.uid || profile.id;
  if (!userId) {
    return { success: false, error: 'User ID is required to update profile' };
  }

  // Update local cache immediately for optimistic UI response
  const cache = getLocalProfileCache();
  const updatedData: UserProfileData = {
    ...profile,
    uid: userId,
    id: userId,
    updatedAt: new Date().toISOString(),
  };
  cache[userId] = updatedData;
  if (updatedData.phone) cache[updatedData.phone] = updatedData;
  setLocalProfileCache(cache);

  // Sync with in-memory server
  try {
    await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
  } catch {
    // Local cache already updated
  }

  if (isSupabaseConfigured) {
    try {
      const payload = {
        id: userId,
        phone: profile.phone || profile.phoneNumber || '',
        full_name: profile.fullName || profile.name || '',
        company_name: profile.companyName || '',
        gstin: profile.gstin || '',
        billing_address: profile.billingAddress || '',
        shipping_addresses: profile.savedAddresses || [],
        business_type: profile.businessType || 'Electrical Contractor / MEP Firm',
        is_admin: Boolean(profile.isAdmin || profile.is_admin),
        updated_at: new Date().toISOString(),
      };

      await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });
    } catch {
      // Ignored for zero-dependency operation
    }
  }

  return { success: true, data: updatedData };
};

/**
 * Add or update a delivery site address for the user
 */
export const saveAddressToSupabaseProfile = async (
  userId: string,
  newAddress: SavedAddress,
  currentAddresses: SavedAddress[] = []
): Promise<{ success: boolean; addresses: SavedAddress[]; error?: string }> => {
  let updatedList = [...currentAddresses];

  const existingIndex = updatedList.findIndex((a) => a.id === newAddress.id);
  if (existingIndex >= 0) {
    if (newAddress.isDefault) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
    }
    updatedList[existingIndex] = newAddress;
  } else {
    if (newAddress.isDefault || updatedList.length === 0) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      newAddress.isDefault = true;
    }
    updatedList.push(newAddress);
  }

  const cache = getLocalProfileCache();
  if (cache[userId]) {
    cache[userId].savedAddresses = updatedList;
    setLocalProfileCache(cache);

    // Sync to in-memory server
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cache[userId]),
      });
    } catch {
      // Local state is preserved
    }
  }

  return { success: true, addresses: updatedList };
};

/**
 * Delete a delivery site address from the user's profile
 */
export const deleteAddressFromSupabaseProfile = async (
  userId: string,
  addressId: string,
  currentAddresses: SavedAddress[] = []
): Promise<{ success: boolean; addresses: SavedAddress[] }> => {
  let updatedList = currentAddresses.filter((a) => a.id !== addressId);

  // If deleted address was default and there are remaining addresses, make the first one default
  if (updatedList.length > 0 && !updatedList.some((a) => a.isDefault)) {
    updatedList[0].isDefault = true;
  }

  const cache = getLocalProfileCache();
  if (cache[userId]) {
    cache[userId].savedAddresses = updatedList;
    setLocalProfileCache(cache);

    // Sync to in-memory server
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cache[userId]),
      });
    } catch {
      // Local state is preserved
    }
  }

  return { success: true, addresses: updatedList };
};

/**
 * Set an address as default
 */
export const setDefaultAddressInSupabaseProfile = async (
  userId: string,
  addressId: string,
  currentAddresses: SavedAddress[] = []
): Promise<{ success: boolean; addresses: SavedAddress[] }> => {
  const updatedList = currentAddresses.map((a) => ({
    ...a,
    isDefault: a.id === addressId,
  }));

  const cache = getLocalProfileCache();
  if (cache[userId]) {
    cache[userId].savedAddresses = updatedList;
    setLocalProfileCache(cache);

    // Sync to in-memory server
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cache[userId]),
      });
    } catch {
      // Local state is preserved
    }
  }

  return { success: true, addresses: updatedList };
};

/**
 * Fetch orders for the user from In-Memory Server or local store
 */
export const fetchSupabaseUserOrders = async (
  userId?: string | null,
  userPhone?: string | null,
  userEmail?: string | null,
  fallbackOrders: Order[] = []
): Promise<Order[]> => {
  // Check in-memory server first
  if (userId) {
    try {
      const res = await fetch(`/api/user/orders?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.orders && data.orders.length > 0) {
          return data.orders;
        }
      }
    } catch {
      // Fallback to local store orders
    }
  }

  return fallbackOrders.filter((order) => {
    if (userPhone && order.phone && order.phone.replace(/\D/g, '').includes(userPhone.replace(/\D/g, ''))) {
      return true;
    }
    if (userEmail && order.email && order.email.toLowerCase() === userEmail.toLowerCase()) {
      return true;
    }
    return true; // Return all store orders placed in session
  });
};
