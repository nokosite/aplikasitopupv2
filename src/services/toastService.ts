import Toast from 'react-native-toast-message';

class ToastService {
  // Show success toast
  showSuccess(title: string, message?: string) {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
      onPress: () => Toast.hide(),
    });
  }

  // Show error toast
  showError(title: string, message?: string) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: 4000, // Longer for errors
      autoHide: true,
      topOffset: 50,
      onPress: () => Toast.hide(),
    });
  }

  // Show info toast
  showInfo(title: string, message?: string) {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50,
      onPress: () => Toast.hide(),
    });
  }

  // Show warning toast
  showWarning(title: string, message?: string) {
    Toast.show({
      type: 'warning',
      text1: title,
      text2: message,
      visibilityTime: 3500,
      autoHide: true,
      topOffset: 50,
      onPress: () => Toast.hide(),
    });
  }

  // Hide current toast
  hide() {
    Toast.hide();
  }

  // Helper method untuk authentication errors
  showAuthError(error: any) {
    console.log('🔍 Parsing auth error:', error);
    
    let title = 'Login Gagal';
    let message = 'Terjadi kesalahan saat login';

    if (error?.message) {
      const errorMsg = error.message.toLowerCase();
      
      // Parse common Supabase auth errors
      if (errorMsg.includes('invalid login credentials')) {
        title = 'Login Gagal';
        message = 'Email atau password salah';
      } else if (errorMsg.includes('email not confirmed')) {
        title = 'Email Belum Diverifikasi';
        message = 'Silakan cek email untuk verifikasi akun';
      } else if (errorMsg.includes('user not found')) {
        title = 'Akun Tidak Ditemukan';
        message = 'Email belum terdaftar';
      } else if (errorMsg.includes('password should be') || errorMsg.includes('password must be')) {
        title = 'Password Tidak Valid';
        message = 'Password minimal 6 karakter';
      } else if (errorMsg.includes('unable to validate email') || errorMsg.includes('invalid email')) {
        title = 'Email Tidak Valid';
        message = 'Format email tidak sesuai';
      } else if (errorMsg.includes('user already registered') || errorMsg.includes('already registered')) {
        title = 'Email Sudah Terdaftar';
        message = 'Gunakan email lain atau login';
      } else if (errorMsg.includes('signup is disabled')) {
        title = 'Registrasi Dinonaktifkan';
        message = 'Registrasi user baru tidak diizinkan';
      } else if (errorMsg.includes('email address not authorized')) {
        title = 'Email Tidak Diizinkan';
        message = 'Domain email tidak diizinkan untuk registrasi';
      } else if (error.status === 400) {
        title = 'Data Tidak Valid';
        message = 'Periksa kembali data yang dimasukkan';
      } else {
        title = 'Error Autentikasi';
        message = error.message;
      }
    } else if (error?.status) {
      title = `Error ${error.status}`;
      message = 'Terjadi kesalahan pada server';
    }

    console.log('📝 Showing auth error:', { title, message });
    this.showError(title, message);
  }

  // Helper method untuk network errors
  showNetworkError() {
    this.showError(
      'Koneksi Bermasalah',
      'Periksa koneksi internet Anda dan coba lagi'
    );
  }

  // Helper method untuk success actions
  showAuthSuccess(action: 'login' | 'register' | 'logout') {
    const messages = {
      login: {
        title: 'Login Berhasil',
        message: 'Selamat datang kembali!'
      },
      register: {
        title: 'Registrasi Berhasil',
        message: 'Akun telah dibuat, silakan login'
      },
      logout: {
        title: 'Logout Berhasil',
        message: 'Sampai jumpa lagi!'
      }
    };

    const msg = messages[action];
    this.showSuccess(msg.title, msg.message);
  }
}

export const toastService = new ToastService(); 