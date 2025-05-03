// LoginView.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { register } from '../../services/authService';
import Input from '../../components/shared/input'; 
import MainButton from '../../components/shared/button';
import TextButton from '../../components/shared/textButton';
import HeaderImage from '../../components/shared/headerImage'; 
import { appColors } from '../../constants/colors';
import { spacingX, spacingY } from '../../constants/scaling';

const RegisterView = ({ navigation }) => {
  const [email, setEmail] = useState(''); // Temporary for testing
  const [password, setPassword] = useState(''); // Temporary for testing
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!password || !password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    console.log('Register button pressed!');
    
    if (!validateInputs()) return;
    
    try {
      setLoading(true);
      console.log('Attempting register with:', { 
        email, 
        passwordLength: password.length 
      });
      
      await register(email, password);
      Alert.alert('Registration Successful', 'Welcome!');
      navigation.navigate('home');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.innerContainer}>
      <HeaderImage />
      
      <View style={styles.fieldStyle}>
        <Input 
          title="Email" 
          placeholder="Enter email"
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          disabled={loading}
        />
        
        <Input 
          title="Password" 
          placeholder="Enter password (min 6 chars)"
          value={password} 
          onChangeText={setPassword}
          secureTextEntry={true}
          disabled={loading}
        /> 
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color={appColors.green} />
      ) : (
        <MainButton 
          title="Sign Up" 
          onPress={handleRegister} 
        />
      )}
      
      <View style={styles.navView}>
        <Text>Already have an Account? </Text>
        <TextButton 
          text='Login' 
          onPress={() => navigation.navigate('login')}
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
  }, 
  navView:{
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

export default RegisterView;