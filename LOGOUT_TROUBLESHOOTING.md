# 🚪 Troubleshooting: Tombol Logout

## ❌ Masalah: Tombol "Keluar" Normal Tidak Berfungsi (Direct Logout Bisa)

### 🎯 **Root Cause Identified**: Masalah di Alert Dialog

Jika Direct Logout berfungsi tapi tombol "Keluar" normal tidak, artinya masalahnya adalah **Alert.alert()** tidak bekerja dengan baik.

### 🔧 Perbaikan yang Telah Dilakukan:

#### 1. Separated Logout Logic
```typescript
// Fungsi logout utama (dipakai oleh kedua metode)
const performLogout = async () => { ... }

// Handler untuk tombol menu (dengan Alert)
const handleLogout = () => { 
  Alert.alert(...) // dengan fallback
}
```

#### 2. Enhanced Alert with Fallback
- Try-catch wrapper around Alert.alert
- Fallback ke direct logout jika Alert gagal
- Better logging untuk debugging

#### 3. Added Test Tools
- **Test Alert Dialog**: Test apakah Alert.alert berfungsi
- **Direct Logout Test**: Bypass Alert dialog
- **Menu Debug**: Log setiap menu item yang diklik

### 📱 **Langkah Testing Step-by-Step:**

#### Step 1: Test Alert Dialog
```
1. Profile > Developer Tools > "Test Alert Dialog"
2. Lihat apakah Alert muncul
3. Check console logs
```

#### Step 2: Test Menu Detection
```
1. Profile > Klik "Keluar" 
2. Check console untuk: "🔘 Menu item pressed: Keluar"
3. Check console untuk: "🚪 Logout menu item detected"
```

#### Step 3: Test Alert Function
```
1. Lanjut dari Step 2
2. Check console untuk: "🔔 Alert dialog will be shown"
3. Check console untuk: "🔔 Alert.alert called successfully"
4. Lihat apakah Alert dialog muncul
```

#### Step 4: Test Fallback
```
Jika Alert gagal, check console untuk:
"❌ Alert.alert failed"
"🔄 Falling back to direct logout" 
```

### 🔍 **Debug Console Logs Sequence:**

**Normal Flow (Berhasil):**
```
🔘 Menu item pressed: Keluar
🚪 Logout menu item detected, calling handleLogout
🔔 Alert dialog will be shown
🔔 Alert.alert called successfully
[User clicks "Ya, Keluar"]
✅ User confirmed logout
🚪 Logout process started
📱 Showing loading toast
🗑️ Clearing user orders for: [user-id]
🔓 Calling signOut
✅ SignOut completed
🎉 Showing success toast
🧭 Resetting navigation to Login
✅ Navigation reset completed
```

**Fallback Flow (Alert Gagal):**
```
🔘 Menu item pressed: Keluar
🚪 Logout menu item detected, calling handleLogout
🔔 Alert dialog will be shown
❌ Alert.alert failed: [error]
🔄 Falling back to direct logout
🚪 Logout process started
[... rest of logout process ...]
```

### 🧪 **Development Tools Testing:**

#### 1. Test Alert Dialog (Kuning)
- Test apakah Alert.alert berfungsi
- Tidak melakukan logout, hanya test dialog

#### 2. Direct Logout Test (Merah)  
- Bypass Alert dialog sepenuhnya
- Langsung panggil performLogout()

#### 3. Menu "Keluar" Normal
- Test flow lengkap dengan Alert confirmation

### 🐛 **Common Platform Issues:**

#### Web Platform:
- Alert.alert mungkin tidak bekerja di web
- Browser bisa block native dialogs
- **Solusi**: Gunakan Direct Logout Test

#### Mobile Platform:
- Alert harus import dari 'react-native'
- Platform permissions bisa mempengaruhi
- **Solusi**: Check import statement

### 💡 **Debugging Commands:**

```javascript
// Test Alert di console browser/device
Alert.alert('Test', 'Testing Alert', [
  { text: 'OK', onPress: () => console.log('Alert works!') }
]);

// Check import
import { Alert } from 'react-native';
```

### 🔄 **Expected Behavior After Fix:**

1. **Alert Test Works**: Test Alert button shows dialog
2. **Menu Detection Works**: Console shows menu item pressed
3. **Alert OR Fallback Works**: Either dialog shows OR fallback triggers
4. **Logout Completes**: User navigates to Login screen

---

**Status**: 🔧 **DEBUGGING - ALERT DIALOG ISSUE**

Main logout logic works (Direct Logout proves this). Issue is specifically with Alert.alert() function. Use Test Alert Dialog to verify Alert functionality on your platform.

## 🧪 **Quick Test Sequence:**

```
1. Profile > Dev Tools > "Test Alert Dialog" 
   → Should show test dialog

2. If Alert works:
   Profile > "Keluar" → Should show confirmation

3. If Alert doesn't work:
   Profile > Dev Tools > "Direct Logout Test"
   → Should logout immediately
```

## ❌ Masalah: Tombol Keluar Tidak Berfungsi

### 🔍 Diagnosis yang Telah Ditambahkan:

1. **Console Logging**: Tambahkan debug logs di fungsi logout
2. **Error Handling**: Perbaiki error handling di AuthContext
3. **Alternative Test Button**: Tombol logout langsung untuk testing

### 📱 Cara Test Logout:

#### Method 1: Tombol Menu Normal
```
1. Buka Profile page
2. Klik "Keluar" di menu
3. Konfirmasi dialog "Apakah Anda yakin ingin keluar?"
4. Klik "Keluar"
5. Check console logs untuk debug info
```

#### Method 2: Direct Logout (Development)
```
1. Buka Profile page
2. Scroll ke "Developer Tools" (hanya muncul saat dev mode)
3. Klik "Direct Logout Test"
4. Logout langsung tanpa konfirmasi
```

### 🔧 Perbaikan yang Dilakukan:

#### 1. AuthContext SignOut Function
**Masalah**: Error handling tidak proper
**Solusi**:
```typescript
const signOut = async () => {
  try {
    setLoading(true);
    const { error } = await authService.signOut();
    if (error) {
      throw new Error(error.message || 'Logout failed');
    }
    setUser(null);
    setSession(null);
  } catch (error) {
    console.error('SignOut error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};
```

#### 2. Profile Page Logout Function
**Fitur Baru**:
- ✅ Clear orders sebelum logout
- ✅ Debug console logs
- ✅ Immediate navigation (tidak pakai setTimeout)
- ✅ Better error handling

#### 3. Development Tools
**Tambahan**:
- Direct logout button untuk testing
- Skip confirmation dialog
- Immediate feedback

### 🛠️ Debug Console Logs:

Saat testing logout, check console untuk logs berikut:
```
🚪 Logout button pressed
📱 Showing loading toast
🗑️ Clearing user orders for: [user-id]
🔓 Calling signOut
✅ SignOut completed
🎉 Showing success toast
🧭 Resetting navigation to Login
✅ Navigation reset completed
```

Jika ada error, akan muncul:
```
❌ Logout error: [error details]
```

### 🔬 Langkah Testing:

1. **Login ke aplikasi**
2. **Buat sample orders** (opsional untuk test data clearing)
3. **Test logout normal**:
   - Profile > Keluar > Konfirmasi
   - Watch console logs
4. **Test direct logout**:
   - Profile > Developer Tools > Direct Logout Test
   - Watch console logs
5. **Verify hasil**:
   - Should navigate to Login screen
   - Orders should be cleared
   - User session should be null

### 📋 Expected Flow:

```
User clicks "Keluar" → 
Alert confirmation → 
User confirms → 
Show loading toast → 
Clear user orders → 
Call authService.signOut() → 
Clear user/session state → 
Show success toast → 
Navigate to Login screen
```

### 🐛 Common Issues:

1. **Alert tidak muncul**: Check TouchableOpacity onPress handler
2. **SignOut tidak dipanggil**: Check useAuth import dan signOut function
3. **Navigation gagal**: Check navigation prop dan screen names
4. **Orders tidak terhapus**: Check orderService.clearUserOrders
5. **Toast tidak muncul**: Check toastService implementation

### 💡 Debugging Tips:

1. **Check Console**: Lihat logs saat menekan tombol logout
2. **Check Network Tab**: Lihat request ke Supabase auth
3. **Check User State**: Verify user state di AuthContext
4. **Test Direct Method**: Gunakan Direct Logout Test button

---

**Status**: 🔧 **DEBUGGING - ENHANCED LOGGING**

Logout function telah diperbaiki dengan error handling yang lebih baik dan debug logging. Gunakan development tools untuk testing.

## 🧪 Test Commands:

```bash
# Check if server is running
curl -I http://localhost:8081

# Check console logs in Expo DevTools
# or inspect browser console for web version
``` 