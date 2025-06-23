import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { toastService } from '../../services/toastService';
import Icon from 'react-native-vector-icons/Ionicons';

// Component untuk testing toast notifications (hanya untuk development)
const ToastTester: React.FC = () => {
  const testCases = [
    {
      id: 'success',
      title: 'Success Toast',
      icon: 'checkmark-circle',
      iconColor: '#22c55e',
      onPress: () => toastService.showSuccess('Berhasil!', 'Operasi berhasil dilakukan'),
    },
    {
      id: 'error',
      title: 'Error Toast',
      icon: 'close-circle',
      iconColor: '#ef4444',
      onPress: () => toastService.showError('Error!', 'Terjadi kesalahan sistem'),
    },
    {
      id: 'info',
      title: 'Info Toast',
      icon: 'information-circle',
      iconColor: '#00bcd4',
      onPress: () => toastService.showInfo('Info', 'Ini adalah informasi penting'),
    },
    {
      id: 'warning',
      title: 'Warning Toast',
      icon: 'warning',
      iconColor: '#f59e0b',
      onPress: () => toastService.showWarning('Peringatan', 'Harap perhatikan hal ini'),
    },
    {
      id: 'auth-error',
      title: 'Auth Error',
      icon: 'lock-closed',
      iconColor: '#ef4444',
      onPress: () => toastService.showAuthError({ message: 'Invalid login credentials' }),
    },
    {
      id: 'network-error',
      title: 'Network Error',
      icon: 'wifi-outline',
      iconColor: '#ef4444',
      onPress: () => toastService.showNetworkError(),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Toast Tester</Text>
      <Text style={styles.subtitle}>Klik untuk test berbagai jenis notifikasi:</Text>
      
      <View style={styles.grid}>
        {testCases.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={styles.testButton}
            onPress={test.onPress}
          >
            <Icon name={test.icon} size={24} color={test.iconColor} />
            <Text style={styles.testButtonText}>{test.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={styles.hideButton}
        onPress={() => toastService.hide()}
      >
        <Icon name="eye-off" size={20} color="#aaa" />
        <Text style={styles.hideButtonText}>Sembunyikan Toast</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToastTester;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  testButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    minWidth: '48%',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  hideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  hideButtonText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
  },
}); 