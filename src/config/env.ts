// Environment configuration for Supabase
// Ganti nilai ini dengan URL dan API key dari project Supabase Anda

export const ENV = {
  // Supabase Configuration
  SUPABASE_URL: 'https://travssekebqdbofsecxz.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyYXZzc2VrZWJxZGJvZnNlY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjE5MTMsImV4cCI6MjA2MTM5NzkxM30.1z42f93_R9yHz7pbf2JrSGypGZ8sqZvDrvjkBQzJ-90',
  
  // App Configuration
  APP_NAME: 'TopUp Game Store',
  APP_VERSION: '1.0.0',
  
  // API Endpoints (jika diperlukan)
  API_BASE_URL: 'https://travssekebqdbofsecxz.supabase.co/rest/v1',
};

// Validasi environment variables
export const validateEnv = () => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  
  for (const key of required) {
    if (!ENV[key as keyof typeof ENV] || ENV[key as keyof typeof ENV].includes('your-')) {
      console.warn(`⚠️  Environment variable ${key} belum dikonfigurasi dengan benar`);
      console.warn('📝 Silakan update src/config/env.ts dengan credential Supabase Anda');
    }
  }
}; 