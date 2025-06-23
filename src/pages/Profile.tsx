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

const Profile: React.FC = () => {
  const profileData = {
    name: 'Mahes',
    email: 'mahes@example.com',
    phone: '+62 812-3456-7890',
    balance: 250000,
  };

  const menuItems = [
    { id: 1, title: 'Edit Profile', icon: '👤' },
    { id: 2, title: 'Riwayat Transaksi', icon: '📋' },
    { id: 3, title: 'Top Up Saldo', icon: '💰' },
    { id: 4, title: 'Bantuan', icon: '❓' },
    { id: 5, title: 'Tentang Aplikasi', icon: 'ℹ️' },
    { id: 6, title: 'Keluar', icon: '🚪' },
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
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
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
    fontSize: 20,
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 20,
    color: '#aaa',
  },
}); 