import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import OnboardingImage from '../molecules/OnboardingImage';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingSwiper: React.FC<Props> = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: '#fff',
          image: <OnboardingImage source={require('../../assets/promo.jpg')} />,
          title: 'Selamat Datang!',
          subtitle: 'Aplikasi TopUp Voucher siap kamu pakai 🚀',
        },
        {
          backgroundColor: '#fdeb93',
          image: <OnboardingImage source={require('../../assets/promo.jpg')} />,
          title: 'Cepat & Mudah',
          subtitle: 'Top up tanpa ribet langsung dari ponselmu',
        },
        {
          backgroundColor: '#e9bcbe',
          image: <OnboardingImage source={require('../../assets/promo.jpg')} />,
          title: 'Ayo Mulai!',
          subtitle: 'Klik Get Started untuk masuk ke aplikasi',
        },
      ]}
    />
  );
};

export default OnboardingSwiper;
