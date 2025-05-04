// LoginView.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { login } from '../../services/authService';
import Input from '../../components/shared/input'; 
import TextButton from '../../components/shared/textButton';
import { appColors } from '../../constants/colors';
import { spacingX, spacingY } from '../../constants/scaling';
import GradientButton from '../../components/shared/gradientButton';
import IconButton from '../../components/shared/iconButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginView = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log('Login button pressed!'); 
    
    try {
      setLoading(true);
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
    <View style={styles.container}>
      {/* BackButton */}
      <IconButton name="chevron-back-outline" 
      size={spacingY._20} color={appColors.baseGreen} 
      onPress={()=>navigation.navigate('welcome')}/>
        
        {/* welcomeText */}
        
        <View style={styles.welcomeView}>
           <Text style={styles.welcomeText}>Hey,</Text>
           <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Text style={styles.formText}>Login now to track all your expenses</Text>

          {/* Text Input Fields */}
          <View style={styles.Field}>
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
          <View style={{alignItems:'flex-end'}}>
            <TextButton 
            text='Forgot Password?' 
            onPress={() => navigation.navigate('welcome')}
            size={spacingY._15}
            color={appColors.baseGreen}
            weight='500'
            />
            </View>
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
            title="Login" 
            onPress={handleLogin} 
          />
        )}
        </View>

        {/* Navigation to Register */}
        <View style={styles.navView}>
          <Text style={styles.text}>Don't Have Account? </Text>
          <TextButton 
            text='SignUp' 
            onPress={() => navigation.navigate('register')}
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

export default LoginView;