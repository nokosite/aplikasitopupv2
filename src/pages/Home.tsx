import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { games } from '../data/gameData';
import { styles } from '../styles/homeStyles';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const featuredGames = games.filter((game) => game.populer);

  const renderGameCard = (game: any, isFeatured = false) => (
    <TouchableOpacity
      key={game.id}
      style={[styles.card, isFeatured && styles.featuredCard]}
      onPress={() => navigation.navigate('GameDetail', { game })}
    >
      <Image source={game.image} style={[styles.image, isFeatured && styles.featuredImage]} />
      <Text style={styles.name}>{game.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TopUp Voucher Game</Text>

      <Text style={styles.sectionTitle}>🔥 Produk Unggulan</Text>
      <FlatList
        data={featuredGames}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGameCard(item, true)}
        contentContainerStyle={{ paddingBottom: 8 }}
      />

      <Text style={styles.sectionTitle}>🎮 Semua Game</Text>
      <FlatList
        data={games}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGameCard(item)}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default Home;
