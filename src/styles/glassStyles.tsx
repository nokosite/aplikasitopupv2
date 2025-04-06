// src/styles/glassStyles.ts
import { StyleSheet } from 'react-native';

export const glassStyles = StyleSheet.create({
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    backdropFilter: 'blur(10px)', // opsional jika pakai web atau pakai expo-blur
  },
});
