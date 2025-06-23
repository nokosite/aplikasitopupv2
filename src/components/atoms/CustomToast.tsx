import React from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning';
  text1: string;
  text2?: string;
  onPress?: () => void;
}

export const CustomToast: React.FC<CustomToastProps> = ({ 
  type, 
  text1, 
  text2 
}) => {
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(34, 197, 94, 0.95)', // Green with transparency
          borderColor: '#22c55e',
          icon: 'checkmark-circle',
          iconColor: '#ffffff',
        };
      case 'error':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.95)', // Red with transparency
          borderColor: '#ef4444',
          icon: 'close-circle',
          iconColor: '#ffffff',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.95)', // Orange with transparency
          borderColor: '#f59e0b',
          icon: 'warning',
          iconColor: '#ffffff',
        };
      case 'info':
      default:
        return {
          backgroundColor: 'rgba(0, 188, 212, 0.95)', // Cyan with transparency
          borderColor: '#00bcd4',
          icon: 'information-circle',
          iconColor: '#ffffff',
        };
    }
  };

  const config = getToastConfig();

  return (
    <View style={[styles.container, { 
      backgroundColor: config.backgroundColor,
      borderLeftColor: config.borderColor,
    }]}>
      {/* Backdrop blur effect */}
      <View style={styles.backdrop} />
      
      <View style={styles.content}>
        <Icon 
          name={config.icon} 
          size={24} 
          color={config.iconColor}
          style={styles.icon}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.text1} numberOfLines={2}>
            {text1}
          </Text>
          {text2 && (
            <Text style={styles.text2} numberOfLines={2}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    // Use boxShadow for web compatibility
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    } : {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    }),
    overflow: 'hidden',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  text2: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
}); 