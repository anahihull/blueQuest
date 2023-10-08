import React from 'react';
import { TouchableOpacity, Image, View, Text, Dimensions, Modal, Button, ImageBackground, StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';

const GameButton = ({ onPress, x, y }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (!isPressed) {  
      setIsPressed(false);
      onPress();
      setTimeout(() => setIsPressed(false), 1000); 
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ position: 'absolute', left: x, top: y }}>
      <Image
        source={isPressed ? require('../../../assets/fixed-faucet.png') : require('../../../assets/leaking-faucet.png')}
        style={{ width: 70, height: 70 }}
      />
    </TouchableOpacity>
  );
}

function Game() {
  const [position, setPosition] = useState(generateRandomPosition());
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (score === 10) {
      setIsModalVisible(true);
    }
  }, [score]);

  const handleButtonPress = () => {
    setScore(prevScore => prevScore + 1);
    setPosition(generateRandomPosition());
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setScore(0); 
  };

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#87cefa'}}>
      
      <Text style={styles.close}>Close the faucet!</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <GameButton x={position.x} y={position.y} onPress={handleButtonPress} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>You won!</Text>
                <Text style={styles.modalScore}>Score: {score} </Text>
                <Text style={styles.modalScore}>Remember to always turn off the faucet</Text>
                <TouchableOpacity style={styles.retryButton}>
                <Text style={styles.textStyle} onPress={handleModalClose}>Retry</Text>
                </TouchableOpacity>
            </View>
            </View>
      </Modal>
    </View>
  );
}

function generateRandomPosition() {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const x = Math.random() * (screenWidth - 70); // 50 es el ancho del botón
  const y = Math.random() * (screenHeight - 70); // 50 es el alto del botón

  return { x, y };
}

const styles = StyleSheet.create({
close: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#4682b4'
},
score: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: '#FFFFFF'
},
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 24,
  fontWeight: 'bold',
},
modalScore: {
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 20,
},
retryButton: {
  backgroundColor: '#F194FF',
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
});

export default Game;

