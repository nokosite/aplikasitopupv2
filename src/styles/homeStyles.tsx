import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingHorizontal: 16, // ← lebih kecil supaya pas di semua device
    backgroundColor: '#1e1e2e',
  },
  view: {
    padding: 0, // ← dihapus supaya nggak dobel padding
  },

  // Header Area
  header: {
    marginBottom: 20,
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

  // Search Input
  searchInput: {
    backgroundColor: '#2e2e3e',
    color: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  // Section Titles
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  sectionTitle2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },

  // Card Style
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    width: (width - 16 * 2 - 12) / 2, // ← hitungan supaya pas 2 kolom
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  featuredCard: {
    width: width * 0.4,
    marginRight: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // Gambar Game
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 10,
  },
  featuredImage: {
    width: 120,
    height: 120,
  },

  // Nama Game
  name: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
