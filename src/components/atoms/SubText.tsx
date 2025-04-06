import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const SubText: React.FC<Props> = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

export default SubText;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
