import React from 'react';
import { TextInput, StyleSheet,View,Text } from 'react-native';
import { appColors } from '../../constants/colors';
import { spacingX,spacingY } from '../../constants/scaling';

const Input = ({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry,
  title,
  disabled,
  ...props 
}) => {
  return (
    <View style={styles.form}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={[
          styles.textInput,
          disabled && styles.disabledInput
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disabled}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginRight: spacingX._20,
    marginLeft: spacingX._20,
    marginBottom: spacingY._12,
  },
  text: {
    marginBottom: 5,
    fontWeight: '500',
  },
  textInput: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: appColors.black,
    borderRadius: 5,
    backgroundColor: appColors.white,
  },
  disabledInput: {
    backgroundColor: appColors.lightGray,
    opacity: 0.7,
  },
});

export default Input;