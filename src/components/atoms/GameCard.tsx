// src/components/atoms/GameCard.tsx

import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';

type Props = {
  name: string;
  image: any;
  onPress: () => void;
};

const GameCard: React.FC<Props> = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

export default GameCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  name: {
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});
