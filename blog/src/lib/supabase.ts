import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Article {
  id: number;
  slug: string;
  filename: string;
  title: string;
  excerpt: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
}
