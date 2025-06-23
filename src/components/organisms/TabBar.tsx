import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TabBarProps {
  activeTab: 'Home' | 'Orders' | 'Profile';
}

const TabBar: React.FC<TabBarProps> = ({ activeTab }) => {
  const navigation = useNavigation();

  const tabs = [
    { name: 'Home', label: 'Beranda', icon: '🏠' },
    { name: 'Orders', label: 'Transaksi', icon: '📋' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.name as never)}
          >
            <Text style={[styles.tabIcon, { opacity: isActive ? 1 : 0.6 }]}>
              {tab.icon}
            </Text>
            <Text style={[
              styles.tabLabel, 
              { color: isActive ? '#00bcd4' : '#666' }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1e1e2e',
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 