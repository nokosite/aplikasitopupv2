// src/components/OnBoardingSwiper.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnBoardingImage from '../atoms/OnboardingImage';

interface Props {
  item: {
    title: string;
    description: string;
    image: any;
  };
}

const OnBoardingSwiper: React.FC<Props> = ({ item }) => {
  return (
    <View style={styles.slide}>
      <OnBoardingImage source={item.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default OnBoardingSwiper;

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
});
