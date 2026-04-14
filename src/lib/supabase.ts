import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to provided defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ljqqaqncudhjbxffmnxu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_2Rb2OFXjuWbYsrCzcZK2CQ_R19B35e4';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
