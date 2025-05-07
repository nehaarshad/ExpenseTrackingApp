import { StyleSheet, Text, View } from 'react-native'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import { appColors } from '../../constants/colors'
import HeaderImage from '../../components/shared/headerImage'
import { useAuth } from '../../hooks/useAuth'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

const ProfileView = () => {

  const {user}=useAuth();
  return (
    <View style={{flex: 1}}>
      <HeaderImage  title="Profile"></HeaderImage> 
       <Ionicons name="chevron-back" size={24} color="black" style={{position:'absolute', top:spacingY._50, left:spacingX._20}}/>
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
    marginTop: spacingY._30,
    alignItems: 'center',
    gap: spacingY._15,
  },
  avatarContainer:{
    position: 'relative',
    alignSelf:'center',
  },
  avatar:{
    alignSelf:'center',
    width: spacingX._135,
    height: spacingY._135,
    borderRadius: radius._70,
    backgroundColor: appColors.lightBaseGreen,
    shadowColor: appColors.baseGreen,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    padding: spacingX._5,
  },
  editIcon:{
    position: 'absolute',
    bottom: 5,
    right: 8,
    backgroundColor: appColors.white,
    borderRadius: radius._20,
    padding: spacingX._5,
  },
  nameContainer:{
    alignItems: 'center',
    gap: spacingY._5,
  },
  listIcon:{
    height: spacingY._45,
    width: spacingY._45,
    borderRadius: radius._20,
    backgroundColor: appColors.baseGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve:'continuous'
  },
  listItem:{
    marginBottom: spacingY._15,
  },
  accoutOptions:{
    marginTop: spacingY._20,
  },
  flexRow:{
    flexDirection: 'row',
    gap: spacingX._10,
    alignItems: 'center',
  },

})