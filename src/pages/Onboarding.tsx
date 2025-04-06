import React from 'react';
import { View } from 'react-native';
import OnboardingSwiper from '../components/organisms/OnboardingSwiper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <OnboardingSwiper navigation={navigation} />
    </View>
  );
};

export default OnboardingScreen;
