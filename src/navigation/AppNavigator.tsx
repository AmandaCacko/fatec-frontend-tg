import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext'; 
import Loading from '../components/Loading';

import { AuthScreen } from '../screens/auth/AuthScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CreatePatientScreen from '../screens/patient/CreatePatientScreen';
import CaregiverOptionScreen from '../screens/patient/CaregiverOptionScreen';
import EnterPatientCodeScreen from '../screens/patient/EnterPatientCodeScreen';
import ProfileTypeScreen from '../screens/patient/ProfileTypeScreen';
import HomeScreen from '../screens/HomeScreen';
import StockScreen from '../screens/StockScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  const { token, loading, patientData } = useAuth();

  if (loading) {
    return <Loading />;
  }

 return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false 
        }}
      >
        {!token ? (
          
          <>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ gestureEnabled: true }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : !patientData ? (
          
          <>
            <Stack.Screen name="ProfileType" component={ProfileTypeScreen} />
            <Stack.Screen name="CaregiverOption" component={CaregiverOptionScreen} />
            <Stack.Screen name="CreatePatient" component={CreatePatientScreen} />
            <Stack.Screen name="EnterPatientCode" component={EnterPatientCodeScreen} />
          </>
        ) : (
          
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Stock" component={StockScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}