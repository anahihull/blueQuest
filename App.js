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
import AquaticFoodChainGame from './src/screens/AquaticFoodChainGame'; // Import your game component
import WaterConservationGame from './src/screens/WaterConservationGame'; // Import your game component
import GameScreen from './src/screens/wasteWarriors/GameScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavbar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Learn" component={LearnScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Club" component={ClubScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="AuthPage" component={AuthPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        {/* Add a screen for your game */}
        <Stack.Screen name="AquaticFoodChainGame" component={GameScreen} options={{ headerShown: true }} />
        <Stack.Screen name="WaterConservationGame" component={WaterConservationGame} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
