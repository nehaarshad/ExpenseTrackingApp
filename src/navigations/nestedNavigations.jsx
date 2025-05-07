import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProfileView from '../views/(tabs)/myProfile';
import EditProfile from '../views/profile/editProfile';

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {

  return (
      <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ProfileView'>
        
            <ProfileStack.Screen name="ProfileView" component={ProfileView} />
            <ProfileStack.Screen name="editProfile" component={EditProfile} />
       
      </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;