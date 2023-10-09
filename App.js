import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthPage from './src/screens/AuthPage'; 
import HomeScreen from './src/screens/LearnScreen';
import LearnScreen from './src/screens/HomeScreen';
import ClubScreen from './src/screens/ClubScreen';
import MapScreen from './src/screens/MapScreen';
import BottomNavbar from './src/components/BottomNavbar';
import WaterConservationGame from './src/screens/games/WaterConservationGame'; // Import your game component
import GameScreen from './src/screens/games/GameScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavbar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Club" component={ClubScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthPage">
        <Stack.Screen name="AuthPage" component={AuthPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="CleanOcean" component={GameScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Faucet" component={WaterConservationGame} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
