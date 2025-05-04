import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { appColors } from '../../constants/colors';
import { spacingX ,radius, spacingY} from '../../constants/scaling';

const MainButton = ({ title, onPress ,disabled}) => {
  return (
    
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.baseGreen,
    borderRadius: radius._8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:spacingX._40,
    paddingHorizontal:spacingX._10,
    paddingVertical:spacingY._10
  },
  text: {
    color: appColors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MainButton;