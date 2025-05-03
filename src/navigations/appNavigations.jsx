import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashView from '../views/splashView';
import LoginView from '../views/auth/loginView';
import RegisterView from '../views/auth/registerView';
import HomeView from '../views/home';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" component={SplashView} />
        <Stack.Screen name="login" component={LoginView} />
        <Stack.Screen name="register" component={RegisterView} />
        <Stack.Screen name="home" component={HomeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}