import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/gameData';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const featuredGames = games.filter((game) => game.populer);
  const allGames = games;

  const renderGameCard = (game: any) => (
    <TouchableOpacity
      key={game.id}
      style={styles.card}
      onPress={() => navigation.navigate('GameDetail', { game })}
    >
      <Image source={game.image} style={styles.image} />
      <Text style={styles.name}>{game.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🔥 Produk Unggulan</Text>
      <FlatList
        data={featuredGames}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGameCard(item)}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.sectionTitle}>🎮 Semua Game</Text>
      <FlatList
        data={allGames}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGameCard(item)}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 24,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 10,
    margin: 6,
    alignItems: 'center',
    width: 160,
    filter: 'blur(10px',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
