import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || (typeof window !== 'undefined' ? localStorage.getItem("supabase_url") : null);
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? localStorage.getItem("supabase_anon_key") : null);

    if (!url || !key) return null;

    return createClient(url, key);
};
