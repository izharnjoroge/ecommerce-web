import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_APP_MAIN_URL!;
const key = import.meta.env.VITE_APP_PUBLIC_KEY!!;

const supabaseUrl = url;
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
