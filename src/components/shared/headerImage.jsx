import { StyleSheet, ImageBackground, View, TouchableOpacity, Text ,Image } from 'react-native'
import React from 'react'
import headerImage from '../../assets/images/header.png'
import { spacingX, spacingY ,radius} from '../../constants/scaling'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { appColors } from '../../constants/colors'

const HeaderImage = ({ title, text, username,view=true, localImage}) => {
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
        <View style={styles.dashboardView}>
        {/* text */}
        <View style={styles.textView}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.user}>{username}</Text>
         </View>
        {/* image */}
         <View style={styles.avatar}>
              {localImage ? (
                        <Image source={{uri:localImage}} style={styles.avatarImage} />
                      ) : (
                        <Ionicons name='person' size={spacingY._30} color={appColors.white} />
                      )}
        </View>
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
  dashboardView: {
    flexDirection: 'row',
    position: 'relative',
    marginHorizontal: spacingX._25,
    marginTop: spacingY._80,
    gap:spacingX._135
  },
  textView: {
    flexDirection: 'column',
    position: 'relative',

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
    avatar:{
      width: spacingX._60,
      height: spacingY._50,
      borderRadius: radius._100,
      backgroundColor: appColors.lightBaseGreen,
      justifyContent: 'center',
      alignItems:'center',
      overflow: 'hidden',
    },
      avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: radius._100,
    },
  

})
