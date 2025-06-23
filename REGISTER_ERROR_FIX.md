# 🔧 Fix Register Error 400

## 🚨 **Masalah yang Terjadi**
Error 400 saat register dengan pesan: `Failed to load resource: the server responded with a status of 400`

## 🔍 **Kemungkinan Penyebab & Solusi**

### **1. 📧 Email Confirmation Setting**
**Masalah paling umum:** Supabase membutuhkan email confirmation tapi belum dikonfigurasi.

**Solusi:**
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Masuk ke **Authentication** → **Settings** 
4. Di bagian **Auth Settings**:
   - **Disable** "Confirm email" jika tidak diperlukan
   - **ATAU** setup email provider untuk confirmation

### **2. 🔐 Project Settings Issue**
**Kemungkinan:** Project belum fully configured atau ada restriction.

**Solusi:**
1. Cek **Settings** → **API**
2. Pastikan **anon key** dan **URL** benar
3. Cek **Database** → **Extensions** → Enable "auth" extension

### **3. 🛡️ Security Policies**
**Kemungkinan:** Row Level Security (RLS) mengblokir signup.

**Solusi:**
1. Masuk ke **Authentication** → **Policies**
2. Pastikan tidak ada policy yang mengblokir user registration
3. Check **Database** → **auth.users** table accessibility

### **4. 🌐 Domain/Email Restrictions**
**Kemungkinan:** Ada whitelist domain email yang aktif.

**Solusi:**
1. Cek **Authentication** → **Settings**
2. Lihat bagian **Site URL** dan **Additional URLs**
3. Disable domain restrictions jika ada

### **5. ❌ "Email address is invalid" Error**
**Kemungkinan:** Format email ditolak atau domain restricted.

**Solusi:**
1. **Authentication** → **Settings** → **Email Domain Allowlist**
2. **Remove restrictions** atau **add domain** yang digunakan
3. Avoid domain seperti `.test` untuk testing
4. Gunakan domain umum: `@gmail.com`, `@example.com`

### **6. 🗄️ Database Access Error**
**Error:** `relation "public.auth.users" does not exist`
**Kemungkinan:** Mencoba akses auth table langsung (restricted).

**Solusi:**
1. Gunakan `supabase.auth.getUser()` instead of table query
2. Auth tables tidak bisa diakses langsung dari client
3. Buat custom table di public schema untuk data app

## 🧪 **Debug Steps dengan App**

### **Step 1: Test Connection**
1. Buka app → Profile page
2. Scroll down, lihat **Supabase Debug** section  
3. Klik **"Test Connection"** 
4. Lihat hasil di toast notification

### **Step 2: Test SignUp**
1. Di **Supabase Debug**, klik **"Test SignUp"**
2. Ini akan coba register dengan dummy email
3. Lihat error message yang spesifik di toast

### **Step 3: Check Auth Settings**
1. Klik **"Check Auth"** 
2. Lihat info di console log
3. Verifikasi URL dan key configuration

## 🔧 **Quick Fix untuk Development**

### **Disable Email Confirmation (Recommended untuk testing):**

1. **Supabase Dashboard** → **Authentication** → **Settings**
2. **Auth Settings** section:
   ```
   ✅ Enable email confirmations: OFF
   ✅ Enable phone confirmations: OFF  
   ✅ Double confirm email changes: OFF
   ```

3. **Save Configuration**

4. **Test register** lagi di app

### **Alternative: Setup Email Provider**
Jika ingin keep email confirmation:

1. **Supabase Dashboard** → **Authentication** → **Settings**
2. **SMTP Settings** section
3. Configure email provider (Gmail, SendGrid, etc.)

## 📱 **Test dengan Data Real**

### **Test Registration:**
1. **Login page** → Switch ke **Register mode**
2. Isi data:
   ```
   Name: Test User
   Email: test@gmail.com  
   Password: Password123!
   ```
3. Klik **"Daftar"**
4. Lihat toast notification untuk error detail

### **Test Login:**
1. **Login page** → Mode **Login**
2. Isi data yang sama setelah berhasil register:
   ```
   Email: test@gmail.com  
   Password: Password123!
   ```
3. Klik **"Masuk"**
4. Jika error "Invalid login credentials" → User belum terdaftar atau email confirmation issue

### **Quick Test di Debug Page:**
1. Klik **"Quick Login Test"** button
2. Test dengan credentials fixed: `debuguser@gmail.com` / `Password123!`

## 🔍 **Console Log untuk Debug**

Buka browser console untuk melihat detailed error:

```javascript
// Error 400 details akan muncul seperti:
❌ SignUp error details: {
  message: "Email confirmations are required",
  status: 400,
  details: {...}
}
```

## ✅ **Verifikasi Fix Berhasil**

Setelah fix:
1. ✅ Register berhasil → Toast hijau: "Registrasi Berhasil"
2. ✅ No error 400 di console  
3. ✅ User muncul di **Supabase Dashboard** → **Authentication** → **Users**

## 🚀 **Jika Masih Error**

1. **Check project status** di Supabase Dashboard
2. **Regenerate anon key** jika perlu
3. **Contact support** atau check Supabase Discord
4. **Use demo mode** sementara dengan "Skip Login" button

**💡 Tip:** Error 400 hampir selalu terkait email confirmation settings. Disable dulu untuk testing, enable later untuk production.**

## 🔑 **LOGIN ERROR TROUBLESHOOTING**

### **Error: "Invalid login credentials" (400)**

**Penyebab paling umum:**
1. **User belum terdaftar** - Harus register dulu sebelum login
2. **Email confirmation required** - User terdaftar tapi email belum dikonfirmasi
3. **Password salah** - Typo atau password berbeda saat register

**Solusi step-by-step:**
1. **Cek di Supabase Dashboard** → **Authentication** → **Users**
   - Lihat apakah email user ada di list
   - Cek kolom **email_confirmed_at** (harus ada value, bukan null)

2. **Jika user TIDAK ADA di list:**
   - Registration gagal atau belum pernah register
   - Test registration dulu di debug page

3. **Jika user ADA tapi email_confirmed_at = null:**
   - **Disable email confirmation**: **Settings** → **Auth Settings** → OFF "Enable email confirmations"
   - **ATAU** setup email provider untuk confirmation

4. **Jika semua OK tapi masih error:**
   - Pastikan password sama persis (case-sensitive)
   - Test dengan "Quick Login Test" di debug page

### **Flow yang Benar:**
```
1. Register user → User masuk ke auth.users table
2. Disable email confirmation (untuk testing)  
3. Login dengan credentials yang sama
4. ✅ Berhasil login
``` 