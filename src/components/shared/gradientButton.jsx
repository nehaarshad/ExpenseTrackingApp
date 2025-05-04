import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { appColors } from '../../constants/colors';
import { radius, spacingX, spacingY } from '../../constants/scaling';

const GradientButton = ({ title, onPress,  textStyle}) => {
  return (
    <TouchableOpacity 
      style={styles.buttonContainer} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[appColors.buttonGradient.start, appColors.buttonGradient.end]}
        start={{ x: 1, y: 0.1 }}
        end={{ x:1, y: 0.8 }}
        style={styles.gradient}>

          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>

      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: spacingY._45,
    borderRadius: radius._30,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: appColors.white,
    fontSize: spacingY._18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GradientButton;