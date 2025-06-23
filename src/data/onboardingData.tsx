// src/data/onboardingData.tsx

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: any;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Top-Up Game Cepat',
    description: 'Isi ulang game favoritmu dengan cepat dan aman.',
    image: require('../assets/promo.jpg'),
  },
  {
    id: '2',
    title: 'Banyak Pilihan Game',
    description: 'Tersedia berbagai game populer seperti ML, FF, dan lainnya.',
    image: require('../assets/promo.jpg'),
  },
  {
    id: '3',
    title: 'Transaksi Aman',
    description: 'Pembayaran mudah dan data kamu tetap aman.',
    image: require('../assets/promo.jpg'),
  },
];
  