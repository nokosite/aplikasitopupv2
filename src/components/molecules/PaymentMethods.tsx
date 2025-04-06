import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  selectedPayment: string | null;
  setSelectedPayment: (method: string) => void;
};

const paymentMethods = ['Dana', 'GoPay', 'OVO', 'ShopeePay', 'Bank Transfer'];

const PaymentMethod: React.FC<Props> = ({ selectedPayment, setSelectedPayment }) => {
  return (
    <View style={styles.container}>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.paymentOption,
            selectedPayment === method && styles.selectedPayment
          ]}
          onPress={() => setSelectedPayment(method)}
        >
          <Text style={styles.paymentText}>{method}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
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
});
