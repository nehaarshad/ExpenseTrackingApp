import { StyleSheet, Text, View ,Image, ImageBackground} from 'react-native'
import {appColors} from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import backgroundImage from '../assets/images/splashScreen.png'
import React,{useEffect} from 'react'
import { spacingY } from '../constants/scaling'

const SplashView = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('welcome');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
     <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.image} resizeMode='cover'>
          <Text style={styles.title}>Balancio</Text>
      </ImageBackground>
          
     </View>
  )
}

export default SplashView

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
      fontSize: spacingY._50,
      fontWeight: 'bold',
      color: appColors.white,
      fontFamily:'inter',
      textAlign: 'center',
    },
  });