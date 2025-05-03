import { StyleSheet, Text, View ,Image} from 'react-native'
import {appColors} from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import appLogo from '../assets/images/appLogo.png'
import React,{useEffect} from 'react'

const SplashView = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
     <View style={styles.container}>
          <Image source={appLogo} style={styles.image} resizeMode='contain'></Image>
        </View>
  )
}

export default SplashView

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.offWhite,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
     height:'40%'
    },
  });