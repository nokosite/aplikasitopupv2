import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      toastService.showError('Form Tidak Lengkap', 'Email dan password harus diisi');
      return;
    }

    if (!isLogin && !name) {
      toastService.showError('Form Tidak Lengkap', 'Nama harus diisi untuk registrasi');
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        toastService.showAuthError(result.error);
      } else {
        if (isLogin) {
          toastService.showAuthSuccess('login');
          setTimeout(() => {
            navigation.replace('Home');
          }, 1000); // Delay to show success toast
        } else {
          toastService.showAuthSuccess('register');
          setTimeout(() => {
            setIsLogin(true);
            resetForm();
          }, 2000); // Delay to show success toast
        }
      }
    } catch (error: any) {
      if (error.message?.includes('fetch')) {
        toastService.showNetworkError();
      } else {
        toastService.showError('Terjadi Kesalahan', error.message || 'Silakan coba lagi');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e2e" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Icon name="game-controller" size={60} color="#00bcd4" />
          <Text style={styles.title}>
            {isLogin ? 'Masuk' : 'Daftar Akun'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin 
              ? 'Masuk untuk melanjutkan top-up game favoritmu' 
              : 'Buat akun baru untuk mulai top-up game'
            }
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nama lengkap"
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={20} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-closed-outline" size={20} color="#aaa" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon 
                name={showPassword ? "eye-outline" : "eye-off-outline"} 
                size={20} 
                color="#aaa" 
              />
            </TouchableOpacity>
          </View>

          {/* Login/Register Button */}
          <TouchableOpacity
            style={[styles.authButton, isLoading && styles.authButtonDisabled]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.authButtonText}>
                {isLogin ? 'Masuk' : 'Daftar'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Forgot Password */}
          {isLogin && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Toggle Login/Register */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.toggleButtonText}>
              {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Debug & Demo Buttons */}
        <View style={styles.debugContainer}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={styles.skipButtonText}>Skip Login (Demo)</Text>
          </TouchableOpacity>

          {__DEV__ && (
            <TouchableOpacity 
              style={styles.debugButton}
              onPress={() => navigation.navigate('SupabaseDebug')}
            >
              <Icon name="bug" size={16} color="#00bcd4" />
              <Text style={styles.debugButtonText}>Debug Supabase</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 14,
  },
  showPasswordButton: {
    padding: 4,
  },
  authButton: {
    backgroundColor: '#00bcd4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#00bcd4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  authButtonDisabled: {
    opacity: 0.7,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: '#00bcd4',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    color: '#aaa',
    fontSize: 16,
    marginRight: 8,
  },
  toggleButtonText: {
    color: '#00bcd4',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  skipButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
  debugContainer: {
    gap: 12,
  },
  debugButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.3)',
  },
  debugButtonText: {
    color: '#00bcd4',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
}); 