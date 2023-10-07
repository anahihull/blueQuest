import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthPage from './AuthPage'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        <Stack.Screen 
          name="AuthPage" 
          component={AuthPage} 
          options={{ headerShown: false }} // Add this line to hide the header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
