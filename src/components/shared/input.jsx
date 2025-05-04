import React from 'react';
import { TextInput, StyleSheet,View,Text } from 'react-native';
import { appColors } from '../../constants/colors';
import { radius, spacingX,spacingY } from '../../constants/scaling';

const Input = ({ 
  placeholder, 
  icon,
  value, 
  onChangeText, 
  secureTextEntry,
  title,
  disabled,
  ...props 
}) => {
  return (
    <View style={styles.container}>
      {icon && icon}
      <TextInput
        style={[
          styles.input,
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

  container: {
   flexDirection:'row',
    alignItems:'center',
    height:spacingY._45,
    justifyContent:"center",
    borderWidth:1,
    borderColor: appColors.black,
    borderRadius: radius._15,
    borderCurve:"continuous",
    paddingHorizontal:spacingX._15,
    gap:spacingX._10,

  }, 

  input:{
    flex:1,
    height:spacingY._50,
    fontSize:spacingY._15,
    color:appColors.black,
    fontWeight:'400',
  }
});

export default Input;