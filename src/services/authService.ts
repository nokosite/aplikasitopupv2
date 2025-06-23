import { supabase, AuthResponse } from '../config/supabase';

class AuthService {
  // Login dengan email dan password
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return {
        user: data.user,
        session: data.session,
        error,
      };
    } catch (error) {
      return {
        user: null,
        session: null,
        error,
      };
    }
  }

  // Register user baru
  async signUp(email: string, password: string, name?: string): Promise<AuthResponse> {
    try {
      console.log('🔄 Starting signUp process...', { email, hasPassword: !!password, name });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          },
        },
      });

      console.log('📊 SignUp response:', { 
        user: data.user ? 'User created' : 'No user', 
        session: data.session ? 'Session created' : 'No session',
        error: error ? error.message : 'No error'
      });

      if (error) {
        console.error('❌ SignUp error details:', {
          message: error.message,
          status: error.status,
          details: error
        });
      }

      return {
        user: data.user,
        session: data.session,
        error,
      };
    } catch (error) {
      console.error('🚨 SignUp exception:', error);
      return {
        user: null,
        session: null,
        error,
      };
    }
  }

  // Logout
  async signOut(): Promise<{ error: any }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  }

  // Get current session
  async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { session, error };
    } catch (error) {
      return { session: null, error };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { user, error };
    } catch (error) {
      return { user: null, error };
    }
  }

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      return { error };
    }
  }
}

export const authService = new AuthService(); 