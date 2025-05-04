import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXSX6ELsDwQRizOYIT_jiwAnVRXD5Q2V8",
  authDomain: "expensetrackingapp-b4fdd.firebaseapp.com",
  projectId: "expensetrackingapp-b4fdd",
  storageBucket: "expensetrackingapp-b4fdd.appspot.com", // Fixed storage bucket format
  messagingSenderId: "666584258159",
  appId: "1:666584258159:web:1e4215f823a3471b259f9a"
};

// Initialize Firebase with error handling
let app;
let auth;
let db;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized successfully");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  console.log("Firebase auth initialized successfully");
  db = getFirestore(app);
  console.log("Firestore initialized successfully");
  
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { app, auth, db };