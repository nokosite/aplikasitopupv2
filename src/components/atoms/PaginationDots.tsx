// src/components/PaginationDots.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  data: any[];
  currentIndex: number;
}

const PaginationDots: React.FC<Props> = ({ data, currentIndex }) => {
  return (
    <View style={styles.container}>
      {data.map((_, i) => (
        <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
      ))}
    </View>
  );
};

export default PaginationDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 14,
    height: 14,
  },
});
