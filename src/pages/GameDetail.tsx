// src/pages/GameDetail.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { glassStyles } from '../styles/glassStyles';

type Props = {
  route: RouteProp<RootStackParamList, 'GameDetail'>;
  navigation: any;
};

const GameDetail: React.FC<Props> = ({ route, navigation }) => {
  const { game } = route.params;

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity style={glassStyles.glassCard}>
      <Text style={styles.productLabel}>{item.label}</Text>
      <Text style={styles.productPrice}>Rp{item.price.toLocaleString('id-ID')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={game.image} style={styles.gameImage} />
      <Text style={styles.title}>{game.name}</Text>
      <Text style={styles.subtitle}>Pilih jumlah top-up kamu:</Text>

      <FlatList
        data={game.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default GameDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e2e',
  },
  gameImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 16,
  },
  productLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  productPrice: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
});
