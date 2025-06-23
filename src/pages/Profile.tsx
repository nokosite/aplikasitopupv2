import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import TabBar from '../components/organisms/TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { authService } from '../services/authService';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { toastService } from '../services/toastService';
import ToastTester from '../components/atoms/ToastTester';
import SupabaseDebug from '../components/atoms/SupabaseDebug';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();
  
  const profileData = {
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    email: user?.email || 'user@example.com',
    phone: '+62 812-3456-7890',
    balance: 250000,
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            try {
              // Show loading toast
              toastService.showInfo('Logout', 'Sedang keluar dari akun...');
              
              // Sign out from auth service
              await signOut();
              
              // Show success message
              toastService.showAuthSuccess('logout');
              
              // Reset navigation to login screen
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' as never }],
                });
              }, 1500); // Slightly longer delay to show success toast
            } catch (error) {
              console.error('Logout error:', error);
              toastService.showError('Logout Gagal', 'Terjadi kesalahan saat logout. Silakan coba lagi.');
            }
          },
        },
      ]
    );
  };

  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: 'person-circle-outline', color: '#00bcd4' },
    { id: 2, title: 'Riwayat Transaksi', icon: 'receipt-outline', color: '#4CAF50' },
    { id: 3, title: 'Top Up Saldo', icon: 'wallet-outline', color: '#FF9800' },
    { id: 4, title: 'Bantuan', icon: 'help-circle-outline', color: '#9C27B0' },
    { id: 5, title: 'Tentang Aplikasi', icon: 'information-circle-outline', color: '#2196F3' },
    { id: 6, title: 'Keluar', icon: 'log-out-outline', color: '#F44336' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>M</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{profileData.name}</Text>
              <Text style={styles.userEmail}>{profileData.email}</Text>
              <Text style={styles.userPhone}>{profileData.phone}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Saldo Anda</Text>
          <Text style={styles.balanceAmount}>
            Rp {profileData.balance.toLocaleString('id-ID')}
          </Text>
          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpButtonText}>Top Up Saldo</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
                  {/* Development Tools - Hanya untuk development */}
          {__DEV__ && (
            <View style={styles.devToolsCard}>
              <Text style={styles.devToolsTitle}>🔧 Developer Tools</Text>
              
              <TouchableOpacity
                style={styles.debugPageButton}
                onPress={() => navigation.navigate('SupabaseDebug' as never)}
              >
                <Icon name="bug" size={24} color="#00bcd4" />
                <View style={styles.debugPageContent}>
                  <Text style={styles.debugPageTitle}>Supabase Debug Center</Text>
                  <Text style={styles.debugPageSubtitle}>Comprehensive connection testing</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#aaa" />
              </TouchableOpacity>

              <SupabaseDebug />
              <ToastTester />
            </View>
          )}
          
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => {
                if (item.title === 'Keluar') {
                  handleLogout();
                } else if (item.title === 'Riwayat Transaksi') {
                  navigation.navigate('Orders' as never);
                } else {
                  // Handle other menu items
                  console.log(`Pressed: ${item.title}`);
                  toastService.showInfo('Info', `Fitur ${item.title} akan segera hadir`);
                }
              }}
            >
              <View style={styles.menuLeft}>
                <Icon 
                  name={item.icon} 
                  size={24} 
                  color={item.color} 
                  style={styles.menuIcon}
                />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#aaa" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TabBar activeTab="Profile" />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    paddingBottom: 70, // space untuk tab bar
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00bcd4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#aaa',
  },
  editButton: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.3)',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 16,
  },
  topUpButton: {
    backgroundColor: '#00bcd4',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  topUpButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  menuContainer: {
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  devToolsCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.3)',
  },
  devToolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00bcd4',
    marginBottom: 16,
    textAlign: 'center',
  },
  debugPageButton: {
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 188, 212, 0.3)',
  },
  debugPageContent: {
    flex: 1,
    marginLeft: 12,
  },
  debugPageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  debugPageSubtitle: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },

}); 