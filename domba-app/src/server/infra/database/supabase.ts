import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabasePublicKey = process.env.SUPABASE_PUBLIC_KEY || '';
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseSecretKey)