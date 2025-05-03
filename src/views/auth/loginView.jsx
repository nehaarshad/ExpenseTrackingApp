// LoginView.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { login } from '../../services/authService';
import Input from '../../components/shared/input'; 
import MainButton from '../../components/shared/button';
import TextButton from '../../components/shared/textButton';
import HeaderImage from '../../components/shared/headerImage'; 
import { appColors } from '../../constants/colors';
import { spacingX, spacingY } from '../../constants/scaling';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login button pressed!'); 
    
    try {
      setLoading(true);
      console.log('Attempting login with:', { 
        email: typeof email === 'string' ? email : 'NOT A STRING', 
        passwordLength: password ? password.length : 0 
      });
      
      await login(email, password);
      Alert.alert('Login Successful', 'Welcome back!');
      navigation.navigate('home');
    } catch (error) {
      console.error('Login view error:', error);
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
        <View style={styles.innerContainer}>
          {/* Header */}
          <HeaderImage />
          
          {/* Text Input Fields */}
          <View style={styles.fieldStyle}>
            <Input 
              title="Email or Phone Number" 
              placeholder="Enter email"
              value={email} 
              onChangeText={(value) => setEmail(value)}
              autoCompleteType="email"
              keyboardType="email-address"
              autoCapitalize="none"
              disabled={loading}
            />
            
            <Input 
              title="Password" 
              placeholder="Enter password"
              value={password} 
              onChangeText={(value)=> setPassword(value)}
              secureTextEntry={true}
              disabled={loading}
            /> 
          </View>
          
          {/* Login Button */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={appColors.green} />
            </View>
          ) : (
            <MainButton 
              title="Login" 
              onPress={handleLogin} 
            />
          )}
          
          {/* Navigation to Register */}
          <View style={styles.navView}>
            <Text>Don't have an Account? </Text>
            <TextButton 
              text='SignUp' 
              onPress={() => navigation.navigate('register')}
            />
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.offWhite,
  },
  innerContainer: {
    flex: 1,
  },
  fieldStyle:{
    marginVertical: spacingY._50
  }, navView:{
    marginVertical: spacingY._20,
    marginHorizontal: spacingX._40,
    flexDirection: 'row'
  },
  loadingContainer: {
    padding: spacingY._20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default LoginView;