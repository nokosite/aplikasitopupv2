import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  source: any;
}

const OnboardingImage: React.FC<Props> = ({ source }) => {
  return <Image source={source} style={styles.image} />;
};

export default OnboardingImage;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
