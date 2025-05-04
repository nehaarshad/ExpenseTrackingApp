import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'
import { appColors } from '../../constants/colors';
import { radius, spacingX } from '../../constants/scaling';

const IconButton = ({name,color,size,onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
       <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({
    button: {
     backgroundColor:appColors.neutral600,
     borderRadius:radius._30,
     borderCurve:"continuous",
     padding:spacingX._5,
     width:spacingX._35,
    },
})