import { AuthProvider } from './src/context/authContext';
import AppNavigator from './src/navigations/appNavigations';
import React, { useState } from 'react';
import SplashView from './src/views/splashView';
import { useEffect } from 'react';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Simulate loading (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!appIsReady) {
    return <SplashView />;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
