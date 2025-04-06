// src/pages/Onboarding.tsx
import React from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dot = ({ selected }: { selected: boolean }) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 4,
        borderRadius: 4,
        backgroundColor: selected ? '#fff' : 'rgba(255, 255, 255, 0.3)',
      }}
    />
  );
};

const OnboardingButton = ({ title, ...props }) => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      DotComponent={Dot}
      SkipButtonComponent={(props) => <OnboardingButton title="Skip" {...props} />}
      NextButtonComponent={(props) => <OnboardingButton title="Next" {...props} />}
      DoneButtonComponent={(props) => <OnboardingButton title="Done" {...props} />}
      pages={[
        {
          backgroundColor: '#1e1e2e',
          image: <Image source={require('../assets/promo.jpg')} style={styles.image} />,
          title: 'Top-Up Game Cepat',
          subtitle: 'Isi ulang game favoritmu dengan cepat dan aman.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#1e1e2e',
          image: <Image source={require('../assets/promo.jpg')} style={styles.image} />,
          title: 'Banyak Pilihan Game',
          subtitle: 'Tersedia berbagai game populer seperti ML, FF, dan lainnya.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
        {
          backgroundColor: '#1e1e2e',
          image: <Image source={require('../assets/promo.jpg')} style={styles.image} />,
          title: 'Transaksi Aman',
          subtitle: 'Pembayaran mudah dan data kamu tetap aman.',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
    maxWidth: 300,
    textAlign: 'center',
  },
});
