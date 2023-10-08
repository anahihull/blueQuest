import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, Image } from 'react-native';

const AquaticFoodChainGame = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [creatures, setCreatures] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Start the game loop
    const gameLoop = setInterval(() => {
      // Update the timer
      setTimer((prevTimer) => prevTimer - 1);

      // Randomly spawn fish or plankton
      if (!gameOver && Math.random() < 0.5) {
        const newCreature = {
          type: Math.random() < 0.5 ? 'fish' : 'plankton',
          id: Date.now(),
        };
        setCreatures((prevCreatures) => [...prevCreatures, newCreature]);
      }

      // Check for game over
      if (timer === 0) {
        clearInterval(gameLoop);
        setGameOver(true);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(gameLoop);
  }, [timer, gameOver]);

  const handleEat = (creatureId, points) => {
    setScore((prevScore) => prevScore + points);

    // Remove the eaten creature from the list
    setCreatures((prevCreatures) => prevCreatures.filter((c) => c.id !== creatureId));
  };

  const restartGame = () => {
    setScore(0);
    setTimer(30);
    setCreatures([]);
    setGameOver(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Aquatic Food Chain Game</Text>
      <Text style={{ fontSize: 18 }}>Your Score: {score}</Text>
      <Text style={{ fontSize: 18 }}>Time Left: {timer} seconds</Text>
      <View style={styles.gameContainer}>
        {creatures.map((creature) => (
          <View key={creature.id} style={styles.creatureContainer}>
            <Text style={{ fontSize: 16 }}>{creature.type === 'fish' ? 'Fish' : 'Plankton'}</Text>
            <Image
              source={
                creature.type === 'fish'
                  ? require('../../assets/fish.png')
                  : require('../../assets/food.png')
              }
              style={styles.creatureImage}
            />
            <Button
              title={`Eat ${creature.type}`}
              onPress={() => handleEat(creature.id, creature.type === 'fish' ? 10 : 5)}
            />
          </View>
        ))}
      </View>
      {gameOver && (
        <View>
          <Text style={{ fontSize: 20, marginTop: 20 }}>Game Over!</Text>
          <Button title="Restart Game" onPress={restartGame} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  creatureContainer: {
    alignItems: 'center',
    margin: 10,
  },
  creatureImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AquaticFoodChainGame;
