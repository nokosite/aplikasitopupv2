# 🚀 Setup Supabase untuk AplikasiTopupV2

## 📋 Langkah-langkah Setup Supabase

### 1. Buat Project Supabase
1. Buka [supabase.com](https://supabase.com)
2. Klik **"Start your project"** atau **"New Project"**
3. Login dengan akun GitHub/Google
4. Buat project baru:
   - **Name**: `aplikasi-topup-v2`
   - **Database Password**: (buat password yang kuat)
   - **Region**: Singapore (untuk performa terbaik di Indonesia)
   - Klik **"Create new project"**

### 2. Dapatkan Credentials
Setelah project selesai dibuat:
1. Masuk ke **Settings** → **API**
2. Copy 2 nilai berikut:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (key yang panjang)

### 3. Update Konfigurasi
Edit file `src/config/env.ts`:

```typescript
export const ENV = {
  // Ganti dengan credentials Supabase Anda
  SUPABASE_URL: 'https://your-project-id.supabase.co',
  SUPABASE_ANON_KEY: 'your-anon-key-here',
  
  // App Configuration
  APP_NAME: 'TopUp Game Store',
  APP_VERSION: '1.0.0',
  
  // API Endpoints
  API_BASE_URL: 'https://your-project-id.supabase.co/rest/v1',
};
```

### 4. Test Koneksi
1. Jalankan aplikasi: `npm start`
2. Buka Login page
3. Coba register user baru
4. Check di Supabase Dashboard → Authentication untuk melihat user baru

## 🎯 Fitur Authentication yang Tersedia

### ✅ Yang Sudah Diimplementasi:
- ✅ **Login**: Email & Password authentication
- ✅ **Register**: Create new user dengan nama
- ✅ **Logout**: Sign out dan redirect ke login
- ✅ **Session Management**: Auto-persist login state
- ✅ **Real-time Auth**: Listen for auth state changes
- ✅ **UI Konsisten**: Dark theme dengan glass morphism
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Form Validation**: Input validation untuk email/password
- ✅ **Skip Login**: Demo mode untuk testing

### 🔧 Optional Enhancements:
- 🔲 **Email Verification**: Verifikasi email otomatis
- 🔲 **Forgot Password**: Reset password via email
- 🔲 **Social Login**: Google/GitHub OAuth
- 🔲 **Profile Upload**: Avatar image upload
- 🔲 **User Roles**: Admin/User role management

## 📱 Cara Penggunaan

### 1. Navigation Flow
```
Onboarding → Login → MainTabs (Home/Orders/Profile)
```

### 2. Auth Context
```typescript
import { useAuth } from '../contexts/AuthContext';

const { user, session, loading, signIn, signUp, signOut } = useAuth();
```

### 3. Protected Routes
Authentication state otomatis dikelola oleh AuthContext. User akan diarahkan ke Login jika belum authenticate.

## 🎨 UI Components

### Login Page Features:
- **Toggle Mode**: Switch between Login/Register
- **Show/Hide Password**: Eye icon untuk visibility
- **Loading States**: Spinner saat proses auth
- **Validation**: Form validation dengan error messages
- **Responsive Design**: Consistent dengan theme aplikasi

### Profile Integration:
- **Real User Data**: Tampilkan email dan nama dari Supabase
- **Logout Button**: Smooth logout dengan confirmation
- **Session Persistence**: Maintain login state across app restarts

## 🔒 Security Features

### Built-in Security:
- ✅ **Password Encryption**: Supabase handles bcrypt hashing
- ✅ **JWT Tokens**: Secure session management
- ✅ **Row Level Security**: Ready untuk data protection
- ✅ **SQL Injection Protection**: Prepared statements
- ✅ **HTTPS**: Encrypted data transmission

## 🚀 Production Readiness

### Environment Variables:
- Gunakan `.env` files untuk production credentials
- Pisahkan development dan production configs
- Never commit credentials ke git

### Database Schema (Optional):
```sql
-- Profiles table untuk data user tambahan
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 📞 Support

Jika ada masalah dengan setup:
1. Check console logs untuk error messages
2. Verify Supabase credentials di `src/config/env.ts`
3. Test koneksi di Supabase Dashboard
4. Check network connectivity

**Happy Coding! 🎮** 