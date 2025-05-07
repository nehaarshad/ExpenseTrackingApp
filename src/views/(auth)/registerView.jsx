// LoginView.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import GradientButton from '../../components/shared/gradientButton';
import Input from '../../components/shared/input'; 
import IconButton from '../../components/shared/iconButton';
import TextButton from '../../components/shared/textButton';
import { appColors } from '../../constants/colors';
import { spacingX, spacingY } from '../../constants/scaling';

const RegisterView = ({ navigation }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth(); 
  const validateInputs = () => {
    if (!email || !email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!name || !name.trim()) {
      Alert.alert('Error', 'Please enter Username');
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
        name,
        passwordLength: password.length 
      });
      
      await signUp(email, password,name);
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
    <View style={styles.container}>
      {/* BackButton */}
      <IconButton name="chevron-back-outline" 
      size={spacingY._20} color={appColors.baseGreen} 
      onPress={()=>navigation.navigate('welcome')}/>
        
        {/* welcomeText */}
        
        <View style={styles.welcomeView}>
           <Text style={styles.welcomeText}>Let's</Text>
           <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={styles.formText}>Create an account to track your expenses</Text>

          {/* Text Input Fields */}
          <View style={styles.Field}>

          <Input 
            placeholder="Enter username"
            icon={<Ionicons name="person-outline" size={spacingY._20} color={appColors.baseGreen} />}
            value={name} 
            onChangeText={(value) => setName(value)}
            autoCapitalize="none"
            disabled={loading}
          />

          <Input 
            placeholder="Enter email"
            icon={<Ionicons name="at-outline" size={spacingY._20} color={appColors.baseGreen} />}
            value={email} 
            onChangeText={(value) => setEmail(value)}
            autoCompleteType="email"
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={loading}
          />
          
          <Input 
            placeholder="Enter password"
            icon={<Ionicons name="lock-closed-outline" size={spacingY._20} color={appColors.baseGreen} />}
            value={password} 
            onChangeText={(value)=> setPassword(value)}
            secureTextEntry={true}
            disabled={loading}
          /> 
          </View>
        </View>

        {/* Login Button */}
        <View style={styles.button}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={appColors.baseGreen} />
          </View>
        ) : (
          <GradientButton 
            title="Sign Up" 
            onPress={handleRegister} 
          />
        )}
        </View>

        {/* Navigation to Register */}
        <View style={styles.navView}>
          <Text style={styles.text}>Already have an account? </Text>
          <TextButton 
            text='login' 
            onPress={() => navigation.navigate('login')}
            size={spacingY._15}
            color={appColors.baseGreen}
            weight='bold'
          />
        </View>
    </View>
    
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._50,
  },
  welcomeView:{ 
   gap:spacingY._5,
   marginTop:spacingY._25,
  },
  welcomeText:{ 
   fontWeight:'800',
   color:appColors.baseGreen,
   fontSize:spacingY._30,
   },
   form:{
  
    marginTop:spacingY._7,
    marginBottom:spacingY._70,
   },
  formText:{
    fontSize:spacingY._15,
    color:appColors.lightBaseGreen,
    marginBottom:spacingY._15,
    fontWeight:'500',
    fontFamily:'inter',

    }, 
  Field:{
    gap:spacingY._10,
    marginTop: spacingY._20
  }, 
  button:{
    marginHorizontal: spacingX._20,
  },
  text: {
    fontSize: spacingY._15,
    color:appColors.black,
    fontWeight: 'regular',
    fontFamily:'inter',
    textAlign: 'center',
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