import { StyleSheet, ImageBackground, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import headerImage from '../../assets/images/header.png'
import { spacingX, spacingY } from '../../constants/scaling'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../../constants/colors'

const HeaderImage = ({ title, text, username,view=true,}) => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={headerImage} resizeMode='cover' style={styles.image} >
      {view ?(
          <View style={styles.defaultContainer}>
      
          <TouchableOpacity style={styles.leftIcon} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={spacingY._20} color="white" />
          </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>

      </View>
      ):(
         <View style={styles.dashboard}>
        
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.user}>{username}</Text>

      </View>
      )}
     
    </ImageBackground>
  )
}

export default HeaderImage

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: spacingY._250,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: spacingX._25,
    marginTop: spacingY._80,
  },
  leftIcon: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: spacingY._20,
    fontWeight: 'bold',
    color: appColors.white,
  },
  dashboard: {
    flexDirection: 'column',
    position: 'relative',
    marginHorizontal: spacingX._25,
    marginTop: spacingY._80,
  },
  text: {
    fontSize: spacingY._15,
    fontWeight: 'normal',
    color: appColors.white,
    fontFamily:'inter',
  },
   user: {
    fontSize: spacingY._23,
    fontWeight: 'bold',
    color: appColors.white,
  },
  

})
