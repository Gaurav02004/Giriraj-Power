import { createClient } from '@supabase/supabase-js';

// Read Supabase credentials according to Vercel integration variable naming
// Vercel auto-injects: SUPABASE_URL, SUPABASE_ANON_KEY (and VITE_ variations)
const supabaseUrl =
  (import.meta.env.SUPABASE_URL as string) ||
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  '';

const supabaseAnonKey =
  (import.meta.env.SUPABASE_ANON_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.SUPABASE_JWT_SECRET as string) ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
