import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { spacingX, spacingY } from '../../constants/scaling'
import { Ionicons } from '@expo/vector-icons'
import { appColors } from '../../constants/colors'

const ListTab = ({lefticon,title,onPress,onIconClick,rightIcon}) => {
  return (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Ionicons name={lefticon} size={spacingY._30} color={appColors.neutral600}></Ionicons>
    <Text style={styles.title}>{title}</Text>
    <Ionicons name={rightIcon} size={spacingY._15} color={appColors.black} style={styles.rightIcon} onPress={onIconClick}></Ionicons>
  </TouchableOpacity>
  )
}

export default ListTab

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: spacingX._25,
        paddingVertical: spacingY._10,
        flexDirection:'row',
    },
    title:{
        marginLeft:spacingX._15,
        fontSize:spacingY._18,
        fontWeight:'500',
    },
    rightIcon:{
        marginLeft:spacingX._140
    },

})