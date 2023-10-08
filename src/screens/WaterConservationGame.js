import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const WaterConservationGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [faucets, setFaucets] = useState([]);
  const [fixedFaucets, setFixedFaucets] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Start the game loop
    const gameLoop = setInterval(() => {
      if (!gameOver) {
        // Update the timer if the game is not over
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          clearInterval(gameLoop);
          setGameOver(true);
        }

        // Randomly spawn leaking faucets
        if (Math.random() < 0.5) {
          const newFaucet = {
            id: Date.now(),
            isLeaking: true,
          };
          setFaucets((prevFaucets) => [...prevFaucets, newFaucet]);
        }
      } else {
        // If the game is over, clear the interval
        clearInterval(gameLoop);

        // Remove all leaking faucets
        setFaucets([]);
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(gameLoop);
  }, [timeLeft, gameOver]);

  const handleFixFaucet = (faucetId) => {
    // Add the fixed faucet to the fixedFaucets state
    setFixedFaucets((prevFixedFaucets) => [
      ...prevFixedFaucets,
      { id: faucetId, isFixed: true },
    ]);

    // Remove the fixed faucet after 2 seconds
    setTimeout(() => {
      setFixedFaucets((prevFixedFaucets) =>
        prevFixedFaucets.filter((faucet) => faucet.id !== faucetId)
      );
    }, 2000);

    setScore((prevScore) => prevScore + 10);

    // Remove the fixed faucet from the state
    setFaucets((prevFaucets) => prevFaucets.filter((faucet) => faucet.id !== faucetId));
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFaucets([]);
    setFixedFaucets([]);
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
      {fixedFaucets.map((fixedFaucet) => (
        <View key={fixedFaucet.id}>
          {fixedFaucet.isFixed && (
            <Image
              source={require('../../assets/fixed-faucet.png')}
              style={styles.faucetImage}
            />
          )}
        </View>
      ))}
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Game Over!</Text>
          <Text style={{ fontSize: 20 }}>You won {score} points!</Text>
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
  gameOverContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default WaterConservationGame;
