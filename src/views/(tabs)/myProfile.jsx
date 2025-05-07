import { StyleSheet, Text,Alert, View } from 'react-native'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import { appColors } from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'
import HeaderImage from '../../components/shared/headerImage'
import { useAuth } from '../../hooks/useAuth'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import ListTab from '../../components/shared/listTab'
import { verticalScale } from 'react-native-size-matters'
import { signOut } from '../../hooks/useAuth'

const ProfileView = ({navigation}) => {

  const {signOut}=useAuth();
  const handleLogout=async()=> {
    console.log('User logged out');
    await signOut();
 Alert.alert('You Logged Out Successfully');
    console.log('User logged out');
  }
 // const navigation = useNavigation();
  const {user}=useAuth();
  return (
    <View style={{flex: 1}}>
      {/*header */}
    <View >
      <HeaderImage  title="Profile"></HeaderImage> 
    </View>

    {/* user info */}
      <View style={styles.userInfo}>
        {/* picture */}
          <View style={styles.avatar}>
            <Ionicons name='person' size={spacingY._50} color={appColors.white}/>
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
    <ListTab title='Settings   ' lefticon='settings' rightIcon='chevron-forward' onPress={()=>{navigation.navigate('editProfile')}}></ListTab>
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
    alignSelf:'center',
    width: spacingX._135,
    height: spacingY._120,
    borderRadius: radius._100,
    backgroundColor: appColors.lightBaseGreen,
    padding: spacingX._5,
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