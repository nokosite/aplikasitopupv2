// src/components/OnBoardingButtons.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  isLastSlide: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const OnBoardingButtons: React.FC<Props> = ({ isLastSlide, onNext, onSkip }) => {
  return (
    <View style={styles.buttonContainer}>
      {!isLastSlide ? (
        <>
          <TouchableOpacity onPress={onSkip}>
            <Text style={styles.skip}>Lewati</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextText}>Lanjut</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={onNext}>
          <Text style={styles.startText}>Mulai</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default OnBoardingButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  skip: {
    color: '#aaa',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#4e95f9',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 12,
  },
  nextText: {
    color: '#fff',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#4e95f9',
    paddingHorizontal: 100,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
