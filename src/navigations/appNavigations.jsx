import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from '../views/(auth)/loginView';
import RegisterView from '../views/(auth)/registerView';
import HomeView from '../views/(tabs)/home';
import WelcomeView from '../views/welcome';
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import TabsNavigation from '../views/(tabs)/_layouts';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  // If still loading auth state, show splash screen
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // User is signed in
          <Stack.Screen name="tabs" component={TabsNavigation} />
        ) : (
          // No user is signed in
          <>
            <Stack.Screen name="welcome" component={WelcomeView} />
            <Stack.Screen name="login" component={LoginView} />
            <Stack.Screen name="register" component={RegisterView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;