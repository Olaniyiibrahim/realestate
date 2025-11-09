// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Singleton pattern to prevent multiple instances
let supabaseInstance = null

export const getSupabase = () => {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase environment variables')
      return null
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
        debug: import.meta.env.DEV
      }
    })
    
    console.log('✅ Supabase client initialized')
  }
  
  return supabaseInstance
}

export const supabase = getSupabase()