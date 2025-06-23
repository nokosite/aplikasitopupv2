// src/pages/Onboarding.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Animated,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { onboardingData } from '../data/onboardingData';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
  icon: string;
  color: string;
}

const enhancedOnboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Top-Up Game Tercepat',
    description: 'Isi ulang diamond dan voucher game favoritmu hanya dalam hitungan detik. Proses otomatis dan instan!',
    image: require('../assets/promo.jpg'),
    icon: 'flash',
    color: '#00bcd4',
  },
  {
    id: '2',
    title: 'Semua Game Favoritmu',
    description: 'Mobile Legends, Free Fire, PUBG Mobile, Valorant, dan ratusan game lainnya tersedia di sini.',
    image: require('../assets/promo.jpg'),
    icon: 'game-controller',
    color: '#FF6B6B',
  },
  {
    id: '3',
    title: 'Pembayaran Aman & Mudah',
    description: 'Berbagai metode pembayaran tersedia dengan sistem keamanan terdepan. Transaksi dijamin aman 100%.',
    image: require('../assets/promo.jpg'),
    icon: 'shield-checkmark',
    color: '#4CAF50',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < enhancedOnboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
      setCurrentIndex(prevIndex);
    }
  };

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => {
    return (
      <View style={styles.slide}>
        {/* Icon Container with Animated Background */}
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
            <Icon name={item.icon} size={60} color="#fff" />
          </View>
          
          {/* Decorative Elements */}
          <View style={[styles.decorativeCircle1, { backgroundColor: item.color + '30' }]} />
          <View style={[styles.decorativeCircle2, { backgroundColor: item.color + '20' }]} />
          <View style={[styles.decorativeCircle3, { backgroundColor: item.color + '10' }]} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {enhancedOnboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: index === currentIndex ? '#00bcd4' : '#666',
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1e2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MK STORE</Text>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Lewati</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={enhancedOnboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        scrollEventThrottle={16}
      />

      {/* Pagination */}
      {renderPagination()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        {currentIndex > 0 && (
          <TouchableOpacity onPress={handlePrevious} style={styles.previousButton}>
            <Icon name="chevron-back" size={24} color="#00bcd4" />
            <Text style={styles.previousText}>Sebelumnya</Text>
          </TouchableOpacity>
        )}
        
        <View style={styles.spacer} />
        
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentIndex === enhancedOnboardingData.length - 1 ? 'Mulai' : 'Lanjut'}
          </Text>
          <Icon 
            name={currentIndex === enhancedOnboardingData.length - 1 ? 'rocket' : 'chevron-forward'} 
            size={24} 
            color="#fff" 
            style={styles.nextIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00bcd4',
    letterSpacing: 1,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  skipText: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 280,
    height: 280,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: 40,
    left: 40,
    zIndex: -1,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    top: 15,
    right: 15,
    zIndex: -2,
  },
  decorativeCircle3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: 20,
    left: 20,
    zIndex: -3,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  previousButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0,188,212,0.1)',
    borderWidth: 1,
    borderColor: '#00bcd4',
  },
  previousText: {
    color: '#00bcd4',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spacer: {
    flex: 1,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    backgroundColor: '#00bcd4',
    elevation: 4,
    shadowColor: '#00bcd4',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  nextIcon: {
    marginLeft: 4,
  },
});
