import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/colors'

const TextButton = ({onPress,text}) => {
  return (
      <Pressable 
                onPress={onPress}>
               <Text style={styles.text}>{text}</Text>
      </Pressable>
  )
}

export default TextButton

const styles = StyleSheet.create({
text:{
    color:appColors.green,
    fontWeight:'900',
    fontSize:14,
    
}
})