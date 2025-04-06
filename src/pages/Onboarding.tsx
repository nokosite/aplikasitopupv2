import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/promo.jpg')} style={{ width: 200, height: 200 }} />,
          title: 'Selamat Datang!',
          subtitle: 'Aplikasi TopUp Voucher siap kamu pakai 🚀',
        },
        {
          backgroundColor: '#fdeb93',
          image: <Image source={require('../assets/promo.jpg')} style={{ width: 200, height: 200 }} />,
          title: 'Cepat & Mudah',
          subtitle: 'Top up tanpa ribet langsung dari ponselmu',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <Image source={require('../assets/promo.jpg')} style={{ width: 200, height: 200 }} />,
          title: 'Ayo Mulai!',
          subtitle: 'Klik Get Started untuk masuk ke aplikasi',
        },
      ]}      
    />
  );
};

export default OnboardingScreen;
