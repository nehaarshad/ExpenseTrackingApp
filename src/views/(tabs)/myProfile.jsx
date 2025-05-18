import { StyleSheet, Text,Alert, View ,Image } from 'react-native'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import { appColors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import HeaderImage from '../../components/shared/headerImage'
import { useAuth } from '../../hooks/useAuth'
import React ,{useState,useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import ListTab from '../../components/shared/listTab'
import { verticalScale } from 'react-native-size-matters'

const ProfileView = ({navigation}) => {
  const {signOut,localImage}=useAuth();
    console.log('[ProfileView] Current localImage:', localImage);

  const handleLogout=async()=> {
    console.log('User logged out');
    await signOut();
 Alert.alert('You Logged Out Successfully');
    console.log('User logged out');
  }
 // const navigation = useNavigation();
  const {user}=useAuth();

  console.log(user,'image',localImage);
  return (
    <View style={{flex: 1}}>

      {/*header */}
    <View >
      <HeaderImage  title="Profile" ></HeaderImage> 
    </View>

    {/* user info */}
      <View style={styles.userInfo}>
        {/* picture */}
          <View style={styles.avatar}>
              {localImage ? (
                        <Image source={{uri:localImage}} style={styles.avatarImage} />
                      ) : (
                        <Ionicons name='person' size={spacingY._50} color={appColors.white} />
                      )}
        </View>
        {/* info */}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user?.displayName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
    

    {/* listsTab */}
    <View style={styles.lists}>
    <ListTab title='Edit Profile' lefticon='person-sharp' rightIcon='chevron-forward' onPress={()=>{navigation.navigate('editProfile')}}></ListTab>
     <ListTab title='Logout' lefticon='exit' onPress={handleLogout}></ListTab>
    </View>
      </View>
  )
}

export default ProfileView

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo:{
    top: verticalScale(-60),
    alignItems: 'center',
  },
  avatar:{
    width: spacingX._135,
    height: spacingY._120,
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
  nameContainer:{
    alignItems: 'center',
  },
  lists:{
   marginLeft: spacingX._10,
  },
  name:{
    fontSize: spacingY._23,
    color: appColors.baseGreen,
    fontWeight: 'bold',
    fontFamily:'inter',
  },
  email:{
    fontSize: spacingY._15,
    color: appColors.lightBaseGreen,
    fontWeight: '500',
    fontFamily:'inter',
  },
})