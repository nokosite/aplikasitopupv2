import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/gameData';
import TabBar from '../components/organisms/TabBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { toastService } from '../services/toastService';
import { orderService } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';

import { styles } from '../styles/homeStyles';
import { styles as homeStyles } from '../styles/homeStyles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  const featuredGames = games.filter((game) => game.populer);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGames(filtered);
      
      // Show toast if no results found
      if (filtered.length === 0) {
        toastService.showInfo(
          'Game Tidak Ditemukan',
          `Tidak ada game dengan nama "${text}"`
        );
      } else if (filtered.length === 1) {
        toastService.showSuccess(
          'Game Ditemukan!',
          `Menampilkan hasil untuk "${text}"`
        );
      }
    }
  };

  const renderGameCard = (game: any, isFeatured = false) => (
    <TouchableOpacity
      key={game.id}
      style={[homeStyles.card, isFeatured && homeStyles.featuredCard]}
      onPress={() => {
        toastService.showInfo(
          'Membuka Game',
          `Memuat halaman top-up ${game.name}`
        );
        navigation.navigate('GameDetail', { game });
      }}
    >
      <Image
        source={game.image}
        style={[homeStyles.image, isFeatured && homeStyles.featuredImage]}
      />
      <Text style={homeStyles.name}>{game.name}</Text>
    </TouchableOpacity>
  );

  const showFeatured = search.trim() === '';
  const showAllGames = search.trim() === '' ? games : filteredGames;

  // Dev function to create sample orders for testing
  const createSampleOrders = async () => {
    if (!user) {
      toastService.showError('Error', 'User not logged in');
      return;
    }

    try {
      await orderService.createSampleOrders(user.id);
      toastService.showSuccess('Success', 'Sample orders created! Check Orders tab.');
    } catch (error) {
      console.error('Error creating sample orders:', error);
      toastService.showError('Error', 'Failed to create sample orders');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hai,</Text>
        <Text style={styles.username}>Mahes 👋</Text>
        <Text style={styles.subtitle}>
          Mau top up game favoritmu hari ini?
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
          <Icon 
            name="search-outline" 
            size={20} 
            color="#aaa" 
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Cari game..."
            placeholderTextColor="#aaa"
            style={styles.searchInput}
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.view}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {showFeatured && (
          <>
            <View style={styles.sectionHeader}>
              <Icon name="flame" size={20} color="#FF6B6B" />
              <Text style={styles.sectionTitle}>Produk Unggulan</Text>
            </View>
            <FlatList
              data={featuredGames}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderGameCard(item, true)}
              contentContainerStyle={styles.featuredContainer}
            />
          </>
        )}

        <View style={styles.sectionHeader}>
          <Icon name="game-controller" size={20} color="#00bcd4" />
          <Text style={styles.sectionTitle2}>Semua Game</Text>
        </View>
        <FlatList
          data={showAllGames}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderGameCard(item)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 0,
          }}
          contentContainerStyle={styles.gamesContainer}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />

        {/* Development Tools - Only in development mode */}
        {__DEV__ && user && (
          <View style={styles.devSection}>
            <Text style={styles.devTitle}>🔧 Dev Tools</Text>
            <TouchableOpacity style={styles.devButton} onPress={createSampleOrders}>
              <Text style={styles.devButtonText}>Create Sample Orders</Text>
            </TouchableOpacity>
          </View>
        )}
        </ScrollView>
      
      <TabBar activeTab="Home" />
    </SafeAreaView>
  );
};



export default Home;
