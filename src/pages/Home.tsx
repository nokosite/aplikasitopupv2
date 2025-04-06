import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/gameData';
import { styles } from '../styles/homeStyles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const featuredGames = games.filter((game) => game.populer);

  const [search, setSearch] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  const renderGameCard = (game: any, isFeatured = false) => (
    <TouchableOpacity
      key={game.id}
      style={[styles.card, isFeatured && styles.featuredCard]}
      onPress={() => navigation.navigate('GameDetail', { game })}
    >
      <Image
        source={game.image}
        style={[styles.image, isFeatured && styles.featuredImage]}
      />
      <Text style={styles.name}>{game.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1e1e2e' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ color: '#fff' }}>Hai Mahes 👋</Text>
        <Text style={styles.heading}>TopUp Voucher Game</Text>

        <TextInput
          placeholder="Cari game..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />

        {search.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>🔍 Hasil Pencarian</Text>
            <FlatList
              key="search"
              data={filteredGames}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderGameCard(item)}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>🔥 Produk Unggulan</Text>
            <FlatList
              key="featured"
              data={featuredGames}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderGameCard(item, true)}
              contentContainerStyle={{ paddingBottom: 8 }}
            />

            <Text style={styles.sectionTitle}>🎮 Semua Game</Text>
            <FlatList
              key="all"
              data={games}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => renderGameCard(item)}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
