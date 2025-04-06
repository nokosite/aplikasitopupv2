import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  source: ImageSourcePropType;
};

const OnboardingImage = ({ source }: Props) => {
  return <Image source={source} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default OnboardingImage;
