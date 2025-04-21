import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  type?: 'action' | 'navigation';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, type = 'action' }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'action' ? styles.actionButton : styles.navigationButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 48,
    padding: 12,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: Colors.light.buttonActive,
  },
  navigationButton: {
    backgroundColor: Colors.light.selectionButton,
  },
  disabledButton: {
    backgroundColor: Colors.light.buttonDisabled,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
