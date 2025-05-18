import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, updateProfile,getAuth} from 'firebase/auth';
import { login, register, logout } from '../services/authService'; // Import your auth methods

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth=getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
   const [localImage, setLocalImage] = useState(null); 

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);


 const editProfile = async (updates) => {
    
    try {
     
        await updateProfile(auth.currentUser, {
          displayName: updates.displayName,
          phoneNumber:updates.phoneNumber,
          email:updates.email
        });
      

      if (updates.localImage) {
        setLocalImage(updates.localImage);
      }

      // Update our user state
      setUser(prev => ({
        ...prev,
        displayName: updates.displayName || prev?.displayName,
        phoneNumber:updates.phoneNumber || prev?.phoneNumber,
        email:updates.email || prev?.email,
        localImage: updates.localImage || prev?.localImage
      }));

      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      setAuthError(error.message);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    setAuthError(null);
    try {
      const user = await login(email, password);
      return user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };
  
  const signUp = async (email, password, userName) => {
    setAuthError(null);
    try {
      const user = await register(email, password, userName);
      return user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await logout();
      setUser(null);
      setLocalImage(null);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    localImage,
    error: authError,
    editProfile,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};