import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashView from '../views/splashView';
import LoginView from '../views/(auth)/loginView';
import RegisterView from '../views/(auth)/registerView';
import HomeView from '../views/(tabs)/home';
import WelcomeView from '../views/welcome';
import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const { user, loading } = useAuth();

  // If still loading auth state, you could show a loading screen here
  if (loading) {
    return <SplashView />;
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='welcome'>
        {user ? (
          // User is signed in
          <>
            <Stack.Screen name="home" component={HomeView} />
          </>
        ) : (
          // No user is signed in
          <>
            <Stack.Screen name="splash" component={SplashView} />
            <Stack.Screen name="welcome" component={WelcomeView} />
            <Stack.Screen name="login" component={LoginView} />
            <Stack.Screen name="register" component={RegisterView} />
          </>
        )}
      </Stack.Navigator>
  );
};

export default AuthNavigator;