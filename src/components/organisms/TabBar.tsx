import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabBarProps {
  activeTab: 'Home' | 'Orders' | 'Profile';
}

const TabBar: React.FC<TabBarProps> = ({ activeTab }) => {
  const navigation = useNavigation();

  const tabs = [
    { 
      name: 'Home', 
      label: 'Beranda', 
      iconActive: 'home',
      iconInactive: 'home-outline'
    },
    { 
      name: 'Orders', 
      label: 'Transaksi', 
      iconActive: 'receipt',
      iconInactive: 'receipt-outline'
    },
    { 
      name: 'Profile', 
      label: 'Profile', 
      iconActive: 'person',
      iconInactive: 'person-outline'
    },
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
            <Icon 
              name={isActive ? tab.iconActive : tab.iconInactive}
              size={24}
              color={isActive ? '#00bcd4' : '#666'}
              style={styles.tabIcon}
            />
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
    elevation: 8, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 