// src/data/gameData.ts
export const games = [
    {
      id: 'ml',
      name: 'Mobile Legends',
      image: require('../assets/games/mlbb.jpg'),
      populer: true,
      products: [
        { id: '1', label: '86 Diamond', price: 12000 },
        { id: '2', label: '172 Diamond', price: 24000 },
      ],
    },
    {
      id: 'freefire',
      name: 'Free Fire',
      image: require('../assets/games/freefire.jpg'),
      populer: true,
      products: [
        { id: '1', label: '70 Diamond', price: 10000 },
        { id: '2', label: '140 Diamond', price: 20000 },
      ],
    },
    {
      id: 'valorant',
      name: 'Valorant',
      image: require('../assets/games/valo.jpg'),
      populer: true,
      products: [
        { id: '1', label: '125 VP', price: 15000 },
        { id: '2', label: '250 VP', price: 30000 },
      ],
    },
  ];
  