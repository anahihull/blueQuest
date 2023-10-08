import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const WaterConservationGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [faucets, setFaucets] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Start the game loop
    const gameLoop = setInterval(() => {
      // Update the timer
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      } else {
        clearInterval(gameLoop);
        setGameOver(true);
      }

      // Randomly spawn leaking faucets
      if (!gameOver && Math.random() < 0.5) {
        const newFaucet = {
          id: Date.now(),
          isLeaking: true,
        };
        setFaucets((prevFaucets) => [...prevFaucets, newFaucet]);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(gameLoop);
  }, [timeLeft, gameOver]);

  const handleFixFaucet = (faucetId) => {
    setScore((prevScore) => prevScore + 10);

    // Remove the fixed faucet from the state
    setFaucets((prevFaucets) => prevFaucets.filter((faucet) => faucet.id !== faucetId));
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFaucets([]);
    setGameOver(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Water Conservation Game</Text>
      <Text style={{ fontSize: 18 }}>Score: {score}</Text>
      <Text style={{ fontSize: 18 }}>Time Left: {timeLeft} seconds</Text>
      <View style={styles.gameContainer}>
        {faucets.map((faucet) => (
          <View key={faucet.id} style={styles.faucetContainer}>
            {faucet.isLeaking ? (
              <Image
                source={require('../../assets/leaking-faucet.png')}
                style={styles.faucetImage}
              />
            ) : null /* Render nothing for fixed faucets */}
            {faucet.isLeaking && (
              <Button
                title="Fix Faucet"
                onPress={() => handleFixFaucet(faucet.id)}
                disabled={!faucet.isLeaking}
              />
            )}
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
  faucetContainer: {
    alignItems: 'center',
    margin: 10,
  },
  faucetImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default WaterConservationGame;
