// src/components/molecules/DiamondOption.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const DiamondOption: React.FC<Props> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    borderColor: '#ccc',
  },
  selected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  text: {
    color: '#000',
  },
});

export default DiamondOption;
