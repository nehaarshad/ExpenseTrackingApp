import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/colors'
import { spacingY } from '../../constants/scaling'

const TextButton = ({onPress,text,color,size,weight}) => {
  return (
      <Pressable 
                onPress={onPress}>
               <Text style={{color:color,fontWeight:weight,fontSize:size}}>{text}</Text>
      </Pressable>
  )
}

export default TextButton