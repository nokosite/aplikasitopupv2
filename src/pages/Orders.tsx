import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import TabBar from '../components/organisms/TabBar';
import Icon from 'react-native-vector-icons/Ionicons';

interface Order {
  id: string;
  gameName: string;
  productName: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  userId: string;
}

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'success' | 'pending' | 'failed'>('all');

  // Sample order data
  const orders: Order[] = [
    {
      id: '1',
      gameName: 'Mobile Legends',
      productName: '86 Diamond',
      amount: 12000,
      status: 'success',
      date: '2025-01-15',
      userId: '123456789',
    },
    {
      id: '2',
      gameName: 'Free Fire',
      productName: '70 Diamond',
      amount: 10000,
      status: 'pending',
      date: '2025-01-14',
      userId: '987654321',
    },
    {
      id: '3',
      gameName: 'Valorant',
      productName: '125 VP',
      amount: 15000,
      status: 'success',
      date: '2025-01-13',
      userId: '456789123',
    },
    {
      id: '4',
      gameName: 'Mobile Legends',
      productName: '172 Diamond',
      amount: 24000,
      status: 'failed',
      date: '2025-01-12',
      userId: '789123456',
    },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'failed': return '#F44336';
      default: return '#aaa';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Berhasil';
      case 'pending': return 'Pending';
      case 'failed': return 'Gagal';
      default: return status;
    }
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.gameName}>{item.gameName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.userId}>ID: {item.userId}</Text>
      
      <View style={styles.orderFooter}>
        <Text style={styles.orderDate}>{item.date}</Text>
        <Text style={styles.orderAmount}>Rp {item.amount.toLocaleString('id-ID')}</Text>
      </View>
    </TouchableOpacity>
  );

  const tabs = [
    { key: 'all', label: 'Semua' },
    { key: 'success', label: 'Berhasil' },
    { key: 'pending', label: 'Pending' },
    { key: 'failed', label: 'Gagal' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Icon name="receipt-outline" size={64} color="#666" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Belum ada transaksi</Text>
          <Text style={styles.emptySubtitle}>
            Transaksi Anda akan muncul di sini
          </Text>
        </View>
      )}
      <TabBar activeTab="Orders" />
    </SafeAreaView>
  );
};

export default Orders;

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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#00bcd4',
  },
  tabText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 14,
    color: '#00bcd4',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 12,
    color: '#aaa',
  },
  orderAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
}); 