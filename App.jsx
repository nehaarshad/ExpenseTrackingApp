import { AuthProvider } from './src/context/authContext';
import AppNavigator from './src/navigations/appNavigations';
import React, { useState } from 'react';
import SplashView from './src/views/splashView';
import { useEffect } from 'react';
import { useExpense } from './src/hooks/useExpenses';
import { ExpenseProvider } from './src/context/expenseContext';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
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
    <ExpenseProvider>
        <AppNavigator />
    </ExpenseProvider>
    </AuthProvider>
  );
};

export default App;
