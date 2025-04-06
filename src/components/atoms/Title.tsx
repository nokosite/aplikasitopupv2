import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Title;
