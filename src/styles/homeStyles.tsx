import { StyleSheet, Dimensions } from 'react-native';
import { Platform } from 'react-native';
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },

    greeting: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    searchInput: {
        backgroundColor: '#1e1e1e',
        color: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    heading: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        color: '#ccc',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 20,
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        marginBottom: 14,
        width: (width - 48) / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    featuredCard: {
        width: width * 0.6,
        marginRight: 14,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
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
    name: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
