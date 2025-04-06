import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/gameData';

import { styles } from '../styles/homeStyles';
import { styles as homeStyles } from '../styles/homeStyles';

const Home: React.FC = () => {
  const navigation = useNavigation();
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
    }
  };

  const renderGameCard = (game: any, isFeatured = false) => (
    <TouchableOpacity
      key={game.id}
      style={[homeStyles.card, isFeatured && homeStyles.featuredCard]}
      onPress={() => navigation.navigate('GameDetail', { game })}
    >
      <Image source={game.image} style={[homeStyles.image, isFeatured && homeStyles.featuredImage]} />
      <Text style={homeStyles.name}>{game.name}</Text>
    </TouchableOpacity>
  );

  const showFeatured = search.trim() === '';
  const showAllGames = search.trim() === '' ? games : filteredGames;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>

      <StatusBar barStyle="light-content" backgroundColor="#1e1e2e" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Hai,</Text>
        <Text style={styles.username}>Mahes 👋</Text>
        <Text style={styles.subtitle}>Mau top up game favoritmu hari ini?</Text>
      </View>

      <TextInput
        placeholder="Cari game..."
        placeholderTextColor="#aaa"
        style={styles.searchInput}
        value={search}
        onChangeText={handleSearch}
      />

      {showFeatured && (
        <>
          <Text style={styles.sectionTitle}>🔥 Produk Unggulan</Text>
          <FlatList
            data={featuredGames}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderGameCard(item, true)}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        </>
      )}

      <Text style={styles.sectionTitle2}>🎮 Semua Game</Text>
      <FlatList
        data={showAllGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGameCard(item)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
      </View>
    </SafeAreaView>
  );
};

export default Home;
