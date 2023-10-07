import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClubScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¡Bienvenido a mi aplicación React Native!</Text>
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

export default ClubScreen;