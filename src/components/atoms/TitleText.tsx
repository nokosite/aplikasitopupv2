import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const TitleText: React.FC<Props> = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});
