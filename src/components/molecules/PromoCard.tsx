import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const PromoCard = () => {
  return (
    <View style={styles.card}>
      <Image source={require('../../assets/promo.jpg')} style={styles.image} />
      <Text style={styles.text}>Promo Spesial Hari Ini!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 8,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PromoCard;
