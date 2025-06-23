// Toast notification types
export interface ToastConfig {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
}

export interface ToastState {
  visible: boolean;
  config: ToastConfig | null;
}

export interface ToastContextType {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  toastState: ToastState;
}

// Common toast messages
export const TOAST_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: {
    title: 'Login Berhasil',
    message: 'Selamat datang kembali!'
  },
  LOGIN_FAILED: {
    title: 'Login Gagal',
    message: 'Email atau password salah'
  },
  REGISTER_SUCCESS: {
    title: 'Registrasi Berhasil',
    message: 'Akun telah dibuat, silakan login'
  },
  LOGOUT_SUCCESS: {
    title: 'Logout Berhasil',
    message: 'Sampai jumpa lagi!'
  },
  
  // Form validation
  FORM_INCOMPLETE: {
    title: 'Form Tidak Lengkap',
    message: 'Mohon lengkapi semua field yang diperlukan'
  },
  INVALID_EMAIL: {
    title: 'Email Tidak Valid',
    message: 'Format email tidak sesuai'
  },
  WEAK_PASSWORD: {
    title: 'Password Lemah',
    message: 'Password minimal 6 karakter'
  },
  
  // Network
  NETWORK_ERROR: {
    title: 'Koneksi Bermasalah',
    message: 'Periksa koneksi internet Anda'
  },
  
  // Top-up
  TOPUP_SUCCESS: {
    title: 'Top-up Berhasil',
    message: 'Diamond akan segera masuk ke akun game'
  },
  TOPUP_PROCESSING: {
    title: 'Memproses Pembayaran',
    message: 'Tunggu sebentar...'
  },
  
  // Generic
  SUCCESS: {
    title: 'Berhasil',
    message: 'Operasi berhasil dilakukan'
  },
  ERROR: {
    title: 'Terjadi Kesalahan',
    message: 'Silakan coba lagi'
  }
} as const; 