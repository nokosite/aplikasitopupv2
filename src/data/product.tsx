// src/data/products.ts

export type Product = {
    id: string;
    name: string;
    image: any; // pakai require()
    isFeatured: boolean;
  };
  
  export const products: Product[] = [
    {
      id: 'freefire',
      name: 'Free Fire',
      image: require('../assets/games/freefire.jpg'),
      isFeatured: true,
    },
    {
      id: 'mobilelegends',
      name: 'Mobile Legends',
      image: require('../assets/games/mobilelegends.jpg'),
      isFeatured: true,
    },
    {
      id: 'pubg',
      name: 'PUBG Mobile',
      image: require('../assets/games/pubg.jpg'),
      isFeatured: false,
    },
    {
      id: 'valorant',
      name: 'Valorant',
      image: require('../assets/games/valorant.jpg'),
      isFeatured: false,
    },
  ];
  