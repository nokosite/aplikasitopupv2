// src/navigation/index.tsx
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../pages/Onboarding';
import HomeScreen from '../pages/Home';
import ProfileScreen from '../pages/Profile';
import OrdersScreen from '../pages/Orders';
import GameDetail from '../pages/GameDetail';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Profile: undefined;
  Orders: undefined;
  GameDetail: { game: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom Tab Bar Component (temporary solution)
const CustomTabBar = ({ navigation, state }: any) => {
  const tabs = [
    { name: 'Home', label: 'Beranda', icon: '🏠' },
    { name: 'Orders', label: 'Transaksi', icon: '📋' },
    { name: 'Profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        const isActive = state.index === index;
        
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.name)}
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

// Main Navigation Component
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation, route }) => ({
            headerShown: false,
            // Custom footer for tab simulation
            presentation: 'card',
          })}
        />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="GameDetail" component={GameDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1e1e2e',
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
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

export default Navigation;
