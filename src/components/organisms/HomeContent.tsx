import React from 'react';
import { View, StyleSheet } from 'react-native';
import Title from '../atoms/Title';
import PromoCard from '../molecules/PromoCard';
import Button from '../atoms/Button';
import { useNavigation } from '@react-navigation/native';

const HomeContent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Title>Halo, Selamat Datang!</Title>
      <PromoCard />
      <Button title="Mulai Top Up" onPress={() => navigation.navigate('Topup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default HomeContent;
