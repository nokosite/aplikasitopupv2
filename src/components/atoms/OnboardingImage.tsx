// src/components/OnBoardingImage.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  source: any;
}

const OnBoardingImage: React.FC<Props> = ({ source }) => {
  return <Image source={source} style={styles.image} />;
};

export default OnBoardingImage;

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});
