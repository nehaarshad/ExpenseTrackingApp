import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import headerImage from '../../assets/images/headerImage.jpg'

const HeaderImage = () => {
  return (
    <View style={styles.header}>
         <Image source={headerImage} resizeMode='contain' style={styles.image}></Image>
    </View>
  )
}

export default HeaderImage

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 170, // Adjust as needed
        overflow: 'hidden',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      },
      image: {
        width: '100%',
        height: '100%',
      },
})