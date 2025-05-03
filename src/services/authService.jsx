// authServices.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../constants/firebaseConfig';

export const login = async (email, password) => {
  try {
    console.log('Login attempt with:', { 
      email: typeof email === 'string' ? email : 'NOT A STRING', 
      passwordType: typeof password 
    });
    
    // Ensure email and password are strings
    const emailStr = String(email).trim();
    const passwordStr = String(password).trim();
    
    if (!emailStr || emailStr === 'undefined' || emailStr === 'null') {
      throw new Error('Email is required');
    }
    
    if (!passwordStr || passwordStr === 'undefined' || passwordStr === 'null') {
      throw new Error('Password is required');
    }
    
    console.log('Auth object:', auth);
    if (!auth) throw new Error("Auth not initialized");
    
    // // Add slight delay before the Firebase call
    // await new Promise(resolve => setTimeout(resolve, 300));
    
    const userCredentials = await signInWithEmailAndPassword(auth, emailStr, passwordStr);
    console.log('Login successful');
    return userCredentials.user;
  } catch (e) {
    console.error('Login error details:', e.code, e.message);
    
    // More user-friendly error messages
    if (e.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (e.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address.');
    } else if (e.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (e.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    } else if (e.code === 'auth/network-request-failed') {
      throw new Error('Network connection issue. Please check your internet connection.');
    } else if (e.message && e.message.includes('invalid-value')) {
      throw new Error('Please check your email and password format.');
    } else {
      throw new Error(e.message || 'Login failed. Please try again.');
    }
  }
};

export const register = async (email, password, userName) => {
  try {
    // Ensure email and password are strings
    const emailStr = String(email).trim();
    const passwordStr = String(password).trim();
    
    if (!emailStr || emailStr === 'undefined' || emailStr === 'null') {
      throw new Error('Email is required');
    }
    
    if (!passwordStr || passwordStr === 'undefined' || passwordStr === 'null') {
      throw new Error('Password is required');
    }
    
    if (!auth) throw new Error("Firebase Auth not initialized properly");
    
    const userCredentials = await createUserWithEmailAndPassword(auth, emailStr, passwordStr);
    const user = userCredentials.user;
    if (userName) {
      await updateProfile(user, { displayName: String(userName).trim() });
    }
    console.log(`User registered with: ${user.email}`);
    return user;
  } catch (e) {
    console.error('Register error:', e);
    
    if (e.code === 'auth/email-already-in-use') {
      throw new Error('This email is already registered. Please log in or use a different email.');
    } else if (e.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (e.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    } else {
      throw new Error(e.message || 'Registration failed. Please try again later.');
    }
  }
};

export const logout = async (navigation) => {
  try {
    if (!auth) throw new Error("Firebase Auth not initialized properly");
    
    await signOut(auth);
    navigation.replace('login');
  } catch (e) {
    console.error('Logout error:', e);
    throw new Error(e.message || 'Logout failed. Please try again.');
  }
};