import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { ErrorBoundary } from './src/components/ErrorBoundary';
/*
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.clear().then(() => {
  console.log("AsyncStorage limpo!");
});
*/
export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ErrorBoundary>
  );
}
