import React from 'react';
import OnboardingSwiper from '../components/organisms/OnboardingSwiper';
import { StackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  return <OnboardingSwiper navigation={navigation} />;
};

export default OnboardingScreen;
