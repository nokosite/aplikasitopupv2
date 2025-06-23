# 🔔 Toast Notification System

## 📋 Overview

Sistema notifikasi toast yang sudah diintegrasikan ke aplikasi TopUp Game dengan desain yang konsisten dan UX yang baik. Toast muncul di **pojok kanan atas** dengan animasi smooth dan styling yang matching dengan theme aplikasi.

## ✅ **Implemented Features**

### **1. 🎨 Custom Toast Component**
- ✅ **Konsisten Design**: Dark theme dengan glass morphism effect
- ✅ **4 Jenis Toast**: Success (hijau), Error (merah), Info (cyan), Warning (orange)
- ✅ **Icon Integration**: Ionicons dengan warna yang sesuai
- ✅ **Responsive**: Adaptif dengan berbagai ukuran layar
- ✅ **Professional Animation**: Smooth slide-in/out effect

### **2. 🔧 Toast Service**
- ✅ **Easy to Use**: Simple API untuk semua jenis toast
- ✅ **Smart Error Handling**: Automatic Supabase error parsing
- ✅ **Duration Control**: Custom duration untuk setiap jenis
- ✅ **Tap to Dismiss**: Click toast untuk hide

### **3. 🎯 Integration Points**

| **Page** | **Use Cases** |
|----------|---------------|
| **Login** | ✅ Form validation, Auth errors, Success login/register |
| **Profile** | ✅ Logout success/error |
| **Home** | ✅ Search results, Game selection feedback |
| **GameDetail** | ✅ Top-up validation, Purchase success/error |

## 🚀 **Usage Examples**

### **Basic Usage**
```typescript
import { toastService } from '../services/toastService';

// Success toast
toastService.showSuccess('Berhasil!', 'Operasi berhasil dilakukan');

// Error toast
toastService.showError('Error!', 'Terjadi kesalahan sistem');

// Info toast
toastService.showInfo('Info', 'Informasi penting');

// Warning toast
toastService.showWarning('Peringatan', 'Harap perhatikan hal ini');
```

### **Authentication Specific**
```typescript
// Smart auth error parsing
toastService.showAuthError(error);

// Network error
toastService.showNetworkError();

// Auth success
toastService.showAuthSuccess('login'); // 'login' | 'register' | 'logout'
```

### **Advanced Usage**
```typescript
// Hide current toast
toastService.hide();

// Form validation example
if (!email || !password) {
  toastService.showError('Form Tidak Lengkap', 'Email dan password harus diisi');
  return;
}

// Success with delay
toastService.showSuccess('Login Berhasil', 'Selamat datang kembali!');
setTimeout(() => {
  navigation.replace('MainTabs');
}, 1000); // Show toast before navigation
```

## 🎨 **Visual Design**

### **Toast Styles**
- **Background**: Semi-transparent dengan backdrop blur
- **Border**: Left border dengan accent color
- **Shadow**: Consistent dengan app theme
- **Icons**: 24px Ionicons dengan semantic colors
- **Typography**: 16px title, 14px subtitle dengan white text
- **Position**: Top-right dengan 50px top offset
- **Animation**: Smooth slide dengan spring animation

### **Color Scheme**
| Type | Background | Border | Icon |
|------|------------|--------|------|
| Success | `rgba(34, 197, 94, 0.95)` | `#22c55e` | `checkmark-circle` |
| Error | `rgba(239, 68, 68, 0.95)` | `#ef4444` | `close-circle` |
| Info | `rgba(0, 188, 212, 0.95)` | `#00bcd4` | `information-circle` |
| Warning | `rgba(245, 158, 11, 0.95)` | `#f59e0b` | `warning` |

## 🔧 **Configuration**

### **Toast Config in App.tsx**
```typescript
const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <CustomToast type="success" text1={text1} text2={text2} {...rest} />
  ),
  error: ({ text1, text2, ...rest }) => (
    <CustomToast type="error" text1={text1} text2={text2} {...rest} />
  ),
  // ... other types
};

<Toast 
  config={toastConfig}
  position="top"
  topOffset={50}
/>
```

### **Duration Settings**
- **Success**: 3000ms (3 seconds)
- **Error**: 4000ms (4 seconds) - longer for errors
- **Info**: 3000ms
- **Warning**: 3500ms

## 🧪 **Testing**

### **Development Mode**
- ✅ **ToastTester Component**: Available in Profile page (`__DEV__` only)
- ✅ **6 Test Cases**: All toast types + special auth/network errors
- ✅ **Hide Functionality**: Test manual dismissal

### **Test Cases Included**
1. **Success Toast**: Basic success message
2. **Error Toast**: Generic error message
3. **Info Toast**: Information display
4. **Warning Toast**: Warning message
5. **Auth Error**: Simulated login error
6. **Network Error**: Connection error

## 📱 **Real-world Scenarios**

### **Login Flow**
```typescript
// Validation errors
toastService.showError('Form Tidak Lengkap', 'Email dan password harus diisi');

// Auth errors (smart parsing)
if (error.message.includes('Invalid login credentials')) {
  // Shows: "Login Gagal" - "Email atau password salah"
}

// Success
toastService.showAuthSuccess('login');
// Shows: "Login Berhasil" - "Selamat datang kembali!"
```

### **Top-up Flow**
```typescript
// Processing
toastService.showInfo('Memproses Pembayaran', 'Tunggu sebentar...');

// Success after 2 seconds
setTimeout(() => {
  toastService.showSuccess(
    'Top-up Berhasil!', 
    `${selectedProduct.label} berhasil dibeli ke ID ${userId}`
  );
}, 2000);
```

### **Search Flow**
```typescript
// No results
if (filtered.length === 0) {
  toastService.showInfo(
    'Game Tidak Ditemukan',
    `Tidak ada game dengan nama "${text}"`
  );
}

// Single result
else if (filtered.length === 1) {
  toastService.showSuccess(
    'Game Ditemukan!',
    `Menampilkan hasil untuk "${text}"`
  );
}
```

## 🚀 **Production Benefits**

### **User Experience**
- ✅ **Non-intrusive**: Toast doesn't block UI interaction
- ✅ **Informative**: Clear messages with context
- ✅ **Consistent**: Same look & feel across all pages
- ✅ **Accessible**: High contrast, readable text
- ✅ **Dismissible**: Tap to close functionality

### **Developer Experience**
- ✅ **Simple API**: One import, multiple methods
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Smart Defaults**: Sensible duration and positioning
- ✅ **Error Parsing**: Automatic Supabase error handling
- ✅ **Testing Tools**: Built-in testing component

### **Performance**
- ✅ **Lightweight**: Only 1 external dependency
- ✅ **Optimized**: No unnecessary re-renders
- ✅ **Memory Efficient**: Auto cleanup after duration
- ✅ **Smooth Animations**: Hardware accelerated

## 🎯 **Future Enhancements**

### **Potential Additions**
- 🔲 **Progress Toast**: For long-running operations
- 🔲 **Action Toast**: With buttons (Retry, Cancel)
- 🔲 **Persistent Toast**: For critical messages
- 🔲 **Queue System**: Multiple toasts management
- 🔲 **Custom Positioning**: Bottom, center options
- 🔲 **Sound Effects**: Audio feedback
- 🔲 **Haptic Feedback**: Vibration on important toasts

### **Advanced Features**
- 🔲 **Swipe to Dismiss**: Gesture support
- 🔲 **Custom Icons**: Per-message icon override
- 🔲 **Rich Content**: HTML/Markdown support
- 🔲 **Offline Support**: Queue toasts for later
- 🔲 **Analytics**: Track toast interaction

## 📞 **Usage Guidelines**

### **When to Use Each Type**

| Type | Use For |
|------|---------|
| **Success** | ✅ Completed actions, confirmations |
| **Error** | ❌ Failures, validation errors, exceptions |
| **Info** | ℹ️ Neutral information, status updates |
| **Warning** | ⚠️ Important notices, cautions |

### **Best Practices**
1. **Keep messages short** - Max 2 lines
2. **Be specific** - "Email tidak valid" vs "Form error"
3. **Use consistent tone** - Friendly but professional
4. **Don't spam** - One toast at a time
5. **Context matters** - Different messages for different scenarios

**Toast Notification System is now fully integrated and ready for production! 🎉** 