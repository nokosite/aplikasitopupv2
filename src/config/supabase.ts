import { createClient } from '@supabase/supabase-js';
import { ENV, validateEnv } from './env';

// Validasi environment variables saat import
validateEnv();

// Supabase configuration
const supabaseUrl = ENV.SUPABASE_URL;
const supabaseAnonKey = ENV.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Auto refresh token
    autoRefreshToken: true,
    // Persist session in local storage  
    persistSession: true,
    // Detect session from URL
    detectSessionInUrl: false,
    // Additional options for web
    flowType: 'pkce',
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  // Add debug logging
  ...(process.env.NODE_ENV === 'development' && {
    realtime: {
      params: {
        log_level: 'info',
      },
    },
  }),
});

// Types untuk authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

export interface AuthResponse {
  user: User | null;
  session: any;
  error: any;
} 