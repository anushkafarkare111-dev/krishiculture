import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey);

export interface JugaadIdeaRow {
  id: string;
  name: string;
  region: string;
  crop: string;
  emoji: string;
  image_url: string;
  desc_en: string;
  desc_hi: string;
  created_at: string;
}
