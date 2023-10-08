import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: '', // Set an empty string to hide the title
    });
  }, []);

  const navigateToAquaticGame = () => {
    navigation.navigate('AquaticFoodChainGame'); // Navigate to the 'AquaticFoodChainGame' screen
  };

  const navigateToWaterConservationGame = () => {
    navigation.navigate('WaterConservationGame'); // Navigate to the 'WaterConservationGame' screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a mi aplicación React Native!</Text>
      <Button title="Start Aquatic Game" onPress={navigateToAquaticGame} />
      <Button title="Start Water Conservation Game" onPress={navigateToWaterConservationGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
