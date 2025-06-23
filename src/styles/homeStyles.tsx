import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

// Calculated sizes for game cards
const gameCardWidth = (width - 20 * 2 - 16) / 2; // Two cards per row with margins and gap
const gameCardHeight = gameCardWidth * 1.2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    backgroundColor: '#1e1e2e',
    paddingBottom: 70, // space untuk tab bar
  },
  view: {
    flex: 1,
  },

  // Header Area
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  username: {
    fontSize: 28,
    color: '#00bcd4',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 4,
  },

  // Search Container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e3e',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },

  // Section Titles
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  sectionTitle2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },

  // Featured Games Container
  featuredContainer: {
    paddingLeft: 20,
    paddingRight: 4, // Small padding for last item
    paddingBottom: 16,
  },

  // Games Grid Container
  gamesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // Card Style
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    width: (width - 20 * 2 - 16) / 2, // Proper calculation with 20px margins and 16px gap
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  featuredCard: {
    width: width * 0.4,
    marginRight: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
  },

  // Gambar Game
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  featuredImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  // Nama Game
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },


  
  // Development Tools Styles
  devSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 193, 7, 0.3)',
  },
  devTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 12,
  },
  devButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  devButtonText: {
    color: '#1e1e2e',
    fontWeight: '600',
    fontSize: 14,
  },
});
