import React, { useState } from 'react';
import {
    View, Text, Image, StyleSheet,
    FlatList, TouchableOpacity, TextInput, ScrollView, SafeAreaView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { glassStyles } from '../styles/glassStyles';
import PaymentMethod from '../components/molecules/PaymentMethods';
import Icon from 'react-native-vector-icons/Ionicons';
import { toastService } from '../services/toastService';
import { orderService } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';

type Props = {
    route: RouteProp<RootStackParamList, 'GameDetail'>;
    navigation: any;
};

const GameDetail: React.FC<Props> = ({ route, navigation }) => {
    const { game } = route.params;
    const { user } = useAuth();
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [userId, setUserId] = useState('');
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const renderProduct = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={[
                glassStyles.glassCard,
                selectedProduct?.id === item.id && styles.selectedCard
            ]}
            onPress={() => setSelectedProduct(item)}
        >
            <Text style={styles.productLabel}>{item.label}</Text>
            <Text style={styles.productPrice}>Rp{item.price.toLocaleString('id-ID')}</Text>
        </TouchableOpacity>
    );

    const total = selectedProduct ? selectedProduct.price : 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Back Button */}
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    
                    <Image source={game.image} style={styles.gameImage} />
                    <Text style={styles.title}>{game.name}</Text>
                    <Text style={styles.subtitle}>Masukkan ID Akun:</Text>
                    <TextInput
                        placeholder="Contoh: 123456789"
                        style={styles.input}
                        placeholderTextColor="#888"
                        value={userId}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const numericText = text.replace(/[^0-9]/g, '');
                            setUserId(numericText);
                        }}
                    />

                    <Text style={styles.subtitle}>Pilih jumlah top-up kamu:</Text>
                    <FlatList
                        data={game.products}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />

                    <Text style={styles.subtitle}>Metode Pembayaran:</Text>
                    <PaymentMethod
                        selectedPayment={selectedPayment}
                        setSelectedPayment={setSelectedPayment}
                    />

                    <View style={styles.totalBox}>
                        <Text style={styles.totalText}>Total: </Text>
                        <Text style={styles.totalAmount}>Rp{total.toLocaleString('id-ID')}</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.confirmButton, (!(selectedProduct && userId && selectedPayment) || isProcessing) && { backgroundColor: '#555' }]}
                        disabled={!(selectedProduct && userId && selectedPayment) || isProcessing}
                        onPress={async () => {
                            // Check if user is logged in
                            if (!user) {
                                toastService.showError('Login Diperlukan', 'Silakan login terlebih dahulu');
                                return;
                            }

                            // Validation
                            if (!selectedProduct) {
                                toastService.showError('Pilihan Tidak Lengkap', 'Silakan pilih paket top-up');
                                return;
                            }
                            if (!userId) {
                                toastService.showError('ID Akun Kosong', 'Masukkan ID akun game Anda');
                                return;
                            }
                            if (!selectedPayment) {
                                toastService.showError('Metode Pembayaran', 'Pilih metode pembayaran');
                                return;
                            }

                            try {
                                setIsProcessing(true);
                                
                                // Show processing toast
                                toastService.showInfo('Memproses Pembayaran', 'Tunggu sebentar...');
                                
                                // Simulate processing time
                                await new Promise(resolve => setTimeout(resolve, 2000));
                                
                                // Create order
                                const order = await orderService.saveOrder({
                                    gameName: game.name,
                                    productName: selectedProduct.label,
                                    amount: selectedProduct.price,
                                    status: 'success' as const,
                                    userId: user.id,
                                    paymentMethod: selectedPayment,
                                });

                                // Show success toast
                                toastService.showSuccess(
                                    'Top-up Berhasil!', 
                                    `${selectedProduct.label} berhasil dibeli untuk ID ${userId}`
                                );

                                // Reset form after 1 second
                                setTimeout(() => {
                                    setSelectedProduct(null);
                                    setUserId('');
                                    setSelectedPayment(null);
                                }, 1000);

                            } catch (error) {
                                console.error('Order creation failed:', error);
                                
                                // Create failed order for tracking
                                try {
                                    await orderService.saveOrder({
                                        gameName: game.name,
                                        productName: selectedProduct.label,
                                        amount: selectedProduct.price,
                                        status: 'failed' as const,
                                        userId: user.id,
                                        paymentMethod: selectedPayment,
                                    });
                                } catch (saveError) {
                                    console.error('Failed to save failed order:', saveError);
                                }

                                toastService.showError(
                                    'Pembayaran Gagal', 
                                    'Terjadi kesalahan, silakan coba lagi'
                                );
                            } finally {
                                setIsProcessing(false);
                            }
                        }}
                    >
                        <Text style={styles.confirmText}>
                            {isProcessing ? 'Memproses...' : 'Konfirmasi Pembelian'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default GameDetail;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#1e1e2e',
        flexGrow: 1,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        padding: 20,
        backgroundColor: '#1e1e2e',
        flexGrow: 1,
    },
    gameImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
        marginVertical: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 12,
        padding: 12,
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    productLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    productPrice: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4,
    },
    selectedCard: {
        borderColor: '#00bcd4',
        borderWidth: 1,
    },
    paymentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    paymentOption: {
        backgroundColor: '#2a2a40',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginRight: 8,
        marginTop: 8,
    },
    selectedPayment: {
        backgroundColor: '#00bcd4',
    },
    paymentText: {
        color: '#fff',
    },
    totalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    totalText: {
        fontSize: 16,
        color: '#aaa',
    },
    totalAmount: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#00bcd4',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
