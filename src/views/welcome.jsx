import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import welcomeImage from '../assets/images/welcomeScreen.png'
import { spacingX, spacingY } from '../constants/scaling'
import { appColors } from '../constants/colors'
import GradientButton from '../components/shared/gradientButton'
import TextButton from '../components/shared/textButton'

const  WelcomeView = ({navigation}) => {
  return (
    <View style={styles.main}>

        {/* Image */}
      <Image source={welcomeImage} style={styles.image} resizeMode='cover'/>

      {/* slogan */}
     <Text style={styles.title}>Harmony in Finances Freedom in Life</Text>

     {/* button */}
     <GradientButton  title="Get Started"  onPress={() => navigation.navigate('register')}  />

     {/* loginButton */}
     <View style={styles.navView}>
        <Text style={styles.text}>Already Have Account? </Text>
        <TextButton 
          text='Login' 
          onPress={() => navigation.navigate('login')}
           size={spacingY._15}
           color={appColors.baseGreen}
           weight='bold'
        />
      </View>
    </View>
  )
}

export default WelcomeView

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:spacingX._20,
    marginTop:spacingY._80,
    marginBottom:spacingY._50,
  },
  image:{
    height:'60%',
    width:'100%',
    marginBottom:spacingY._10,
  },
  title: {
    fontSize: spacingY._25,
    marginHorizontal: spacingX._30,
    color:appColors.baseGreen,
    marginBottom:spacingY._35,
    fontWeight: 'bold',
    fontFamily:'inter',
    textAlign: 'center',
  },
  text: {
    fontSize: spacingY._15,
    color:appColors.black,
    fontWeight: 'regular',
    fontFamily:'inter',
    textAlign: 'center',
  },
  navView:{
    marginVertical: spacingY._20,
    marginHorizontal: spacingX._40,
    flexDirection: 'row'
  },
})