


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToAquaticGame = () => {
    navigation.navigate('AquaticFoodChainGame');
  };

  const navigateToWaterConservationGame = () => {
    navigation.navigate('WaterConservationGame');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Home</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>Minigames:</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToAquaticGame}>
        <Text style={styles.buttonText}>Start Aquatic Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToWaterConservationGame}>
        <Text style={styles.buttonText}>Start Water Conservation Game</Text>
      </TouchableOpacity>
      <View style={styles.remindersContainer}>
        <Text style={styles.remindersTitle}>Reminders & Announcements:</Text>
        <Text style={styles.remindersText}>
        Every time we lather on sunblock, we're protecting our skin from harmful UV rays, but let's not forget about the hidden impact on our delicate underwater ecosystems. Many sunscreens contain zinc oxide, which, while effective at safeguarding our skin, can be detrimental to coral reefs. As we frolic in crystal-clear waters, tiny particles of zinc wash off our bodies and end up in the ocean, where they can disrupt coral's natural defenses, contribute to coral bleaching, and harm marine life. The next time you enjoy the sun and sea, consider using reef-friendly sunblock formulations that protect you and our precious coral reefs, ensuring that future generations can continue to marvel at their beauty beneath the waves.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  remindersContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor: '#fff', // Added background color
    borderRadius: 10, // Added border radius
    borderWidth: 2, // Added border width
    borderColor: '#3498db', // Added border color
  },
  remindersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  remindersText: {
    fontSize: 16,
  },
});

export default HomeScreen;
