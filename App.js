import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthPage from './src/screens/AuthPage'; 
import HomeScreen from './src/screens/HomeScreen';
import LearnScreen from './src/screens/LearnScreen';
import ClubScreen from './src/screens/ClubScreen';
import MapScreen from './src/screens/MapScreen';
import BottomNavbar from './src/components/BottomNavbar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavbar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Learn" component={LearnScreen} />
      <Tab.Screen name="Club" component={ClubScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        <Stack.Screen 
          name="AuthPage" 
          component={AuthPage} 
          options={{ headerShown: false }} // Add this line to hide the header
        />
         <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
