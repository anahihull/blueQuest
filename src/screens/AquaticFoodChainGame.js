import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

const AquaticFoodChainGame = () => {
  const [score, setScore] = useState(0);
  const [fishAnimation] = useState(new Animated.Value(0));
  const [planktonAnimation] = useState(new Animated.Value(0));

  const handleEat = (points) => {
    setScore(score + points);
    animateFishAndPlankton();
  };

  const restartGame = () => {
    setScore(0);
    fishAnimation.setValue(0);
    planktonAnimation.setValue(0);
  };

  const animateFishAndPlankton = () => {
    // Animate the fish and plankton for a more interactive experience
    Animated.sequence([
      Animated.timing(fishAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(planktonAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fishAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(planktonAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Aquatic Food Chain Game</Text>
      <Text style={{ fontSize: 18 }}>Your Score: {score}</Text>
      <Animated.Image
        source={require('../../assets/fish.png')} // Update the path to your fish image
        style={[styles.animatedImage, { transform: [{ scale: fishAnimation }] }]}
      />
      <Animated.Image
        source={require('../../assets/food.png')} // Update the path to your plankton image
        style={[styles.animatedImage, { transform: [{ scale: planktonAnimation }] }]}
      />
      <Button title="Eat Fish" onPress={() => handleEat(10)} />
      <Button title="Eat Plankton" onPress={() => handleEat(5)} />
      <Button title="Restart Game" onPress={restartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  animatedImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default AquaticFoodChainGame;
