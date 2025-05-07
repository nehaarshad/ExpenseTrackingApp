import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../constants/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { login, register, logout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Enhanced login function with error handling
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

  // Enhanced register function with proper parameter passing
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

  // Enhanced logout function
  const signOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    error: authError,
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
