import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import GradientButton from '../../components/shared/gradientButton'
import Input from '../../components/shared/input'
import Ionicons from '@expo/vector-icons/Ionicons';
import { appColors } from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import { spacingX, spacingY, radius } from '../../constants/scaling'
import { useAuth } from '../../hooks/useAuth'
import IconButton from '../../components/shared/iconButton'
import { useNavigation } from 'expo-router'

const EditProfile = () => {
  const { user, localImage,editProfile } = useAuth();
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigation=useNavigation();
  useEffect(() => {

    if (user) {
      setUserName(user.displayName || '');
      setEmail(user.email || '');
      if (localImage) {
        setImage(localImage);
      }
    }

  }, [user,localImage]);

  const pickImage = async () => {
    try {
      
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload an image.');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1], // Square aspect for profile pictures
        quality: 0.7,
      })

      if (!result.canceled && result.assets && result.assets[0]) {
        const selectedImage = result.assets[0].uri;
        console.log('Selected image:', selectedImage);
        setImage(selectedImage);
      }
    } catch (error) {
      console.error('Image selection error:', error);
      Alert.alert('Error', 'Failed to select image')
    }
  }

  const handleEdit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updates = {};
      
      if (userName !== user.displayName) {
        updates.displayName = userName;
      }
      
      if (email !== user.email) {
        updates.email = email;
      }

      if (number !== user.phoneNumber) {
        updates.phoneNumber = number;
      }

      if (image && image !== localImage) {
        updates.localImage = image;
      }

      console.log('Sending updates to editProfile:', updates);
      await editProfile(updates);
      
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', error.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.main}>
         <View style={styles.back}>
              {/* BackButton */}
      <IconButton name="chevron-back-outline" 
      size={spacingY._20} color={appColors.baseGreen} 
      onPress={()=>navigation.goBack()}/>
          </View>


      <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {image ? (
            <Image source={{uri:image}} style={styles.avatarImage} />
          ) : (
            <Ionicons name='person' size={spacingY._50} color={appColors.white} />
          )}
        </View>
        
        {uploading && (
          <View style={styles.uploadOverlay}>
            <ActivityIndicator size="small" color={appColors.white} />
          </View>
        )}
      </TouchableOpacity>

      {/* TextFields */}
      <View style={styles.fields}>
        <Input 
          placeholder="UserName" 
          value={userName}
          onChangeText={(v) => setUserName(v)}
          icon={<Ionicons name="person-outline" size={spacingY._20} color={appColors.baseGreen} />}
        />
        <Input 
          placeholder="Email" 
          value={email}
          onChangeText={(v) => setEmail(v)}
          icon={<Ionicons name="at-outline" size={spacingY._20} color={appColors.baseGreen} />}
        />
        <Input 
          placeholder="Contact Number" 
          value={number}
          onChangeText={(v) => setNumber(v)}
          icon={<Ionicons name="phone-portrait-outline" size={spacingY._20} color={appColors.baseGreen} />}
        />
      </View>

      {/* Edit Button */}
      <View style={styles.button}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={appColors.baseGreen} />
          </View>
        ) : (
          <GradientButton 
            title="Edit Profile" 
            onPress={handleEdit} 
          />
        )}
      </View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  back:{
    marginTop:spacingY._50,
    marginHorizontal:spacingX._25,
    marginBottom:spacingY._80

  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: spacingY._10
  },
  avatar: {
    alignSelf: 'center',
    width: spacingX._135,
    height: spacingY._120,
    borderRadius: radius._100,
    backgroundColor: appColors.lightBaseGreen,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: radius._100,
  },
  uploadOverlay: {
    position: 'absolute',
    width: '38%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius._100,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: appColors.baseGreen,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: appColors.white,
  },
  fields: {
    marginVertical: spacingY._50,
    marginHorizontal: spacingX._25,
    gap: spacingY._15
  },
  loadingContainer: {
    padding: spacingY._20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginHorizontal: spacingX._25,
  },
});